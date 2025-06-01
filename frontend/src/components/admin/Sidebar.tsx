"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/profile", label: "Profile Settings" },
  { href: "/admin/logout", label: "Logout" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 border-r p-4 space-y-4">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <nav className="space-y-2">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 ${
              pathname === href
                ? "bg-gray-200 dark:bg-gray-800 font-medium"
                : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
