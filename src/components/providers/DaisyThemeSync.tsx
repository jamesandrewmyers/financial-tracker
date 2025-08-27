"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function DaisyThemeSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const theme = resolvedTheme === "dark" ? "dark" : "light";
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [resolvedTheme]);

  return null;
}

