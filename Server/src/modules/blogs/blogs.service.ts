import { Blog, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createBlog = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
    const result = await prisma.blog.create({
        data: payload,
    })

    return result;
}

const getAllBlogs = async () => {
    const result = await prisma.blog.findMany();
    return result;
};

const getBlogById = async (id: number) => {
    const result = await prisma.blog.findUnique({
        where: { id },
    });

    return result;
};

const updateBlog = async (id: number, data: Partial<Blog>) => {
    return prisma.blog.update({ where: { id }, data });
};

const deleteBlog = async (id: number) => {
    return prisma.blog.delete({ where: { id } });
};

export const BlogService = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
}