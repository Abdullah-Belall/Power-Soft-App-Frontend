"use client";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createCustomTheme } from "@/app/utils/theme";
import { useEffect, useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<any>(null);

  useEffect(() => {
    // أنشئ الـ theme أول ما يشتغل المتصفح
    const updateTheme = () => {
      setTheme(createCustomTheme());
    };

    updateTheme();

    // راقب التغييرات على CSS variables
    const observer = new MutationObserver(() => {
      updateTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);

  // لو لسه الـ theme مش جاهز ما ترجعش أي شيء عشان تمنع hydration mismatch
  if (!theme) return null;

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
