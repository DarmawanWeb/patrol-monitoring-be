import express, { type Router } from 'express';
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
  registerWithRoleController,
  userController,
} from '@/controllers/users/auth.controller.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';
import {
  loginValidators,
  registerValidators,
} from '@/validators/auth.validators.js';

const router: Router = express.Router();

router.post(
  '/register',
  registerValidators,
  validationMiddleware,
  registerController,
);
router.post(
  '/create-user',
  registerValidators,
  validationMiddleware,
  authMiddleware,
  registerWithRoleController,
);
router.post('/login', loginValidators, validationMiddleware, loginController);
router.post('/refresh', refreshController);
router.post('/logout', authMiddleware, logoutController);
router.get('/user', authMiddleware, userController);

export default router;
