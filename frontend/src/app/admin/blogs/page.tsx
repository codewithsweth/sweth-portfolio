"use client";

import { Button } from "@/components/ui/button";
import API from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { AxiosError } from "axios";

interface Blog {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  published_at: string;
  published: boolean;
}

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  const openConfirm = (blogId: number) => {
    setSelectedBlogId(blogId);
    setConfirmOpen(true);
  };

  const fetchBlogs = async () => {
    try {
      const response = await API.get("/admin/blogs/");
      if (response.status === 200) {
        setBlogs(response.data);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>;
      if (axiosError.response?.status === 401) {
        toast.error(
          "Failed to fetch blogs: " + axiosError.response.data.detail
        );
        setBlogs([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedBlogId) return;
    try {
      const response = await API.delete(`/admin/blogs/${selectedBlogId}`);
      if (response.status === 204) {
        setBlogs((prev) => prev?.filter((b) => b.id !== selectedBlogId));
        toast.success("Blog deleted successfully");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>;
      if (axiosError.response?.status === 404) {
        toast.error(
          "Error deleting project: " + axiosError.response.data.detail
        );
      }
    } finally {
      setConfirmOpen(false);
      setSelectedBlogId(null);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <Link href={"/admin/blogs/add"}>
          <Button>Add New Blog</Button>
        </Link>
      </div>

      {!isLoading && blogs?.length === 0 ? (
        <div className="flex items-center justify-center">
          <Image
            src="/images/nothing-here-yet.png"
            alt="No items"
            width={300}
            height={300}
            priority
          />
        </div>
      ) : (
        <ul className="space-y-4">
          {blogs?.map((blog) => (
            <li key={blog.id} className="p-4 border rounded bg-card">
              <div className="flex justify-between items-start">
                <div>
                  <Link href={`/admin/blogs/${blog.slug}`}>
                    <h2 className="text-lg font-semibold hover:underline">{blog.title}</h2>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {blog.published
                      ? `Published on ${blog.published_at}`
                      : "Draft"}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      blog.published
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {blog.published ? "Published" : "Draft"}
                  </span>
                  <Link href={`/admin/blogs/edit/${blog.id}`}>
                    <Button variant="outline">Edit</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => openConfirm(blog.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
