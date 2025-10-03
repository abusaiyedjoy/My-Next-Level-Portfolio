"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectsRouter = void 0;
const express_1 = __importDefault(require("express"));
const projects_controller_1 = require("./projects.controller");
const router = express_1.default.Router();
router.post("/", projects_controller_1.ProjectsController.createProject);
router.get("/", projects_controller_1.ProjectsController.getAllProjects);
router.get("/:id", projects_controller_1.ProjectsController.getProjectById);
router.patch("/:id", projects_controller_1.ProjectsController.updateProject);
router.delete("/:id", projects_controller_1.ProjectsController.deleteProject);
exports.projectsRouter = router;
