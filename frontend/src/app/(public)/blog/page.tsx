"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  published_at: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/blog")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/contact/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setSubscribed(true);
    }
  };

  if (loading) return <p className="p-4">Loading blog posts...</p>;

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
          {subscribed && (
            <p className="text-sm text-green-600 mt-1">
              Subscriber successfully!
            </p>
          )}
        </form>
      </div>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="p-4 border rounded-lg bg-card">
            <Link href={`/blog/${post.slug}`}>
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
