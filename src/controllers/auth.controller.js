import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import db from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const users = []; // In-memory array for user storage

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alice
 *               email:
 *                 type: string
 *                 format: email
 *                 example: alice@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mysecurepassword
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already registered
 */
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists in the database
  const existingUser = await db.User.findOne({ where: { email } });
  
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({ name, email, password: hashedPassword });
    
    res.status(201).json({ message: 'User registered', user: { id: newUser.id, name, email } });
  }

};