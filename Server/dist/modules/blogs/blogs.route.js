"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = __importDefault(require("express"));
const blogs_controller_1 = require("./blogs.controller");
const router = express_1.default.Router();
router.post("/", blogs_controller_1.BlogsController.createBlog);
router.get("/", blogs_controller_1.BlogsController.getAllBlogs);
router.get("/:id", blogs_controller_1.BlogsController.getBlogById);
router.patch("/:id", blogs_controller_1.BlogsController.updateBlog);
router.delete("/:id", blogs_controller_1.BlogsController.deleteBlog);
exports.blogsRouter = router;
