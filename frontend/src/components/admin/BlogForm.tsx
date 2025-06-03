"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type BlogFormData = {
  id?: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  published: boolean;
};

type Props = {
  onSubmit: (data: BlogFormData) => void;
  initialData?: BlogFormData;
};

export default function BlogForm({ onSubmit, initialData }: Props) {
  const [form, setForm] = useState({
    slug: "",
    title: "",
    summary: "",
    content: "",
    published: false,
  });

  useEffect(() => {
    if (initialData) {
      const temp = {
        id: initialData.id,
        slug: initialData.slug,
        title: initialData.title,
        summary: initialData.summary,
        content: initialData.content,
        published: initialData.published,
      };
      setForm(temp);
    }
  }, [initialData]);

  const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setForm({
        ...form,
        [name]: e.target.checked,
      });
    } else if (name === "title") {
      const slug = slugify(e.target.value)
      setForm({
        ...form,
        [name]: e.target.value,
        slug: slug,
      });
    } else {
      setForm({
        ...form,
        [name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ ...form });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={form.slug}
        placeholder="Slug"
        readOnly
        className="bg-muted text-muted-foreground cursor-not-allowed"
      />
      <Input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <Textarea
        name="summary"
        value={form.summary}
        onChange={handleChange}
        placeholder="Summary"
        required
      />
      <Textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content (Markdown supported)"
        required
      />
      <h2 className="text-lg font-semibold mb-2">Blog Preview</h2>
      <h1 className="text-3xl font-bold">{form.title}</h1>
      <div className="text-sm text-muted-foreground">published date</div>
      <Markdown
        rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
      >
        {form.content}
      </Markdown>
      <div className="flex items-center gap-2">
        <Switch
          id="published"
          checked={form.published}
          onCheckedChange={(value) => setForm({ ...form, published: value })}
        />
        <Label htmlFor="published">Publish</Label>
      </div>
      <div className="flex gap-3">
        <Button type="submit">
          {!initialData ? "Add Blog" : "Update Blog"}
        </Button>
      </div>
    </form>
  );
}
