"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsController = void 0;
const blogs_service_1 = require("./blogs.service");
const createBlog = async (req, res) => {
    try {
        const result = await blogs_service_1.BlogService.createBlog(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
const getAllBlogs = async (req, res) => {
    try {
        const result = await blogs_service_1.BlogService.getAllBlogs();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch Blogs", details: err });
    }
};
const getBlogById = async (req, res) => {
    const Blog = await blogs_service_1.BlogService.getBlogById(Number(req.params.id));
    if (!Blog)
        return res.status(404).json({ error: "Blog not found" });
    res.json(Blog);
};
const updateBlog = async (req, res) => {
    const Blog = await blogs_service_1.BlogService.updateBlog(Number(req.params.id), req.body);
    res.json(Blog);
};
const deleteBlog = async (req, res) => {
    await blogs_service_1.BlogService.deleteBlog(Number(req.params.id));
    res.json({ message: "Blog deleted" });
};
exports.BlogsController = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};
