"use client";

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

  return <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>;
}
