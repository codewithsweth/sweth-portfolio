"use client";

import { ThemeToggle } from "../layout/ThemeToggle";

export default function AdminNavbar() {
  return (
    <header className="w-full flex justify-between items-center p-4 border-b bg-background">
      <h1>Admin Panel</h1>
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
}
