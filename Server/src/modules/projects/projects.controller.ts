import { ProjectService } from "./projects.service";
import { Request, Response } from "express";

const createProject = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.createProject(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllProjects = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.getAllProjects();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Projects", details: err });
  }
};

const getProjectById = async (req: Request, res: Response) => {
  const Project = await ProjectService.getProjectById(Number(req.params.id));
  if (!Project) return res.status(404).json({ error: "Project not found" });
  res.json(Project);
};

const updateProject = async (req: Request, res: Response) => {
  const Project = await ProjectService.updateProject(
    Number(req.params.id),
    req.body
  );
  res.json(Project);
};

const deleteProject = async (req: Request, res: Response) => {
  await ProjectService.deleteProject(Number(req.params.id));
  res.json({ message: "Project deleted" });
};

export const ProjectsController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
