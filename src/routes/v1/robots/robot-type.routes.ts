import express, { Router } from 'express';
import {
  createRobotTypeController,
  getAllRobotTypesController,
  getRobotTypeByIdController,
  updateRobotTypeController,
  deleteRobotTypeController,
} from '@/controllers/robots/robot-types.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';

const router: Router = express.Router();

router.use(authMiddleware);
router.get('/', getAllRobotTypesController);
router.get('/:id', getRobotTypeByIdController);
router.post('/', createRobotTypeController);
router.put('/:id', updateRobotTypeController);
router.delete('/:id', deleteRobotTypeController);

export default router;
