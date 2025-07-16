import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/student.routes.js';
import courseRoutes from './routes/course.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import userRoutes from './routes/auth.routes.js';
import { serveSwagger, setupSwagger } from './config/swagger.js';
import { authToken } from './middleware/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(cors({
  origin: "*"
}));

app.use('/docs', serveSwagger, setupSwagger);

app.use('/students', authToken, studentRoutes);
app.use('/courses', authToken, courseRoutes);
app.use('/teachers', authToken, teacherRoutes);
app.use('/auth', userRoutes);

app.get('/', (req, res) => res.send('Welcome to School API!'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
