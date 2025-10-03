import express from "express";
import { ProjectsController } from "./projects.controller";

const router = express.Router();

router.post("/", ProjectsController.createProject);
router.get("/", ProjectsController.getAllProjects);
router.get("/:id", ProjectsController.getProjectById);
router.patch("/:id", ProjectsController.updateProject);
router.delete("/:id", ProjectsController.deleteProject);

export const projectsRouter = router;
