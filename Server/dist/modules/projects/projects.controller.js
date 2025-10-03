"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsController = void 0;
const projects_service_1 = require("./projects.service");
const createProject = async (req, res) => {
    try {
        const result = await projects_service_1.ProjectService.createProject(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
const getAllProjects = async (req, res) => {
    try {
        const result = await projects_service_1.ProjectService.getAllProjects();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch Projects", details: err });
    }
};
const getProjectById = async (req, res) => {
    const Project = await projects_service_1.ProjectService.getProjectById(Number(req.params.id));
    if (!Project)
        return res.status(404).json({ error: "Project not found" });
    res.json(Project);
};
const updateProject = async (req, res) => {
    const Project = await projects_service_1.ProjectService.updateProject(Number(req.params.id), req.body);
    res.json(Project);
};
const deleteProject = async (req, res) => {
    await projects_service_1.ProjectService.deleteProject(Number(req.params.id));
    res.json({ message: "Project deleted" });
};
exports.ProjectsController = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
