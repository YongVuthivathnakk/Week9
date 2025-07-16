import db from '../models/index.js';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication routes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Email already exits
 */
export const register = async (req, res) => {
    try {
        const user = await db.User.create(req.body);

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name},
            process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"}
        );

        res.status(201).json({ user, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       401:
 *         description: Invalid credentials
 *       404: 
 *         description: User not found
 */
export const login = async (req, res) => {
    try {
        const user = await db.User.findOne(req.body);

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name},
            process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"}
        );
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get a list of users (protected)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
export const getUser = async (req, res) => {
    try {
        const users = await db.User.findAll(); 
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};