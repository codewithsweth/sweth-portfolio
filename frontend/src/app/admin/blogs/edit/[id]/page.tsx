"use client";

import BlogForm from "@/components/admin/BlogForm";
import API from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type BlogFormData = {
  slug: string;
  title: string;
  summary: string;
  content: string;
  published: boolean;
};

export default function EditBlogPage() {
  const [initialData, setInitialData] = useState<BlogFormData | undefined>(
    undefined
  );
  const { id: blogId } = useParams();
  const router = useRouter();

  const handleEditBlog = async (formData: BlogFormData) => {
    try {
      const response = await API.put(`/admin/blogs/${blogId}`, formData);
      if (response.status === 200) {
        if (response.data.published) {
          toast.success("Blog updated and published successfully!");
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

  const fetchBlog = async () => {
    try {
      const response = await API.get(`/admin/blogs/${blogId}`);
      if (response.status === 200) {
        setInitialData(response.data);
      }
    } catch (error) {
      toast.error("Failed to add blog", error);
    } finally {
      //
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Update Blog</h1>
      <BlogForm onSubmit={handleEditBlog} initialData={initialData} />
    </div>
  );
}
