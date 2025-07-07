import { body } from 'express-validator';
import ComponentType from '@/database/models/components/ComponentType.js';

const checkComponentTypeNameExists = async (
  value: string,
): Promise<boolean> => {
  const existingComponentType = await ComponentType.findOne({
    where: { name: value },
  });
  if (existingComponentType) {
    throw new Error('Component type with this name already exists');
  }
  return true;
};

export const createComponentTypeValidators = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters')
    .custom(checkComponentTypeNameExists),

  body('icon')
    .notEmpty()
    .withMessage('Icon is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Icon must be between 3 and 100 characters'),
];

export const updateComponentTypeValidators = [
  body('name')
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters')
    .custom(async (value) => {
      if (value) {
        await checkComponentTypeNameExists(value);
      }
      return true;
    }),

  body('icon')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('Icon must be between 3 and 100 characters'),
];
