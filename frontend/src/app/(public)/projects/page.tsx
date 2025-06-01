"use client";

import API from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  live_url?: string;
};

export default function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    API.get("http://localhost:8000/projects")
      .then((response) => setProjects(response.data))
      .catch((err) => console.error("Failed to fetch projects:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading Projects...</p>;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Projects</h1>
      <ul className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <li
            key={project.id}
            className="p-4 border rounded-lg shadow-sm bg-card cursor-pointer"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) return;
              router.push(`/projects/${project.id}`);
            }}
          >
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-muted-foreground mt-1">{project.description}</p>
            <div className="mt-2 text-sm text-primary">
              {project.tech_stack.join(", ")}
            </div>
            <div className="mt-3 flex gap-4 text-sm underline">
              <a
                href={project.github_url}
                target="_blank"
                className="hover:text-blue-600"
              >
                GitHub
              </a>
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  className="hover:text-blue-600"
                >
                  Live
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
