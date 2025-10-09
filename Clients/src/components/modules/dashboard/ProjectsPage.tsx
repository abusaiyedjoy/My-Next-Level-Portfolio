"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  ExternalLink,
  Code,
  Star,
  GitBranch,
  Grid3x3,
  List,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { TProject } from "@/types";
import LoadingPage from "@/app/(public)/projects/loading";
import Image from "next/image";

const ProjectsPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [projects, setProjects] = useState<TProject[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Delete project
  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete project");
      }

      setProjects(projects.filter((project) => project.id !== id));
      toast.success("Project deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete project. Please try again.");
      console.error("Error deleting project:", err);
    }
  };

  // Get unique categories
  const categories = ["all", ...new Set(projects.map((p) => p.category))];

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags?.some((tag: string) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      filterCategory === "all" || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="space-y-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-none bg-white/50 dark:bg-white/5 backdrop-blur-sm"
            />
          </div>

          {/* Filter & Actions */}
          <div className="flex gap-2 flex-wrap">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm border-none font-semibold text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex gap-1 p-1 bg-white/50 dark:bg-white/5 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-[#334DED] text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-[#334DED] text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => router.push("/dashboard/projects/create")}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#334DED] to-[#5865F2] text-white font-semibold flex items-center gap-2 hover:shadow-lg transition-all whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              New Project
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Total Projects",
              value: projects.length,
              icon: Briefcase,
              color: "from-blue-500 to-blue-600",
            },
            {
              label: "Full Stack",
              value: projects.filter((p) => p.category === "Full Stack").length,
              icon: Code,
              color: "from-purple-500 to-purple-600",
            },
            {
              label: "Frontend",
              value: projects.filter((p) => p.category === "Frontend").length,
              icon: Star,
              color: "from-pink-500 to-pink-600",
            },
            {
              label: "Categories",
              value: categories.length - 1,
              icon: GitBranch,
              color: "from-green-500 to-green-600",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-lg"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {stat.label}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </h3>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Projects Grid/List */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#334DED]" />
            All Projects ({filteredProjects.length})
          </h2>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-[#334DED]/20 to-[#5865F2]/20 overflow-hidden">
                    {project.image ? (
                      <Image
                        width={0}
                        height={0}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code className="w-16 h-16 text-[#334DED]/30" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 dark:text-white">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-semibold">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          router.push(`/dashboard/projects/edit/${project.id}`)
                        }
                        className="flex-1 px-3 py-2 rounded-lg bg-[#334DED]/10 text-[#334DED] font-semibold hover:bg-[#334DED]/20 transition-all flex items-center justify-center gap-2 text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => router.push(`/projects/${project.id}`)}
                        className="flex-1 px-3 py-2 rounded-lg bg-white/50 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-semibold hover:bg-white/80 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteProject(project.id as number)
                        }
                        className="px-3 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-all text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Links */}
                    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          <GitBranch className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-3 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
                      {/* Project Image */}
                      <div className="w-full lg:w-48 h-32 bg-gradient-to-br from-[#334DED]/20 to-[#5865F2]/20 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {project.image ? (
                          <Image
                            width={200}
                            height={200}
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Code className="w-12 h-12 text-[#334DED]/50" />
                        )}
                      </div>

                      {/* Project Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-3 mb-2 flex-wrap">
                              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white break-words">
                                {project.title}
                              </h3>
                              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-semibold whitespace-nowrap">
                                {project.category}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        {/* Tags */}
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-semibold"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              router.push(
                                `/dashboard/projects/edit/${project.id}`
                              )
                            }
                            className="px-4 py-2 rounded-lg bg-[#334DED]/10 text-[#334DED] font-semibold hover:bg-[#334DED]/20 transition-all flex items-center gap-2 text-sm"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              router.push(`/projects/${project.id}`)
                            }
                            className="px-4 py-2 rounded-lg bg-white/50 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-semibold hover:bg-white/80 dark:hover:bg-white/10 transition-all flex items-center gap-2 text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center gap-2 text-sm"
                            >
                              <GitBranch className="w-4 h-4" />
                              GitHub
                            </a>
                          )}
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-all flex items-center gap-2 text-sm"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Live
                            </a>
                          )}
                          <button
                            onClick={() =>
                              handleDeleteProject(project.id as number)
                            }
                            className="px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-all text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-xl">
            <CardContent className="p-8 md:p-12 text-center">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No Projects Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery || filterCategory !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first project"}
              </p>
              <button
                onClick={() => router.push("/dashboard/projects/create")}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#334DED] to-[#5865F2] text-white font-semibold flex items-center gap-2 hover:shadow-lg transition-all mx-auto"
              >
                <Plus className="w-5 h-5" />
                Create New Project
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
