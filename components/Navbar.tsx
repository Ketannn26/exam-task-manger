"use client";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b bg-white dark:bg-gray-800 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-6">
        <span className="font-bold text-lg text-blue-600">📋 TaskFlow</span>
        <Link href="/" className="text-sm text-gray-600 hover:text-blue-600">
          Dashboard
        </Link>
        <Link
          href="/tasks"
          className="text-sm text-gray-600 hover:text-blue-600"
        >
          Tasks
        </Link>
        <Link
          href="/create"
          className="text-sm text-gray-600 hover:text-blue-600"
        >
          Create Task
        </Link>
      </div>
      <button
        onClick={toggleTheme}
        className="rounded-full p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Toggle theme"
      >
        <span suppressHydrationWarning>
          {!mounted ? (
            <span className="w-4 h-4 block" />
          ) : theme === "light" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </span>
      </button>
    </nav>
  );
}
