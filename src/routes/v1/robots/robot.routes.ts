import express, { Router } from 'express';
import {
  createRobotController,
  deleteRobotController,
  getAllRobotsController,
  getRobotByIdController,
  updateRobotController,
} from '@/controllers/robots/robots.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';

const router: Router = express.Router();

router.use(authMiddleware);

router.get('/', getAllRobotsController);
router.get('/:id', getRobotByIdController);
router.post('/', createRobotController);
router.put('/:id', updateRobotController);
router.delete('/:id', deleteRobotController);

export default router;
