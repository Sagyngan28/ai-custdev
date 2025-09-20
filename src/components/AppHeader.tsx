"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

export function AppHeader({ title }: { title?: string }) {
  const router = useRouter();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              AI CustDev Simulator
            </Button>
            {title && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="font-medium">{title}</span>
              </>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
