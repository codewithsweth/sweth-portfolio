"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  return (
    <header>
      <div>
        <Link href="/">Sweth</Link>
        <nav>
            <Link href="/projects">Projects</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
            <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
