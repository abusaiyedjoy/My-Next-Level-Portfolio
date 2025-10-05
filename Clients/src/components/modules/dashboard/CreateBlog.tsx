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
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const categories = [
  "Web Development",
  "Programming",
  "Backend",
  "CSS & Design",
  "DevOps",
  "Performance",
  "Security",
  "API Design",
];

interface FormData {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  authorAvatar: string;
}

const CreateBlogPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      image: "",
      category: "",
      tags: [],
      author: "Abu Saiyed Joy",
      authorAvatar: "/profile.jpg",
    },
  });

  const tags = watch("tags");

  // Quill modules configuration
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
      ],
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
  ];

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

  const onSubmit = async (data: FormData, status = "published") => {
    setLoading(true);

    try {
      const blogData = {
        ...data,
        status,
        date: new Date().toISOString(),
        readTime: `${Math.ceil(data.content.split(" ").length / 200)} min read`,
        views: 0,
        comments: 0,
        likes: 0,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!res.ok) {
        throw new Error("Failed to create blog");
      }

      await res.json();

      alert(
        `Blog ${status === "published" ? "published" : "saved as draft"} successfully!`
      );
      router.push("/blogs");
    } catch (err) {
      alert("Failed to create blog. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push("/blogs")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Create New Blog
          </h1>
        </div>

        <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-xl">
          <CardContent className="p-6 md:p-8">
            <form
              onSubmit={handleSubmit((data) => onSubmit(data, "published"))}
              className="space-y-6"
            >
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-semibold">
                  Title *
                </Label>
                <Input
                  id="title"
                  {...register("title", {
                    required: "Title is required",
                    validate: (value) =>
                      value.trim() !== "" || "Title cannot be empty",
                  })}
                  placeholder="Enter blog title"
                  className={`border-none bg-white/50 dark:bg-white/5 ${
                    errors.title ? "ring-2 ring-red-500" : ""
                  }`}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-base font-semibold">
                  Excerpt *
                </Label>
                <Input
                  id="excerpt"
                  {...register("excerpt", {
                    required: "Excerpt is required",
                    validate: (value) =>
                      value.trim() !== "" || "Excerpt cannot be empty",
                  })}
                  placeholder="Brief description of your blog"
                  className={`border-none bg-white/50 dark:bg-white/5 ${
                    errors.excerpt ? "ring-2 ring-red-500" : ""
                  }`}
                />
                {errors.excerpt && (
                  <p className="text-sm text-red-500">
                    {errors.excerpt.message}
                  </p>
                )}
              </div>

              {/* Content with Rich Text Editor */}
              <div className="space-y-2">
                <Label htmlFor="content" className="text-base font-semibold">
                  Content *
                </Label>
                <Controller
                  name="content"
                  control={control}
                  rules={{
                    required: "Content is required",
                    validate: (value) => {
                      const text = value.replace(/<[^>]*>/g, "").trim();
                      return text !== "" || "Content cannot be empty";
                    },
                  }}
                  render={({ field }) => (
                    <div
                      className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden ${
                        errors.content ? "ring-2 ring-red-500" : ""
                      }`}
                    >
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        modules={modules}
                        formats={formats}
                        placeholder="Write your blog content here..."
                        className="h-64"
                      />
                    </div>
                  )}
                />
                {errors.content && (
                  <p className="text-sm text-red-500 mt-16">
                    {errors.content.message}
                  </p>
                )}
              </div>

              {/* Image URL */}
              <div className="space-y-2 mt-16">
                <Label htmlFor="image" className="text-base font-semibold">
                  Image URL
                </Label>
                <Input
                  id="image"
                  {...register("image")}
                  placeholder="Enter image URL"
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
                          className="px-4 py-2 bg-[#334DED] hover:bg-[#2a3ec4] text-white rounded-md transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      {errors.tags && (
                        <p className="text-sm text-red-500">
                          {errors.tags.message}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold flex items-center gap-2"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                />
              </div>

              {/* Author Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-base font-semibold">
                    Author
                  </Label>
                  <Input
                    id="author"
                    {...register("author")}
                    className="border-none bg-white/50 dark:bg-white/5"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="authorAvatar"
                    className="text-base font-semibold"
                  >
                    Author Avatar URL
                  </Label>
                  <Input
                    id="authorAvatar"
                    {...register("authorAvatar")}
                    className="border-none bg-white/50 dark:bg-white/5"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <button
                  type="button"
                  onClick={handleSubmit((data) => onSubmit(data, "draft"))}
                  disabled={loading}
                  className="flex-1 px-6 py-3 border-none bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 rounded-md transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save as Draft"}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#334DED] to-[#5865F2] hover:shadow-lg text-white rounded-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {loading ? "Publishing..." : "Publish Blog"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateBlogPage;