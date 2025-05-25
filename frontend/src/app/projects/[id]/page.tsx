"use client";

import API from "@/lib/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProjectProps {
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  live_url: string;
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    API.get(`/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-4">Loading project details...</p>;
  if (!project) return <p className="text-center">Project not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-2xl font-bold">{project?.title}</h1>
      <p className="text-muted-foreground">{project?.description}</p>
      <div className="flex flex-wrap gap-2">
        {project?.tech_stack.map((tech) => (
          <span key={tech} className="px-3 py-1 bg-secondary rounded-full">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4 pt-4">
        <a
          target="_blank"
          href={project?.github_url}
          className="text-blue-600 hover:underline"
        >
          GitHub Repo
        </a>
        <a
          target="_blank"
          href={project?.live_url}
          className="text-blue-600 hover:underline"
        >
          Live Site
        </a>
      </div>
    </div>
  );
}
