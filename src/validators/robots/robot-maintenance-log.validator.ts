import { body } from 'express-validator';
import Robot from '@/database/models/robots/Robot.js';

const validateRobotIdExists = async (value: string): Promise<boolean> => {
  const exists = await Robot.findOne({ where: { id: value } });
  if (!exists) {
    throw new Error('Robot with this ID does not exist');
  }
  return true;
};

export const createRobotMaintenanceLogValidators = [
  body('robotId')
    .notEmpty()
    .withMessage('Robot ID is required')
    .bail()
    .isString()
    .withMessage('Robot ID must be a valid string')
    .custom(validateRobotIdExists),

  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),

  body('performedAt')
    .notEmpty()
    .withMessage('Performed At date is required')
    .bail()
    .isISO8601()
    .withMessage('Performed At must be a valid date'),

  body('performedBy')
    .notEmpty()
    .withMessage('Performed By is required')
    .isString()
    .withMessage('Performed By must be a valid string'),
];

export const updateRobotMaintenanceLogValidators = [
  body('robotId')
    .optional()
    .isString()
    .withMessage('Robot ID must be a valid string')
    .custom(validateRobotIdExists),

  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),

  body('performedAt')
    .optional()
    .isISO8601()
    .withMessage('Performed At must be a valid date'),

  body('performedBy')
    .optional()
    .isString()
    .withMessage('Performed By must be a valid string'),
];
