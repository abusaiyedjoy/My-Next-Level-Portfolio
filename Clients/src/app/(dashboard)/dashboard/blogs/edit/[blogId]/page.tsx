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
import { Save, ArrowLeft, X, Loader2 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
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

export type TBlog = {
  id: string | number;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  tags: string[];
  author: string;
  authorAvatar?: string;
  date?: string;
  views?: number;
  comments?: number;
  likes?: number;
};

type FormData = Omit<TBlog, "id" | "date" | "views" | "comments" | "likes">;

const EditBlogPage = () => {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [tagInput, setTagInput] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      image: "",
      category: "",
      tags: [],
      author: "",
      authorAvatar: "",
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

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setFetching(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch blog");
        }

        const data: TBlog = await res.json();

        // Reset form with fetched data
        reset({
          title: data.title || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          image: data.image || "",
          category: data.category || "",
          tags: data.tags || [],
          author: data.author || "",
          authorAvatar: data.authorAvatar || "",
        });
      } catch (err) {
        alert("Failed to fetch blog. Please try again.");
        console.error(err);
        router.push("/blogs");
      } finally {
        setFetching(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId, router, reset]);

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

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const blogData = {
        ...data,
        readTime: `${Math.ceil(data.content.split(" ").length / 200)} min read`,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update blog");
      }

      await res.json();

      alert("Blog updated successfully!");
      router.push("/blogs");
    } catch (err) {
      alert("Failed to update blog. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#334DED] animate-spin mx-auto mb-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push("/blogs")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Edit Blog
          </h1>
        </div>

        <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-xl">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                          className="bg-[#334DED] hover:bg-[#2a3ec4]"
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

              {/* Action button */}
              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-[#334DED] to-[#5865F2] hover:shadow-lg min-w-[200px]"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {loading ? "Updating..." : "Update Blog"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditBlogPage;