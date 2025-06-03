"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import API from "@/lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

type BlogPost = {
  slug: string;
  title: string;
  content: string;
  published_at: Date;
};

export default function BlogPreview() {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await API.get(`/blogs/${slug}`);
        if (response.status === 200) {
          setBlogPost(response.data);
        }
      } catch (error) {
        const axiosError = error as AxiosError<{ detail: string }>;
        toast.error(
          "Failed to add blog: " + axiosError.response?.data.detail ||
            "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) return <p className="p-4">Loading blog post...</p>;
  if (!blogPost) return <p className="p-4">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{blogPost.title}</h1>
      <div className="text-sm text-muted-foreground">
        {new Date(blogPost.published_at).toLocaleDateString()}
      </div>
      <Markdown
        rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
      >
        {blogPost.content}
      </Markdown>
    </div>
  );
}
