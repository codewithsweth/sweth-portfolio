"use client";

import BlogForm from "@/components/admin/BlogForm";
import API from "@/lib/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type BlogFormData = {
  slug: string;
  title: string;
  summary: string;
  content: string;
  published: boolean;
};

export default function AddBlogPage() {
  const router = useRouter();

  const handleSubmit = async (formData: BlogFormData) => {
    try {
      const response = await API.post("/admin/blogs/", formData);
      if (response.status === 201) {
        if (response.data.published) {
          toast.success("Blog added and published successfully!");
        } else {
          toast.success(
            "Blog added successfully! It will be published after review."
          );
        }
        router.push("/admin/blogs");
      }
    } catch (error) {
      toast.error("Failed to add blog", error);
    } finally {
      //
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Add New Blog</h1>
      <BlogForm onSubmit={handleSubmit} />
    </div>
  );
}
