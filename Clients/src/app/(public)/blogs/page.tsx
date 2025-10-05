import BlogsPage from "@/components/modules/blogs/blogPage";
import Background from "@/components/ui/background";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abu Saiyed Joy | Blogs",
  description: "This is my professional portfolio",
};

const Blogs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    cache: "no-store",
  });
  const blogs = await res.json();

  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <Background />

      {/* Pass data to Client Component */}
      <BlogsPage blogsData={blogs} />
    </div>
  );
};

export default Blogs;
