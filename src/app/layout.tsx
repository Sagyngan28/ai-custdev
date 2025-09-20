import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "AI CustDev Simulator",
  description: "Симуляция CustDev с помощью ИИ",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            <div className="min-h-screen bg-background text-foreground">
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </div>
            <Toaster position="top-right" />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
