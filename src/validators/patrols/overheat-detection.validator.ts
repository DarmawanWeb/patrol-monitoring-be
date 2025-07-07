// src/validators/patrols/overheat-detection.validator.ts

import { body, param } from 'express-validator';
import PatrolSession from '@/database/models/patrols/PatrolSession.js';
import RouteWaypoint from '@/database/models/patrols/RouteWaypoint.js';
import { ResolutionStatus, SeverityLevel } from '@/enums/result.enum.js';

const validateSessionIdExists = async (value: number): Promise<boolean> => {
  const exists = await PatrolSession.findOne({ where: { id: value } });
  if (!exists) {
    throw new Error('Patrol session with this ID does not exist');
  }
  return true;
};

const validateWaypointIdExists = async (value: number): Promise<boolean> => {
  const exists = await RouteWaypoint.findOne({ where: { id: value } });
  if (!exists) {
    throw new Error('Route waypoint with this ID does not exist');
  }
  return true;
};

export const createOverheatDetectionValidators = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters'),

  body('sessionId')
    .notEmpty()
    .withMessage('Session ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Session ID must be a valid positive integer')
    .custom(validateSessionIdExists),

  body('waypointId')
    .notEmpty()
    .withMessage('Waypoint ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Waypoint ID must be a valid positive integer')
    .custom(validateWaypointIdExists),

  body('temperature')
    .notEmpty()
    .withMessage('Temperature is required')
    .isFloat({ min: -50, max: 500 })
    .withMessage('Temperature must be between -50 and 500 degrees'),

  body('severityLevel')
    .optional()
    .isIn(Object.values(SeverityLevel))
    .withMessage(
      `Severity level must be one of: ${Object.values(SeverityLevel).join(', ')}`,
    ),

  body('confidenceScore')
    .notEmpty()
    .withMessage('Confidence score is required')
    .isFloat({ min: 0, max: 1 })
    .withMessage('Confidence score must be between 0 and 1'),

  body('isConfirmed')
    .optional()
    .isBoolean()
    .withMessage('Is confirmed must be a boolean value'),

  body('confirmedBy')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Confirmed by must be a valid positive integer'),

  body('confirmedAt')
    .optional()
    .isISO8601()
    .withMessage('Confirmed at must be a valid ISO 8601 date'),

  body('resolutionStatus')
    .optional()
    .isIn(Object.values(ResolutionStatus))
    .withMessage(
      `Resolution status must be one of: ${Object.values(ResolutionStatus).join(', ')}`,
    ),

  body('resolutionNotes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Resolution notes must be less than 1000 characters'),
];

export const updateOverheatDetectionValidators = [
  body('name')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters'),

  body('sessionId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Session ID must be a valid positive integer')
    .custom(validateSessionIdExists),

  body('waypointId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Waypoint ID must be a valid positive integer')
    .custom(validateWaypointIdExists),

  body('temperature')
    .optional()
    .isFloat({ min: -50, max: 500 })
    .withMessage('Temperature must be between -50 and 500 degrees'),

  body('severityLevel')
    .optional()
    .isIn(Object.values(SeverityLevel))
    .withMessage(
      `Severity level must be one of: ${Object.values(SeverityLevel).join(', ')}`,
    ),

  body('confidenceScore')
    .optional()
    .isFloat({ min: 0, max: 1 })
    .withMessage('Confidence score must be between 0 and 1'),

  body('isConfirmed')
    .optional()
    .isBoolean()
    .withMessage('Is confirmed must be a boolean value'),

  body('confirmedBy')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Confirmed by must be a valid positive integer'),

  body('confirmedAt')
    .optional()
    .isISO8601()
    .withMessage('Confirmed at must be a valid ISO 8601 date'),

  body('resolutionStatus')
    .optional()
    .isIn(Object.values(ResolutionStatus))
    .withMessage(
      `Resolution status must be one of: ${Object.values(ResolutionStatus).join(', ')}`,
    ),

  body('resolutionNotes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Resolution notes must be less than 1000 characters'),
];

export const sessionIdParamValidator = param('sessionId')
  .notEmpty()
  .withMessage('Session ID parameter is required')
  .isInt({ min: 1 })
  .withMessage('Session ID must be a valid positive integer');

export const waypointIdParamValidator = param('waypointId')
  .notEmpty()
  .withMessage('Waypoint ID parameter is required')
  .isInt({ min: 1 })
  .withMessage('Waypoint ID must be a valid positive integer');
