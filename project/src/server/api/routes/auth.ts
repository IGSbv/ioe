import express from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../db/repositories/userRepository';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';

const router = express.Router();

const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().min(2),
    password: z.string().min(6),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

router.post(
  '/register',
  validateRequest(registerSchema),
  async (req, res) => {
    try {
      const { email, name, password } = req.body;

      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const user = await UserRepository.create(email, name, password);
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
    }
  }
);

router.post(
  '/login',
  validateRequest(loginSchema),
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await UserRepository.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValid = await UserRepository.verifyPassword(user, password);
      if (!isValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in' });
    }
  }
);