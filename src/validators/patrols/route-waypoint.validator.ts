import { body, param } from 'express-validator';
import PatrolRoute from '@/database/models/patrols/PatrolRoute.js';

const validateRouteIdExists = async (value: number): Promise<boolean> => {
  const exists = await PatrolRoute.findOne({ where: { id: value } });
  if (!exists) {
    throw new Error('Patrol route with this ID does not exist');
  }
  return true;
};

// Original single waypoint validators
export const createRouteWaypointValidators = [
  body('routeId')
    .notEmpty()
    .withMessage('Route ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Route ID must be a valid positive integer')
    .custom(validateRouteIdExists),

  body('sequenceOrder')
    .notEmpty()
    .withMessage('Sequence order is required')
    .isInt({ min: 0 })
    .withMessage('Sequence order must be a non-negative integer'),

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

  body('orientationZ')
    .notEmpty()
    .withMessage('Orientation Z is required')
    .isFloat()
    .withMessage('Orientation Z must be a valid number'),

  body('waypointType')
    .notEmpty()
    .withMessage('Waypoint type is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Waypoint type must be between 2 and 50 characters'),

  body('cameraPan')
    .optional()
    .isFloat()
    .withMessage('Camera pan must be a valid number'),

  body('cameraTilt')
    .optional()
    .isFloat()
    .withMessage('Camera tilt must be a valid number'),

  body('rgbCameraZoom')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('RGB camera zoom must be a positive number'),

  body('thermalCameraZoom')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Thermal camera zoom must be a positive number'),
];

// New validators for bulk waypoint creation
export const createMultipleRouteWaypointsValidators = [
  body('routeId')
    .notEmpty()
    .withMessage('Route ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Route ID must be a valid positive integer')
    .custom(validateRouteIdExists),

  body('waypoints')
    .isArray({ min: 1 })
    .withMessage('Waypoints must be an array with at least one waypoint'),

  body('waypoints.*.sequenceOrder')
    .notEmpty()
    .withMessage('Sequence order is required for each waypoint')
    .isInt({ min: 0 })
    .withMessage('Sequence order must be a non-negative integer'),

  body('waypoints.*.locationX')
    .notEmpty()
    .withMessage('Location X is required for each waypoint')
    .isFloat()
    .withMessage('Location X must be a valid number'),

  body('waypoints.*.locationY')
    .notEmpty()
    .withMessage('Location Y is required for each waypoint')
    .isFloat()
    .withMessage('Location Y must be a valid number'),

  body('waypoints.*.orientationZ')
    .notEmpty()
    .withMessage('Orientation Z is required for each waypoint')
    .isFloat()
    .withMessage('Orientation Z must be a valid number'),

  body('waypoints.*.waypointType')
    .notEmpty()
    .withMessage('Waypoint type is required for each waypoint')
    .isLength({ min: 2, max: 50 })
    .withMessage('Waypoint type must be between 2 and 50 characters'),

  body('waypoints.*.cameraPan')
    .optional()
    .isFloat()
    .withMessage('Camera pan must be a valid number'),

  body('waypoints.*.cameraTilt')
    .optional()
    .isFloat()
    .withMessage('Camera tilt must be a valid number'),

  body('waypoints.*.rgbCameraZoom')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('RGB camera zoom must be a positive number'),

  body('waypoints.*.thermalCameraZoom')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Thermal camera zoom must be a positive number'),

  // Custom validator to check for duplicate sequence orders
  body('waypoints').custom((waypoints: Array<{ sequenceOrder: number }>) => {
    const sequenceOrders = waypoints.map((wp) => wp.sequenceOrder);
    const uniqueSequenceOrders = new Set(sequenceOrders);

    if (sequenceOrders.length !== uniqueSequenceOrders.size) {
      throw new Error(
        'Duplicate sequence orders are not allowed within the same route',
      );
    }

    return true;
  }),
];

export const updateRouteWaypointValidators = [
  body('routeId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Route ID must be a valid positive integer')
    .custom(validateRouteIdExists),

  body('sequenceOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Sequence order must be a non-negative integer'),

  body('locationX')
    .optional()
    .isFloat()
    .withMessage('Location X must be a valid number'),

  body('locationY')
    .optional()
    .isFloat()
    .withMessage('Location Y must be a valid number'),

  body('orientationZ')
    .optional()
    .isFloat()
    .withMessage('Orientation Z must be a valid number'),

  body('waypointType')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Waypoint type must be between 2 and 50 characters'),

  body('cameraPan')
    .optional()
    .isFloat()
    .withMessage('Camera pan must be a valid number'),

  body('cameraTilt')
    .optional()
    .isFloat()
    .withMessage('Camera tilt must be a valid number'),

  body('rgbCameraZoom')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('RGB camera zoom must be a positive number'),

  body('thermalCameraZoom')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Thermal camera zoom must be a positive number'),
];

export const routeIdParamValidator = param('routeId')
  .notEmpty()
  .withMessage('Route ID parameter is required')
  .isInt({ min: 1 })
  .withMessage('Route ID must be a valid positive integer');
