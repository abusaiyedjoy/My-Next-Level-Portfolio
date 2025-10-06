"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Tag,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { TBlog } from "@/types";
import Background from "@/components/ui/background";

const BlogViewPage = () => {
  const router = useRouter();
  const params = useParams();
  const blogId = params.blogId as string;

  const [blog, setBlog] = useState<TBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch blog");
        }

        const data: TBlog = await res.json();
        setBlog(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#334DED] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Loading blog...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 min-h-screen ">
      <Background />
      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => router.push("/blogs")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blogs
          </button>
        </div>

        {/* Main Content Card */}
        <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-xl">
          <CardContent className="p-6 md:p-8 lg:p-10">
            {/* Featured Image */}
            {blog?.image && (
              <div className="w-full h-64 md:h-96 bg-gradient-to-br from-[#334DED]/20 to-[#5865F2]/20 rounded-lg overflow-hidden mb-6">
                <img
                  src={blog?.image}
                  alt={blog?.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Category Badge */}
            {blog?.category && (
              <div className="mb-4">
                <span className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold">
                  {blog?.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {blog?.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {blog?.excerpt}
            </p>

            {/* Author Info */}
            {blog?.author && (
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                {blog?.authorAvatar ? (
                  <img
                    src={blog?.authorAvatar}
                    alt={blog?.author}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#334DED] to-[#5865F2] flex items-center justify-center text-white text-lg font-semibold">
                    {blog?.author.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {blog?.author}
                  </p>
                </div>
              </div>
            )}

            {/* Tags */}
            {blog?.tags && blog?.tags.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {blog?.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold flex items-center gap-1"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content - Render HTML from Rich Text Editor */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div
                className="text-gray-800 dark:text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog?.content }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogViewPage;
