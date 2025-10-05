"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Heart,
  Calendar,
  ExternalLink,
  Code,
  Star,
  GitBranch,
  Users,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce solution with payment integration, inventory management, and analytics.",
      status: "Published",
      date: "2024-09-15",
      views: 1234,
      likes: 145,
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://via.placeholder.com/400x250",
      github: "https://github.com",
      live: "https://example.com",
      featured: true,
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Modern portfolio showcasing projects and skills with dark mode support and responsive design.",
      status: "Draft",
      date: "2024-09-20",
      views: 589,
      likes: 82,
      tech: ["Next.js", "Tailwind CSS", "TypeScript"],
      image: "https://via.placeholder.com/400x250",
      github: "https://github.com",
      live: "",
      featured: false,
    },
    {
      id: 3,
      title: "Task Manager App",
      description: "Collaborative task management tool with real-time updates and team collaboration features.",
      status: "Published",
      date: "2024-09-10",
      views: 2456,
      likes: 298,
      tech: ["Vue.js", "Firebase", "Vuetify"],
      image: "https://via.placeholder.com/400x250",
      github: "https://github.com",
      live: "https://example.com",
      featured: true,
    },
    {
      id: 4,
      title: "Blog Platform",
      description: "Content management system with markdown support, SEO optimization, and analytics dashboard.",
      status: "Published",
      date: "2024-09-05",
      views: 3567,
      likes: 412,
      tech: ["Next.js", "Prisma", "PostgreSQL"],
      image: "https://via.placeholder.com/400x250",
      github: "https://github.com",
      live: "https://example.com",
      featured: false,
    },
    {
      id: 5,
      title: "Weather Dashboard",
      description: "Real-time weather information with forecasts, alerts, and interactive maps.",
      status: "Published",
      date: "2024-08-28",
      views: 892,
      likes: 67,
      tech: ["React", "OpenWeather API", "Chart.js"],
      image: "https://via.placeholder.com/400x250",
      github: "https://github.com",
      live: "https://example.com",
      featured: false,
    },
    {
      id: 6,
      title: "Social Media Analytics",
      description: "Analytics tool for tracking social media performance across multiple platforms.",
      status: "In Progress",
      date: "2024-09-25",
      views: 234,
      likes: 28,
      tech: ["Python", "Django", "React", "D3.js"],
      image: "https://via.placeholder.com/400x250",
      github: "https://github.com",
      live: "",
      featured: false,
    },
  ]);

  const handleDeleteProject = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || project.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusColors = {
    Published: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Draft: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
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

        {/* Filter */}
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm border-none font-semibold text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="in progress">In Progress</option>
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
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-[#334DED] text-white"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <div className="flex flex-col gap-1 w-4 h-4">
                <div className="w-4 h-1 bg-current rounded-sm"></div>
                <div className="w-4 h-1 bg-current rounded-sm"></div>
                <div className="w-4 h-1 bg-current rounded-sm"></div>
              </div>
            </button>
          </div>

          <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#334DED] to-[#5865F2] text-white font-semibold flex items-center gap-2 hover:shadow-lg transition-all">
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Projects", value: projects.length, icon: Briefcase },
          {
            label: "Published",
            value: projects.filter((p) => p.status === "Published").length,
            icon: Star,
          },
          {
            label: "Total Views",
            value: projects.reduce((sum, p) => sum + p.views, 0).toLocaleString(),
            icon: Eye,
          },
          {
            label: "Total Likes",
            value: projects.reduce((sum, p) => sum + p.likes, 0),
            icon: Heart,
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
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#334DED] to-[#5865F2] flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ProjectsPage;