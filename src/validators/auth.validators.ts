import { body } from 'express-validator';
import { User } from '@/database/models/users/index.js';

export const registerValidators = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),

  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail()
    .custom(async (value) => {
      const existingUser = await User.findOne({ where: { email: value } });
      if (existingUser) {
        throw new Error('Email is already registered');
      }
      return true;
    }),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    .withMessage('Password must contain letters and numbers'),
  body('role')
    .optional()
    .isIn(['user', 'guest'])
    .withMessage('Role must be either "user" or "admin"'),
];

export const loginValidators = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];
