import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { results } from "@/db/schema";
import { generateResponses } from "@/lib/glm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { surveyId } = body;

    // Get survey data with segments, questions, and options
    const survey = await db.query.surveys.findFirst({
      where: (surveys, { eq }) => eq(surveys.id, parseInt(surveyId)),
      with: {
        segments: true,
        questions: {
          with: {
            options: true
          }
        }
      }
    });

    if (!survey) {
      return NextResponse.json(
        { error: "Survey not found" },
        { status: 404 }
      );
    }

    // Generate responses using GLM
    const simulatedResults = await generateResponses(
      survey.segments.map(s => ({
        id: s.id,
        name: s.name!,
        percentage: s.percentage!,
        persona: s.persona!
      })),
      survey.questions.map(q => ({
        id: q.id,
        text: q.text!,
        options: q.options.map(o => ({
          id: o.id,
          text: o.text!
        }))
      }))
    );

    // Save results to database
    await db.insert(results).values(
      simulatedResults.map(result => ({
        questionId: result.questionId,
        optionId: result.optionId,
        segmentId: result.segmentId,
        value: result.value,
      }))
    );

    return NextResponse.json({ 
      success: true,
      message: "Responses generated successfully using GLM",
      resultsCount: simulatedResults.length,
      glmUsed: true
    });

  } catch (error) {
    console.error("Error generating responses:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate responses" },
      { status: 500 }
    );
  }
}
