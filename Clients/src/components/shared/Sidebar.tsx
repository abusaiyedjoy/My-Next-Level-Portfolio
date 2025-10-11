import React from 'react';
import { signOut } from "next-auth/react";
import { User, Briefcase, FileText, LogOut } from 'lucide-react';
import  Link  from "next/link";
import Image from 'next/image';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const sidebarItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "blogs", label: "Blogs", icon: FileText },
];

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  sidebarOpen, 
  setSidebarOpen 
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/80 dark:bg-white/5 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 shadow-xl lg:shadow-none transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <Link href="/" className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl  flex items-center justify-center">
                <Image
                  src="/logo.png"
                  width={100}
                  height={100}
                  alt={"logo"}
                  className=" w-10 h-10"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Dashboard</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:translate-x-1 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-[#334DED] to-[#5865F2] text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/10"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 hover:translate-x-1"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;