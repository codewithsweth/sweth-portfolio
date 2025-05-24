"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/lib/axios";
import { AxiosError } from "axios";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/auth/login", form);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.access_token);
        router.push("/admin");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>;
      setError(axiosError.response?.data.detail ?? "Login failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Admin Email"
          required
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>
    </div>
  );
}
