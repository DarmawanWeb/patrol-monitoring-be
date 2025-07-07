import { body } from 'express-validator';

export const createPatrolRouteValidators = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters'),

  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),

  body('total_distance')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total distance must be a positive number'),

  body('estimated_duration')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Estimated duration must be a positive integer (minutes)'),
];

export const updatePatrolRouteValidators = [
  body('name')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters'),

  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),

  body('total_distance')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total distance must be a positive number'),

  body('estimated_duration')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Estimated duration must be a positive integer (minutes)'),
];
