export type TProjectCategory = "Full Stack" | "Frontend" | "Backend";
export type TBlogCategory = "All"| "Web Development"| "Programming"| "Backend"| "CSS & Design"| "DevOps"| "Performance"| "Security"| "API Design";

export type TProject = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: TProjectCategory;
  tags: string[];
  github: string;
  live: string;
};

export type TBlog = {
  id: string | number;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  tags: string[];
  author: string;
  authorAvatar?: string;
  date?: string;
  views?: number;
  comments?: number;
  likes?: number;
}
