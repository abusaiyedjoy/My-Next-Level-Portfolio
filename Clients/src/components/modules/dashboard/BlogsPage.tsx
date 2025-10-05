"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  Calendar,
  Share2,
  Tag,
  BookOpen,
  ThumbsUp,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TBlog } from "@/types";
import { toast } from "react-hot-toast";

const BlogsPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await res.json();
      setBlogs(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete blog
  const handleDeleteBlog = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete blog");
      }

      setBlogs(blogs?.filter((blog) => blog?.id !== id));
      toast.success("Blog deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete blog. Please try again.");
      console.error("Error deleting blog:", err);
    }
  };

  // Filter blogs
  const filteredBlogs = blogs?.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#334DED] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Loading blogs...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-xl max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Error Loading Blogs
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
              onClick={fetchBlogs}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#334DED] to-[#5865F2] text-white font-semibold hover:shadow-lg transition-all"
            >
              Retry
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="space-y-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search blogs, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-none bg-white/50 dark:bg-white/5 backdrop-blur-sm"
            />
          </div>

          {/* New Blog Button */}
          <button
            onClick={() => router.push("/blogs/create")}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#334DED] to-[#5865F2] text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            New Blog
          </button>
        </div>

        {/* All Blogs */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#334DED]" />
            All Posts ({filteredBlogs.length})
          </h2>
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <Card
                key={blog.id}
                className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all"
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
                    {/* Blog Icon/Image */}
                    <div className="w-full lg:w-24 h-24 bg-gradient-to-br from-[#334DED]/20 to-[#5865F2]/20 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FileText className="w-12 h-12 text-[#334DED]/50" />
                      )}
                    </div>

                    {/* Blog Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white break-words">
                              {blog.title}
                            </h3>
                            {blog.category && (
                              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded text-xs font-semibold whitespace-nowrap flex-shrink-0">
                                {blog.category}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {blog.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-semibold flex items-center gap-1"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Author Info */}
                      {blog.author && (
                        <div className="flex items-center gap-2 mb-4">
                          {blog.authorAvatar ? (
                            <img
                              src={blog.authorAvatar}
                              alt={blog.author}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#334DED] to-[#5865F2] flex items-center justify-center text-white text-sm font-semibold">
                              {blog.author.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {blog.author}
                          </span>
                        </div>
                      )}

                      {/* Stats and Actions */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-gray-600 dark:text-gray-400">
                          {blog.date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 flex-shrink-0" />
                              <span className="text-xs md:text-sm">
                                {new Date(blog.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                          )}
                          {blog.views !== undefined && (
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4 flex-shrink-0" />
                              <span className="text-xs md:text-sm">
                                {blog.views}
                              </span>
                            </div>
                          )}
                          {blog.comments !== undefined && (
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4 flex-shrink-0" />
                              <span className="text-xs md:text-sm">
                                {blog.comments}
                              </span>
                            </div>
                          )}
                          {blog.likes !== undefined && (
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4 flex-shrink-0" />
                              <span className="text-xs md:text-sm">
                                {blog.likes}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                          <button
                            onClick={() =>
                              router.push(`/dashboard/blogs/edit/${blog.id}`)
                            }
                            className="flex-1 sm:flex-initial px-3 md:px-4 py-2 rounded-lg bg-[#334DED]/10 text-[#334DED] font-semibold hover:bg-[#334DED]/20 transition-all flex items-center justify-center gap-2 text-sm"
                          >
                            <Edit className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => router.push(`/blogs/${blog.id}`)}
                            className="flex-1 sm:flex-initial px-3 md:px-4 py-2 rounded-lg bg-white/50 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-semibold hover:bg-white/80 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">View</span>
                          </button>
                          <button
                            className="px-3 md:px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-semibold hover:bg-green-200 dark:hover:bg-green-900/50 transition-all text-sm"
                            title="Share"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog.id as number)}
                            className="px-3 md:px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-all text-sm"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-xl">
            <CardContent className="p-8 md:p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No Blogs Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery
                  ? "Try adjusting your search criteria"
                  : "Get started by creating your first blog post"}
              </p>
              <button
                onClick={() => router.push("/blogs/create")}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#334DED] to-[#5865F2] text-white font-semibold flex items-center gap-2 hover:shadow-lg transition-all mx-auto"
              >
                <Plus className="w-5 h-5" />
                Create New Blog
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
