import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { segments } from "@/db/schema";
import { generateSegments } from "@/lib/glm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { niche, surveyId } = body;

    // Get survey questions for context
    const survey = await db.query.surveys.findFirst({
      where: (surveys, { eq }) => eq(surveys.id, parseInt(surveyId)),
      with: {
        questions: true
      }
    });

    if (!survey) {
      return NextResponse.json(
        { error: "Survey not found" },
        { status: 404 }
      );
    }

    // Extract question texts for GLM context
    const questionTexts = survey.questions.map(q => q.text || '').filter(Boolean);

    // Generate segments using GLM
    const glmResponse = await generateSegments(niche || "Без ниши", questionTexts);
    
    // Save segments to database
    const savedSegments = [];
    for (const segment of glmResponse.segments) {
      const [savedSegment] = await db.insert(segments).values({
        surveyId: parseInt(surveyId),
        name: segment.name,
        percentage: segment.percentage,
        persona: segment.persona,
      }).returning();
      
      savedSegments.push(savedSegment);
    }

    return NextResponse.json({ 
      success: true,
      segments: savedSegments,
      glmUsed: true
    });

  } catch (error) {
    console.error("Error generating segments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate segments" },
      { status: 500 }
    );
  }
}
