import express from 'express';
import { register, login, getUser } from '../controllers/auth.controller.js';
import { authToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/users", authToken, getUser);

export default router;