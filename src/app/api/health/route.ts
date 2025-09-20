import { NextResponse } from "next/server";
import { db } from "@/db/client";

export async function GET() {
  try {
    // Test database connection
    const dbTest = await db.query.surveys.findMany({ limit: 1 });
    
    // Check environment variables
    const hasDatabase = !!process.env.DATABASE_URL;
    const hasGLM = !!process.env.GLM_API_KEY;
    
    const status = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: "connected",
          provider: "neon",
          tablesAccessible: true
        },
        glm: {
          status: hasGLM ? "configured" : "fallback",
          mode: hasGLM ? "api" : "mock"
        },
        environment: {
          database: hasDatabase,
          glm: hasGLM,
          baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "default"
        }
      },
      features: {
        surveys: true,
        segments: true,
        responses: true,
        insights: true,
        export: true,
        animations: true
      }
    };

    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
        services: {
          database: { status: "error" },
          glm: { status: "unknown" }
        }
      },
      { status: 500 }
    );
  }
}
