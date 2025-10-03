"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const db_1 = require("../../config/db");
const createBlog = async (payload) => {
    const result = await db_1.prisma.blog.create({
        data: payload,
    });
    return result;
};
const getAllBlogs = async () => {
    const result = await db_1.prisma.blog.findMany();
    return result;
};
const getBlogById = async (id) => {
    const result = await db_1.prisma.blog.findUnique({
        where: { id },
    });
    return result;
};
const updateBlog = async (id, data) => {
    return db_1.prisma.blog.update({ where: { id }, data });
};
const deleteBlog = async (id) => {
    return db_1.prisma.blog.delete({ where: { id } });
};
exports.BlogService = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};
