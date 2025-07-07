import { Router } from 'express';
import {
  deleteUserController,
  getAllUsersController,
  updateUserController,
} from '@/controllers/users/user.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';

const router: Router = Router();
router.use(authMiddleware);

router.get('/', getAllUsersController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;
