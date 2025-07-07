import { body, param } from 'express-validator';
import ComponentDetail from '@/database/models/components/ComponentDetail.js';

const validateComponentSerialNumberExists = async (
  value: string,
): Promise<boolean> => {
  const exists = await ComponentDetail.findOne({
    where: { serialNumber: value },
  });
  if (!exists) {
    throw new Error('Component detail with this serial number does not exist');
  }
  return true;
};

export const createComponentMaintenanceLogValidators = [
  body('componentSerialNumber')
    .notEmpty()
    .withMessage('Component serial number is required')
    .isLength({ min: 5, max: 50 })
    .withMessage('Component serial number must be between 5 and 50 characters')
    .custom(validateComponentSerialNumberExists),

  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),

  body('performedAt')
    .notEmpty()
    .withMessage('Performed date is required')
    .isISO8601()
    .withMessage('Performed date must be a valid date'),

  body('performedBy')
    .notEmpty()
    .withMessage('Performed by is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Performed by must be between 2 and 100 characters'),
];

export const updateComponentMaintenanceLogValidators = [
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),

  body('performedAt')
    .optional()
    .isISO8601()
    .withMessage('Performed date must be a valid date'),

  body('performedBy')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Performed by must be between 2 and 100 characters'),
];

export const serialNumberParamValidator = param('serialNumber')
  .notEmpty()
  .withMessage('Serial number parameter is required')
  .isLength({ min: 5, max: 50 })
  .withMessage('Serial number must be between 5 and 50 characters');
