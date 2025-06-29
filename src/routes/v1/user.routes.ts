import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import {
  getAllUsersController,
  updateUserController,
  deleteUserController,
} from '@/controllers/user.controller.js';

const router: Router = Router();
router.use(authMiddleware);

router.get('/', getAllUsersController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;
