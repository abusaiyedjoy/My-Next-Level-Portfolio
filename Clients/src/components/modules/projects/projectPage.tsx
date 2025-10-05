"use client";

import { motion, Variants } from "framer-motion";
import { Layers } from "lucide-react";
import { useState } from "react";
import { TProject } from "@/types";
import ProjectCard from "./projectCard";

const categories = ["All", "Full Stack", "Frontend", "Backend"];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

interface ProjectPageProps {
  projectsData: TProject[];
}

const ProjectPage = ({ projectsData }: ProjectPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <motion.div
      className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 max-w-7xl relative z-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div
        className="text-center mb-16 mt-10 md:mt-8 lg:mt-6"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-[#334CEC] to-purple-600 dark:from-white dark:via-[#334CEC] dark:to-purple-400 bg-clip-text text-transparent">
            My Projects
          </h1>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent to-[#334CEC] rounded-full"></div>
          <div className="h-1 w-8 bg-[#334CEC] rounded-full"></div>
          <div className="h-1 w-20 bg-gradient-to-l from-transparent to-[#334CEC] rounded-full"></div>
        </div>

        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Showcasing my passion for{" "}
          <span className="text-[#334CEC] font-semibold">innovation</span>,{" "}
          <span className="text-purple-500 font-semibold">creativity</span>,
          and{" "}
          <span className="text-blue-500 font-semibold">problem-solving</span>
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div className="mb-12" variants={itemVariants}>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
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

      {/* All Projects Grid */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-8">
          <Layers className="w-6 h-6 text-[#334CEC]" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            All Projects
          </h2>
          <span className="px-3 py-1 rounded-full bg-[#334CEC]/10 text-[#334CEC] text-sm font-semibold">
            {filteredProjects?.length ?? 0}
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects?.map((project: TProject) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectPage;