import { useEffect, useState } from "react";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored) return stored;

  // Optional fallback to system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

const useThemeMode = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const handleThemeChange = () => {
      const updated = localStorage.getItem("theme") || "light";
      setTheme(updated);
    };

    // Observe changes to localStorage
    window.addEventListener("storage", handleThemeChange);

    // Observe class changes on <html> (optional, for Tailwind dark class)
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("storage", handleThemeChange);
      observer.disconnect();
    };
  }, []);

  return theme; // either "dark" or "light"
};

export default useThemeMode;
