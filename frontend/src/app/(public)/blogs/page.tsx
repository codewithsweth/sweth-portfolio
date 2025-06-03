"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import API from "@/lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  published_at: string;
};

export default function BlogPage() {
  const [posts, setBlogs] = useState<BlogPost[]>([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await API.get("/blogs/");
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

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = JSON.stringify({ email });
    try {
      const response = await API.post("/contact/subscribe", payload);
      if (response.status === 200) {
        toast.success("Subscriber successfully!");
        setEmail("");
        // setSubscribed(true);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error(axiosError.response?.data.detail || "Failed to send email");
    }
  };

  if (isLoading) return <p className="p-4">Loading blog posts...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Developer Blog</h2>
          <p className="text-muted-foreground">
            I write about frontend frameworks, backend design, and developer
            tips. Subscribe to stay updated!
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="email">
            Subscribe vai email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="Your email address"
            className="w-full px-4 py-2 border rounded-md bg-background"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            variant={"default"}
            className="mt-2 rounded cursor-pointer"
          >
            Subscribe
          </Button>
          {/* {subscribed && (
            <p className="text-sm text-green-600 mt-1">
              Subscriber successfully!
            </p>
          )} */}
        </form>
      </div>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="p-4 border rounded-lg bg-card">
            <Link href={`/blogs/${post.slug}`}>
              <h2 className="text-xl font-semibold hover:underline">
                {post.title}
              </h2>
            </Link>
            <p className="text-muted-foreground">{post.summary}</p>
            <time className="text-xs text-foreground/60">
              {new Date(post.published_at).toLocaleDateString()}
            </time>
          </li>
        ))}
      </ul>
    </div>
  );
}
