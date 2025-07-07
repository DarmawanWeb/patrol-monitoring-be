import { body, param } from 'express-validator';
import PatrolSchedule from '@/database/models/patrols/PatrolSchedule.js';
import { PatrolStatus } from '@/enums/patrol.enum.js';

const validateScheduleIdExists = async (value: number): Promise<boolean> => {
  const exists = await PatrolSchedule.findOne({ where: { id: value } });
  if (!exists) {
    throw new Error('Patrol schedule with this ID does not exist');
  }
  return true;
};

export const createPatrolSessionValidators = [
  body('scheduleId')
    .notEmpty()
    .withMessage('Schedule ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Schedule ID must be a valid positive integer')
    .custom(validateScheduleIdExists),

  body('startTime')
    .notEmpty()
    .withMessage('Start time is required')
    .isISO8601()
    .withMessage('Start time must be a valid ISO 8601 date'),

  body('endTime')
    .optional()
    .isISO8601()
    .withMessage('End time must be a valid ISO 8601 date'),

  body('totalDistance')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total distance must be a positive number'),

  body('componentsInspected')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Components inspected must be a non-negative integer'),

  body('anomaliesDetected')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Anomalies detected must be a non-negative integer'),

  body('batteryStart')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Battery start must be between 0 and 100'),

  body('batteryEnd')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Battery end must be between 0 and 100'),

  body('status')
    .optional()
    .isIn(Object.values(PatrolStatus))
    .withMessage(
      `Status must be one of: ${Object.values(PatrolStatus).join(', ')}`,
    ),

  body('endTime').custom((endTime, { req }) => {
    if (endTime && req.body.startTime) {
      const start = new Date(req.body.startTime);
      const end = new Date(endTime);
      if (end <= start) {
        throw new Error('End time must be after start time');
      }
    }
    return true;
  }),
];

export const updatePatrolSessionValidators = [
  body('scheduleId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Schedule ID must be a valid positive integer')
    .custom(validateScheduleIdExists),

  body('startTime')
    .optional()
    .isISO8601()
    .withMessage('Start time must be a valid ISO 8601 date'),

  body('endTime')
    .optional()
    .isISO8601()
    .withMessage('End time must be a valid ISO 8601 date'),

  body('totalDistance')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total distance must be a positive number'),

  body('componentsInspected')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Components inspected must be a non-negative integer'),

  body('anomaliesDetected')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Anomalies detected must be a non-negative integer'),

  body('batteryStart')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Battery start must be between 0 and 100'),

  body('batteryEnd')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Battery end must be between 0 and 100'),

  body('status')
    .optional()
    .isIn(Object.values(PatrolStatus))
    .withMessage(
      `Status must be one of: ${Object.values(PatrolStatus).join(', ')}`,
    ),
];

export const scheduleIdParamValidator = param('scheduleId')
  .notEmpty()
  .withMessage('Schedule ID parameter is required')
  .isInt({ min: 1 })
  .withMessage('Schedule ID must be a valid positive integer');
