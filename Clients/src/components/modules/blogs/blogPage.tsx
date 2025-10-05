"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Background from "@/components/ui/background";
import { Search, BookOpen } from "lucide-react";
import { useState } from "react";
import { TBlog } from "@/types";
import BlogCard from "@/components/modules/blogs/blogCard";

const categories = [
  "All",
  "Web Development",
  "Programming",
  "Backend",
  "CSS & Design",
  "DevOps",
  "Performance",
  "Security",
  "API Design",
];

interface BlogPageProps {
  blogsData: TBlog[];
}
const BlogPage = ({ blogsData }: BlogPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogsData?.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <Background />
      <motion.div
        className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 max-w-7xl relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          staggerChildren: 0.1,
          delayChildren: 0.2,
        }}
      >
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 mt-10 md:mt-8 lg:mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-[#334CEC] to-purple-600 dark:from-white dark:via-[#334CEC] dark:to-purple-400 bg-clip-text text-transparent">
              Blog & Articles
            </h1>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent to-[#334CEC] rounded-full"></div>
            <div className="h-1 w-8 bg-[#334CEC] rounded-full"></div>
            <div className="h-1 w-20 bg-gradient-to-l from-transparent to-[#334CEC] rounded-full"></div>
          </div>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Sharing insights on{" "}
            <span className="text-[#334CEC] font-semibold">
              web development
            </span>
            , <span className="text-purple-500 font-semibold">programming</span>
            , and{" "}
            <span className="text-blue-500 font-semibold">technology</span>
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 rounded-2xl border-none bg-white/80 dark:bg-white/10 backdrop-blur-xl shadow-lg focus:shadow-xl focus:ring-2 focus:ring-[#334CEC]/50 transition-all"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#334CEC] to-purple-600 text-white shadow-lg shadow-[#334CEC]/30"
                    : "bg-white/50 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* All Articles Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-6 h-6 text-[#334CEC]" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              {searchQuery ? "Search Results" : "All Articles"}
            </h2>
            <span className="px-3 py-1 rounded-full bg-[#334CEC]/10 text-[#334CEC] text-sm font-semibold">
              {filteredBlogs?.length}
            </span>
          </div>

          {filteredBlogs?.length === 0 ? (
            <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-xl p-12 text-center">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs?.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BlogPage;
