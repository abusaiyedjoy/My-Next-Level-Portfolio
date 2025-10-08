"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, ArrowLeft, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import Background from '@/components/ui/background';

// Import react-quill-new which is compatible with React 18+
import dynamic from "next/dynamic";


const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    // @ts-ignore
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  { 
    ssr: false,
    loading: () => (
      <div className="bg-white/50 dark:bg-white/5 rounded-lg p-4 min-h-[150px] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading editor...</p>
      </div>
    )
  }
)as typeof import("react-quill-new").default;

const categories = ["Full Stack", "Frontend", "Backend", "Mobile", "DevOps"];

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
];

interface ProjectFormData {
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  github: string;
  live: string;
}

const CreateProjectPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      category: "",
      tags: [],
      github: "",
      live: "",
    },
  });

  const tags = watch("tags");

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setValue("tags", [...tags, tagInput.trim()], { shouldValidate: true });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove),
      { shouldValidate: true }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to create project");
      }

      await res.json();
      toast.success("Project created successfully!");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Failed to create project. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <Background />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
        </div>
          <h1 className="text-2xl mb-3 text-center md:text-3xl font-bold text-gray-900 dark:text-white">
            Create New Project
          </h1>

        <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-xl">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-semibold">
                  Project Title *
                </Label>
                <Input
                  id="title"
                  {...register("title", {
                    required: "Title is required",
                  })}
                  placeholder="Enter project title"
                  className={`border-none bg-white/50 dark:bg-white/5 ${
                    errors.title ? "ring-2 ring-red-500" : ""
                  }`}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* Description with React Quill */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-semibold">
                  Description *
                </Label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <div
                      className={`bg-white/50 dark:bg-white/5 rounded-lg overflow-hidden ${
                        errors.description ? "ring-2 ring-red-500" : ""
                      }`}
                    >
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Describe your project..."
                        className="quill-editor"
                      />
                    </div>
                  )}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-base font-semibold">
                  Image URL
                </Label>
                <Input
                  id="image"
                  {...register("image")}
                  placeholder="Enter image URL (e.g., ./project1.jpg)"
                  className="border-none bg-white/50 dark:bg-white/5"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-base font-semibold">
                  Category *
                </Label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={`border-none bg-white/50 dark:bg-white/5 ${
                          errors.category ? "ring-2 ring-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-sm text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags" className="text-base font-semibold">
                  Tags *
                </Label>
                <Controller
                  name="tags"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value.length > 0 || "At least one tag is required",
                  }}
                  render={() => (
                    <>
                      <div className="flex gap-2">
                        <Input
                          id="tags"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Add a tag and press Enter"
                          className={`border-none bg-white/50 dark:bg-white/5 ${
                            errors.tags ? "ring-2 ring-red-500" : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={handleAddTag}
                          className="px-6 py-2 bg-[#334DED] hover:bg-[#2a3ec4] text-white rounded-lg font-medium transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </>
                  )}
                />
                {errors.tags && (
                  <p className="text-sm text-red-500">{errors.tags.message}</p>
                )}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold flex items-center gap-2 transition-all hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* GitHub URL */}
              <div className="space-y-2">
                <Label htmlFor="github" className="text-base font-semibold">
                  GitHub Repository URL
                </Label>
                <Input
                  id="github"
                  {...register("github")}
                  placeholder="https://github.com/username/repo"
                  className="border-none bg-white/50 dark:bg-white/5"
                />
              </div>

              {/* Live Demo URL */}
              <div className="space-y-2">
                <Label htmlFor="live" className="text-base font-semibold">
                  Live Demo URL
                </Label>
                <Input
                  id="live"
                  {...register("live")}
                  placeholder="https://yourproject.com"
                  className="border-none bg-white/50 dark:bg-white/5"
                />
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/projects")}
                  disabled={loading}
                  className="flex-1 px-6 py-3 border-none bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#334DED] to-[#5865F2] hover:shadow-lg text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {loading ? "Creating..." : "Create Project"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default CreateProjectPage;