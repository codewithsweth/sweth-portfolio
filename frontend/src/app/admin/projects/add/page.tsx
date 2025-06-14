"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminProjectPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech_stack: "",
    github_url: "",
    live_url: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        ...form,
        tech_stack: form.tech_stack.split(",").map((tech) => tech.trim()),
      };
      const response = await API.post("/projects/", payload);
      if (response.status === 201) {
        toast.success("Project added successfully!");
        router.push("/admin/projects");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>;
      const msg = axiosError.response?.data?.detail || "Failed to add project";
      toast.error(msg);
      setError(msg);
    }
  };
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Add New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows={3}
          required
        />
        <Input
          name="tech_stack"
          value={form.tech_stack}
          onChange={handleChange}
          placeholder="Tech Stack (comma separated)"
          required
        />
        <Input
          name="github_url"
          value={form.github_url}
          onChange={handleChange}
          placeholder="GitHub URL"
          required
        />
        <Input
          name="live_url"
          value={form.live_url}
          onChange={handleChange}
          placeholder="Live URL (optional)"
          required
        />
        {error && <p className="text-center text-red-500">{error}</p>}
        <Button type="submit">Add Project</Button>
      </form>
    </div>
  );
}
