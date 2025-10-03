import helmet from 'helmet';
import cors from "cors";
import express from "express";
import { blogsRouter } from "./modules/blogs/blogs.route";
import { projectsRouter } from "./modules/projects/projects.route";
import { authRouter } from './modules/auth/auth.route';

const app = express();

// Security Middlewares
app.use(helmet()); 
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Routes
app.use("/api/v1/blog", blogsRouter);
app.use("/api/v1/project", projectsRouter);
app.use("/api/v1/auth", authRouter);


app.get("/", (_req, res) => {
  res.send("API is running");
});


// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});


// Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});


export default app;
