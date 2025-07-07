// src/validators/components/component-type.validator.ts

import { body } from 'express-validator';
import ComponentType from '@/database/models/components/ComponentType.js';

export const createComponentTypeValidators = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),
  body('icon')
    .notEmpty()
    .withMessage('Icon is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Icon must be between 3 and 100 characters'),
  body('name').custom(async (value) => {
    const existingComponentType = await ComponentType.findOne({
      where: { name: value },
    });
    if (existingComponentType) {
      throw new Error('Component type with this name already exists');
    }
    return true;
  }),
];

export const updateComponentTypeValidators = [
  body('name')
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),
  body('icon')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('Icon must be between 3 and 100 characters'),
  body('name')
    .optional()
    .custom(async (value) => {
      if (value) {
        const existingComponentType = await ComponentType.findOne({
          where: { name: value },
        });
        if (existingComponentType) {
          throw new Error('Component type with this name already exists');
        }
      }
      return true;
    }),
];
