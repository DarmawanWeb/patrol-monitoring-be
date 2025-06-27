import { body } from 'express-validator';
import RobotType from '@/database/models/robots/RobotType';

const validateTypeIdExists = async (value: number): Promise<boolean> => {
  const exists = await RobotType.findOne({ where: { id: value } });
  if (!exists) {
    throw new Error('Robot type with this ID does not exist');
  }
  return true;
};

export const createRobotValidators = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 5, max: 50 })
    .withMessage('Name must be between 5 and 50 characters'),

  body('typeId')
    .notEmpty()
    .withMessage('Type ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Type ID must be a valid positive integer')
    .custom(validateTypeIdExists),

  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
];

export const updateRobotValidators = [
  body('name')
    .optional()
    .isLength({ min: 5, max: 50 })
    .withMessage('Name must be between 5 and 50 characters'),

  body('typeId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Type ID must be a valid positive integer')
    .custom(validateTypeIdExists),

  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
];
