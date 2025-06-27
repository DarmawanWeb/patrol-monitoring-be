import { query } from 'express-validator';

export const robotWebsocketQueryValidators = [
  query('startTime')
    .optional()
    .isISO8601()
    .withMessage('startTime must be a valid ISO 8601 date')
    .custom((value, { req }) => {
      if (value && req.query && req.query.endTime) {
        const startDate = new Date(value);
        const endDate = new Date(req.query.endTime);
        if (startDate > endDate) {
          throw new Error('startTime cannot be later than endTime');
        }
      }
      return true;
    }),

  query('endTime')
    .optional()
    .isISO8601()
    .withMessage('endTime must be a valid ISO 8601 date')
    .custom((value, { req }) => {
      if (value && req.query && req.query.startTime) {
        const startDate = new Date(req.query.startTime as string);
        const endDate = new Date(value);
        if (startDate > endDate) {
          throw new Error('startTime cannot be later than endTime');
        }
      }
      return true;
    }),

  query('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('limit must be a positive integer')
    .toInt()
    .custom((value) => {
      if (value && value > 10000) {
        throw new Error('limit cannot be greater than 10000');
      }
      return true;
    }),
];
