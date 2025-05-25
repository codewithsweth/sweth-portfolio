"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAuth) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button onClick={() => router.push("/admin/projects")}>
          Manage Projects
        </Button>
        <Button onClick={() => router.push("/admin/blogs")}>
          Manage Blogs
        </Button>
        <Button onClick={() => router.push("/admin/profile")}>
          Edit Profile
        </Button>
        <Button
          variant={"destructive"}
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/admin/login");
          }}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
