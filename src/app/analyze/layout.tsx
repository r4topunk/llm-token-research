"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AnalyzeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Token AI Analyzer
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-4">
        <div className="container flex justify-between text-sm text-muted-foreground">
          <p>© 2023 Token AI Analyzer</p>
          <p>v1.0.0</p>
        </div>
      </footer>
    </div>
  );
} 