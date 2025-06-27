import { body } from 'express-validator';
import RobotType from '@/database/models/robots/RobotType.js';

export const robotTypeValidators = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50, min: 5 })
    .withMessage(
      'Name must be less than 50 characters and at least 5 characters',
    )
    .custom(async (value) => {
      const existingRobotType = await RobotType.findOne({
        where: { name: value },
      });
      if (existingRobotType) {
        throw new Error('Robot type with this name already exists');
      }
      return true;
    }),
];
