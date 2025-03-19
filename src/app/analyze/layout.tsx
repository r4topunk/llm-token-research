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
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="text-xl font-bold px-2">
            Token AI Analyzer
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-4">
        <div className="container mx-auto flex justify-between text-sm text-muted-foreground px-4 md:px-6">
          <p className="px-2">Token AI Analyzer</p>
          <p>v1.0.0</p>
        </div>
      </footer>
    </div>
  );
} 