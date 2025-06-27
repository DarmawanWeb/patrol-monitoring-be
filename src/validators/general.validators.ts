import { param } from 'express-validator';

export const idParamValidator = [
  param('id').isInt({ min: 1 }).withMessage('Valid ID is required'),
];

export const uuidParamValidator = [
  param('id')
    .isUUID()
    .withMessage('Valid UUID is required')
    .customSanitizer((value) => value.toLowerCase()),
];
