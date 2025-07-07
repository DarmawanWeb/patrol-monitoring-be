import { body } from 'express-validator';
import ComponentType from '@/database/models/components/ComponentType.js';

const validateTypeIdExists = async (value: number): Promise<boolean> => {
  const exists = await ComponentType.findOne({ where: { id: value } });
  if (!exists) {
    throw new Error('Component type with this ID does not exist');
  }
  return true;
};

export const createComponentValidators = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters'),

  body('typeId')
    .notEmpty()
    .withMessage('Type ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Type ID must be a valid positive integer')
    .custom(validateTypeIdExists),

  body('model')
    .notEmpty()
    .withMessage('Model is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Model must be between 2 and 100 characters'),

  body('manufacturer')
    .notEmpty()
    .withMessage('Manufacturer is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Manufacturer must be between 2 and 100 characters'),

  body('warning_temp_threshold')
    .notEmpty()
    .withMessage('Warning temperature threshold is required')
    .isFloat({ min: -50, max: 200 })
    .withMessage('Warning temperature threshold must be between -50 and 200'),

  body('overheat_temp_threshold')
    .notEmpty()
    .withMessage('Overheat temperature threshold is required')
    .isFloat({ min: -50, max: 200 })
    .withMessage('Overheat temperature threshold must be between -50 and 200'),

  body('overheat_temp_threshold').custom((value, { req }) => {
    const warningTemp = req.body.warning_temp_threshold;
    if (value <= warningTemp) {
      throw new Error(
        'Overheat temperature threshold must be higher than warning temperature threshold',
      );
    }
    return true;
  }),
];

export const updateComponentValidators = [
  body('name')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters'),

  body('typeId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Type ID must be a valid positive integer')
    .custom(validateTypeIdExists),

  body('model')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Model must be between 2 and 100 characters'),

  body('manufacturer')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Manufacturer must be between 2 and 100 characters'),

  body('warning_temp_threshold')
    .optional()
    .isFloat({ min: -50, max: 200 })
    .withMessage('Warning temperature threshold must be between -50 and 200'),

  body('overheat_temp_threshold')
    .optional()
    .isFloat({ min: -50, max: 200 })
    .withMessage('Overheat temperature threshold must be between -50 and 200'),

  body('overheat_temp_threshold')
    .optional()
    .custom((value, { req }) => {
      if (
        value &&
        req.body.warning_temp_threshold &&
        value <= req.body.warning_temp_threshold
      ) {
        throw new Error(
          'Overheat temperature threshold must be higher than warning temperature threshold',
        );
      }
      return true;
    }),
];
