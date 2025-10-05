import Background from "@/components/ui/background";
import ProjectsPage from "@/components/modules/projects/projectPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abu Saiyed Joy | Projects",
  description: "This is my professional portfolio",
};
// Server Component - fetches data
const Projects = async () => {
  // Fetch projects on the server
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
    cache: "no-store",
  });
  const projects = await res.json();

  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <Background />

      {/* Pass data to Client Component */}
      <ProjectsPage projectsData={projects} />
    </div>
  );
};

export default Projects;
