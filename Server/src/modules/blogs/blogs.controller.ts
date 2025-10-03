import { Request, Response } from "express";
import { BlogService } from "./blogs.service";

const createBlog = async (req: Request, res: Response) => {
    try {
        const result = await BlogService.createBlog(req.body)
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const result = await BlogService.getAllBlogs();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch Blogs", details: err });
    }
};

const getBlogById = async (req: Request, res: Response) => {
    const Blog = await BlogService.getBlogById(Number(req.params.id));
    if (!Blog) return res.status(404).json({ error: "Blog not found" });
    res.json(Blog);
};

const updateBlog = async (req: Request, res: Response) => {
    const Blog = await BlogService.updateBlog(Number(req.params.id), req.body);
    res.json(Blog);
};

const deleteBlog = async (req: Request, res: Response) => {
    await BlogService.deleteBlog(Number(req.params.id));
    res.json({ message: "Blog deleted" });
};

export const BlogsController = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
}