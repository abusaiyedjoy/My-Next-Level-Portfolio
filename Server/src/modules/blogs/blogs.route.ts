import express from "express";
import { BlogsController } from "./blogs.controller";

const router = express.Router();

router.post("/", BlogsController.createBlog);
router.get("/", BlogsController.getAllBlogs);
router.get("/:id", BlogsController.getBlogById);
router.patch("/:id", BlogsController.updateBlog);
router.delete("/:id", BlogsController.deleteBlog);

export const blogsRouter = router;
