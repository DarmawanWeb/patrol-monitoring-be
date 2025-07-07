import { body, param } from 'express-validator';
import Component from '@/database/models/components/Component.js';
import ComponentDetail from '@/database/models/components/ComponentDetail.js';
import { ComponentStatus } from '@/enums/component.enum.js';

const validateComponentIdExists = async (value: number): Promise<boolean> => {
  const exists = await Component.findOne({ where: { id: value } });
  if (!exists) {
    throw new Error('Component with this ID does not exist');
  }
  return true;
};

const validateSerialNumberUnique = async (value: string): Promise<boolean> => {
  const exists = await ComponentDetail.findOne({
    where: { serialNumber: value },
  });
  if (exists) {
    throw new Error('Component detail with this serial number already exists');
  }
  return true;
};

export const createComponentDetailValidators = [
  body('serialNumber')
    .notEmpty()
    .withMessage('Serial number is required')
    .isLength({ min: 5, max: 50 })
    .withMessage('Serial number must be between 5 and 50 characters')
    .custom(validateSerialNumberUnique),

  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters'),

  body('componentId')
    .notEmpty()
    .withMessage('Component ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Component ID must be a valid positive integer')
    .custom(validateComponentIdExists),

  body('installedAt')
    .notEmpty()
    .withMessage('Installed date is required')
    .isISO8601()
    .withMessage('Installed date must be a valid date'),

  body('locationX')
    .notEmpty()
    .withMessage('Location X is required')
    .isFloat()
    .withMessage('Location X must be a valid number'),

  body('locationY')
    .notEmpty()
    .withMessage('Location Y is required')
    .isFloat()
    .withMessage('Location Y must be a valid number'),

  body('locationZ')
    .notEmpty()
    .withMessage('Location Z is required')
    .isFloat()
    .withMessage('Location Z must be a valid number'),

  body('status')
    .optional()
    .isIn(Object.values(ComponentStatus))
    .withMessage(
      `Status must be one of: ${Object.values(ComponentStatus).join(', ')}`,
    ),
];

export const updateComponentDetailValidators = [
  body('name')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters'),

  body('componentId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Component ID must be a valid positive integer')
    .custom(validateComponentIdExists),

  body('installedAt')
    .optional()
    .isISO8601()
    .withMessage('Installed date must be a valid date'),

  body('locationX')
    .optional()
    .isFloat()
    .withMessage('Location X must be a valid number'),

  body('locationY')
    .optional()
    .isFloat()
    .withMessage('Location Y must be a valid number'),

  body('locationZ')
    .optional()
    .isFloat()
    .withMessage('Location Z must be a valid number'),

  body('status')
    .optional()
    .isIn(Object.values(ComponentStatus))
    .withMessage(
      `Status must be one of: ${Object.values(ComponentStatus).join(', ')}`,
    ),
];

export const serialNumberParamValidator = param('serialNumber')
  .notEmpty()
  .withMessage('Serial number parameter is required')
  .isLength({ min: 5, max: 50 })
  .withMessage('Serial number must be between 5 and 50 characters');

export const componentIdParamValidator = param('componentId')
  .notEmpty()
  .withMessage('Component ID parameter is required')
  .isInt({ min: 1 })
  .withMessage('Component ID must be a valid positive integer');
