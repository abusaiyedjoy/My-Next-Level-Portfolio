"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const db_1 = require("../../config/db");
const createProject = async (payload) => {
    const result = await db_1.prisma.project.create({
        data: payload,
    });
    return result;
};
const getAllProjects = async () => {
    const result = await db_1.prisma.project.findMany();
    return result;
};
const getProjectById = async (id) => {
    const result = await db_1.prisma.project.findUnique({
        where: { id },
    });
    return result;
};
const updateProject = async (id, data) => {
    return db_1.prisma.project.update({ where: { id }, data });
};
const deleteProject = async (id) => {
    return db_1.prisma.project.delete({ where: { id } });
};
exports.ProjectService = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};
