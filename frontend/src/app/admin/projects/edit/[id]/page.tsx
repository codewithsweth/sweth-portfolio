"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/lib/axios";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProjectForm() {
  const { id: projectId } = useParams();
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech_stack: "",
    github_url: "",
    live_url: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/projects/${projectId}`)
      .then((res) => {
        const project = res.data;
        setForm({
          ...project,
          tech_stack: project.tech_stack.join(","),
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [projectId]);

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
      const response = await API.put(`/projects/${projectId}`, payload);
      if (response.status === 200) {
        router.push("/admin/projects");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{
        detail: Array<{ msg: string }>;
      }>;
      const msg =
        axiosError.response?.data?.detail[0].msg || "Failed to edit project";
      setError(msg);
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Update Project</h1>
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
        />
        {error && <p className="text-center text-red-500">{error}</p>}
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}
