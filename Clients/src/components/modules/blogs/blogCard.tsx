"use client";

import { TBlog } from "@/types";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  Heart,
  MessageCircle,
  BookOpen,
  ArrowRight,
  Tag,
} from "lucide-react";

const BlogCard = ({ blog }: { blog: TBlog }) => {
  const router = useRouter();
  const [hoveredBlog, setHoveredBlog] = useState<number | string | null>(null);

  const handleReadMore = () => {
    router.push(`/blogs/${blog.id}`);
  };

  const handleCardClick = () => {
    router.push(`/blogs/${blog.id}`);
  };

  return (
    <motion.div
      key={blog.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setHoveredBlog(blog.id)}
      onHoverEnd={() => setHoveredBlog(null)}
    >
      <Card
        onClick={handleCardClick}
        className="cursor-pointer border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl h-full group overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      >
        {/* Blog Image */}
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#334CEC]/10 to-purple-500/10">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: hoveredBlog === blog.id ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {blog.image ? (
              <img
                src={blog?.image}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <BookOpen className="w-20 h-20 text-[#334CEC]/20" />
            )}
          </motion.div>
          <div className="absolute top-3 left-3">
            <Badge className="bg-[#334CEC] text-white border-none text-xs">
              {blog.category}
            </Badge>
          </div>
        </div>

        <CardHeader>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#334CEC] dark:group-hover:text-[#334CEC] transition-colors line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
            {blog.excerpt}
          </p>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {blog.tags.slice(0, 3).map((tag, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-[#334CEC]/10 text-[#334CEC] dark:bg-[#334CEC]/20 dark:text-[#334CEC] border-none text-xs px-2 py-0.5"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
            
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5" />
                {blog.likes || 0}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                {blog.comments || 0}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleReadMore();
            }}
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#334CEC] to-purple-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#334CEC]/50 transition-all text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Read More
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BlogCard;