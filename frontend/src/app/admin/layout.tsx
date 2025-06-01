"use client";

import AdminNavbar from "@/components/admin/AdminNavbar";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <AdminNavbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
