"use client";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Code2 } from "lucide-react";
import { TProject } from "@/types";
import { useState } from "react";
import Link from "next/link";

const ProjectCard = ({ project }: { project: TProject }) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setHoveredProject(project.id)}
      onHoverEnd={() => setHoveredProject(null)}
    >
      <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-[#334CEC]/20 transition-all duration-500 h-full group overflow-hidden">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#334CEC]/10 to-purple-500/10">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: hoveredProject === project.id ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <Code2 className="w-24 h-24 text-[#334CEC]/20" />
          </motion.div>
        </div>

        <CardHeader>
          <Link
            href={`/projects/${project.id}`}
            className="flex items-start justify-between"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#334CEC] dark:group-hover:text-[#334CEC] transition-colors">
              {project.title}
            </h3>
          </Link>
        </CardHeader>

        <CardContent className="space-y-4">
          <p
            className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html:
                project.description.length > 200
                  ? project.description.slice(0, 200) + "..."
                  : project.description,
            }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag: string, i: number) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-[#334CEC]/10 text-[#334CEC] dark:bg-[#334CEC]/20 dark:text-[#334CEC] border-none text-xs"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge
                variant="secondary"
                className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-none text-xs"
              >
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex gap-3">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="w-full px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm">
              <Github className="w-4 h-4" />
              Code
            </button>
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#334CEC] to-purple-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#334CEC]/50 transition-all text-sm">
              <ExternalLink className="w-4 h-4" />
              Live
            </button>
          </motion.a>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
