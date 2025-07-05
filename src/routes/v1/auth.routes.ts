import express, { type Router } from 'express';
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
  registerWithRoleController,
  userController,
} from '@/controllers/auth.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import {
  loginValidators,
  registerValidators,
} from '@/validators/auth.validators.js';

const router: Router = express.Router();

router.post('/register', registerValidators, registerController);
router.post(
  '/create-user',
  registerValidators,
  authMiddleware,
  registerWithRoleController,
);
router.post('/login', loginValidators, loginController);
router.post('/refresh', refreshController);
router.post('/logout', authMiddleware, logoutController);
router.get('/user', authMiddleware, userController);

export default router;
