import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sweth | Portfolio",
  description: "A portfolio website showcasing my projects and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
