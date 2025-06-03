"use client";

import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
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

export default function ManageProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  useEffect(() => {
    API.get("/projects/")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Failed to fetch projects:", error))
      .finally(() => setLoading(false));
  }, []);

  const openConfirm = (projectId: number) => {
    setSelectedProjectId(projectId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProjectId) return;
    try {
      const response = await API.delete(`/projects/${selectedProjectId}`);
      if (response.status === 204) {
        setProjects((prev) => prev.filter((p) => p.id !== selectedProjectId));
      }
    } catch (error) {
      console.error("Error deleting project: ", error);
    } finally {
      setConfirmOpen(false);
      setSelectedProjectId(null);
    }
  };

  if (loading) return <p className="p-4">Loading Projects...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <Button
          variant={"default"}
          className="cursor-pointer"
          onClick={() => router.push("/admin/projects/add")}
        >
          + Add Project
        </Button>
      </div>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="p-4 border rounded-md bg-card">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {project.tech_stack.join(", ")}
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant={"secondary"}
                  onClick={() =>
                    router.push(`/admin/projects/edit/${project.id}`)
                  }
                >
                  Edit
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => openConfirm(project.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
