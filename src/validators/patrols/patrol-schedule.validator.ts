import { body, param } from 'express-validator';
import PatrolRoute from '@/database/models/patrols/PatrolRoute.js';
import Robot from '@/database/models/robots/Robot.js';
import { ScheduleType } from '@/enums/schedule.enum.js';

const validateRouteIdExists = async (value: number): Promise<boolean> => {
  const exists = await PatrolRoute.findOne({ where: { id: value } });
  if (!exists) {
    throw new Error('Patrol route with this ID does not exist');
  }
  return true;
};

const validateRobotIdExists = async (value: string): Promise<boolean> => {
  const exists = await Robot.findOne({ where: { id: value } });
  if (!exists) {
    throw new Error('Robot with this ID does not exist');
  }
  return true;
};

export const createPatrolScheduleValidators = [
  body('robotId')
    .notEmpty()
    .withMessage('Robot ID is required')
    .isUUID(4)
    .withMessage('Robot ID must be a valid UUID')
    .custom(validateRobotIdExists),

  body('routeId')
    .notEmpty()
    .withMessage('Route ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Route ID must be a valid positive integer')
    .custom(validateRouteIdExists),

  body('scheduleType')
    .notEmpty()
    .withMessage('Schedule type is required')
    .isIn(Object.values(ScheduleType))
    .withMessage(
      `Schedule type must be one of: ${Object.values(ScheduleType).join(', ')}`,
    ),

  body('startTime')
    .notEmpty()
    .withMessage('Start time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Start time must be in HH:MM format'),

  body('intervalMinutes')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Interval minutes must be a positive integer'),

  body('daysOfWeek')
    .optional()
    .isArray()
    .withMessage('Days of week must be an array')
    .custom((value) => {
      if (Array.isArray(value)) {
        for (const day of value) {
          if (!Number.isInteger(day) || day < 0 || day > 6) {
            throw new Error(
              'Days of week must contain integers between 0-6 (0=Sunday, 6=Saturday)',
            );
          }
        }
      }
      return true;
    }),

  body('daysOfMonth')
    .optional()
    .isArray()
    .withMessage('Days of month must be an array')
    .custom((value) => {
      if (Array.isArray(value)) {
        for (const day of value) {
          if (!Number.isInteger(day) || day < 1 || day > 31) {
            throw new Error('Days of month must contain integers between 1-31');
          }
        }
      }
      return true;
    }),
];

export const updatePatrolScheduleValidators = [
  body('robotId')
    .optional()
    .isUUID(4)
    .withMessage('Robot ID must be a valid UUID')
    .custom(validateRobotIdExists),

  body('routeId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Route ID must be a valid positive integer')
    .custom(validateRouteIdExists),

  body('scheduleType')
    .optional()
    .isIn(Object.values(ScheduleType))
    .withMessage(
      `Schedule type must be one of: ${Object.values(ScheduleType).join(', ')}`,
    ),

  body('startTime')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Start time must be in HH:MM format'),

  body('intervalMinutes')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Interval minutes must be a positive integer'),

  body('daysOfWeek')
    .optional()
    .isArray()
    .withMessage('Days of week must be an array')
    .custom((value) => {
      if (Array.isArray(value)) {
        for (const day of value) {
          if (!Number.isInteger(day) || day < 0 || day > 6) {
            throw new Error(
              'Days of week must contain integers between 0-6 (0=Sunday, 6=Saturday)',
            );
          }
        }
      }
      return true;
    }),

  body('daysOfMonth')
    .optional()
    .isArray()
    .withMessage('Days of month must be an array')
    .custom((value) => {
      if (Array.isArray(value)) {
        for (const day of value) {
          if (!Number.isInteger(day) || day < 1 || day > 31) {
            throw new Error('Days of month must contain integers between 1-31');
          }
        }
      }
      return true;
    }),
];

export const robotIdParamValidator = param('robotId')
  .notEmpty()
  .withMessage('Robot ID parameter is required')
  .isUUID(4)
  .withMessage('Robot ID must be a valid UUID');
