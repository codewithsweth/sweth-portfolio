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
    <div>
      <h1>Admin Dashboard</h1>
      <Button
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/admin/login");
        }}
      >
        Log Out
      </Button>
    </div>
  );
}
