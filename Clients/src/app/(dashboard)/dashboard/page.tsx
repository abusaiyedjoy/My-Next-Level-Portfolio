"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Background from "@/components/ui/background";
import {
  User,
  Briefcase,
  FileText,
  Menu,
} from "lucide-react";
import ProfilePage from "@/components/modules/dashboard/ProfilePage";
import ProjectsPage from "@/components/modules/dashboard/ProjectsPage";
import BlogsPage from "@/components/modules/dashboard/BlogsPage";
import Sidebar from "@/components/shared/Sidebar";

const sidebarItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "blogs", label: "Blogs", icon: FileText },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarOpen && window.innerWidth < 1024) {
        const sidebar = document.getElementById("sidebar");
        const menuButton = document.getElementById("menu-button");
        if (
          sidebar &&
          !sidebar.contains(e.target as Node) &&
          !menuButton?.contains(e.target as Node)
        ) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <Background />

      <div className="flex h-screen relative z-10">
        {/* Sidebar Component */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  id="menu-button"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
                >
                  <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {sidebarItems.find((item) => item.id === activeTab)?.label}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Manage your {activeTab}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <Link
                  href="/profile"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#334DED] to-[#5865F2] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </Link>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">

            {/* Dynamic Content Based on Active Tab */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeTab === "profile" && <ProfilePage />}
              {activeTab === "projects" && <ProjectsPage />}
              {activeTab === "blogs" && <BlogsPage />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;