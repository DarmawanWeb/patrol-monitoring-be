import express, { Router } from 'express';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import {
  createPatrolAreaController,
  updatePatrolAreaController,
  deletePatrolAreaController,
  getPatrolAreaByIdController,
  getAllPatrolAreasController,
} from '@/controllers/patrol-area.controller.js';

const router: Router = express.Router();

router.get('/', authMiddleware, getAllPatrolAreasController);
router.get('/:id', authMiddleware, getPatrolAreaByIdController);
router.post('/', authMiddleware, createPatrolAreaController);
router.put('/:id', authMiddleware, updatePatrolAreaController);
router.delete('/:id', authMiddleware, deletePatrolAreaController);

export default router;
