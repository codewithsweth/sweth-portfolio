"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type BlogPost = {
  slug: string;
  title: string;
  content: string;
  published_at: Date;
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`http://localhost:8000/blog/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        setBlogPost(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p className="p-4">Loading blog post...</p>;
  if (!blogPost) return <p className="p-4">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{blogPost.title}</h1>
      <time className="text-sm text-muted-foreground">
        {new Date(blogPost.published_at).toLocaleDateString()}
      </time>
      <article className="prose dark:prose-invert max-w-none">
        {blogPost.content}
      </article>
    </div>
  );
}
