// This directive tells Next.js that this component runs on the client side
"use client";
// Import React hooks
import { useState, useEffect } from "react";
// Import the next-themes hook
import { useTheme } from "next-themes";
// Import Heroicons for sun/moon icons
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

// ThemeToggle component for switching between light and dark themes
export function ThemeToggle() {
  // State to track if component has mounted (prevents hydration issues)
  const [mounted, setMounted] = useState(false);
  
  // Get theme state and setter from next-themes
  const { setTheme, resolvedTheme } = useTheme();

  // Effect to handle component mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="flex items-center justify-center p-2 h-10 w-10 bg-gray-100 dark:bg-secondary-800 rounded-lg">
        <div className="h-5 w-5 bg-gray-300 dark:bg-secondary-600 rounded animate-pulse" />
        <span className="sr-only">Loading theme toggle</span>
      </button>
    );
  }

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // Determine if current theme is dark
  const isDark = resolvedTheme === 'dark';

  return (
    // Theme toggle button with accessibility features and hover animations
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
}
