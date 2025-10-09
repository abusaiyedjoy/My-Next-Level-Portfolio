"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { TProject } from "@/types";
import LoadingPage from "@/app/(public)/projects/loading";
import Background from "./../../../../components/ui/background";
import Image from "next/image";

const ProjectDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

  const [project, setProject] = useState<TProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch project");
        }

        const data: TProject = await res.json();
        setProject(data);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="mt-12 min-h-screen ">
      <Background />
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Header Actions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <button
            onClick={() => router.push("/projects")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </button>

          <div className="flex gap-2">
            {project?.github && (
              <a
                href={project?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            {project?.live && (
              <a
                href={project?.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#334DED] hover:bg-[#2a3ec4] text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-xl">
            <CardContent className="p-6 md:p-8 lg:p-10">
              {/* Project? Image */}
              {project?.image && (
                <div className="w-full h-64 md:h-96 lg:h-[500px] bg-gradient-to-br from-[#334DED]/20 to-purple-500/20 rounded-lg overflow-hidden mb-8">
                  <Image
                    width={500}
                    height={500}
                    src={project?.image}
                    alt={project?.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* Category Badge */}
              <div className="mb-4">
                <Badge className="bg-[#334DED] text-white border-none px-4 py-1.5 text-sm">
                  {project?.category}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {project?.title}
              </h1>

              {/* Description */}
              <div
                className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project!.description }}
              />

              {/* Tags */}
              {project?.tags && project?.tags.length > 0 && (
                <div className="mb-8 ">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-[#334DED]" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Technologies
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project?.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gradient-to-r from-[#334DED]/10 to-purple-500/10 text-[#334DED] dark:text-[#334DED] rounded-full text-sm font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
