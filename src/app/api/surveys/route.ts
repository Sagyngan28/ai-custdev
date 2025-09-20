import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { surveys, questions, options } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { niche, title, surveyQuestions } = body;

    // Create survey
    const [survey] = await db.insert(surveys).values({
      niche,
      title,
    }).returning();

    // Create questions and options
    for (const q of surveyQuestions) {
      const [question] = await db.insert(questions).values({
        surveyId: survey.id,
        text: q.text,
        type: q.type || 'multiple-choice',
      }).returning();

      if (q.options && q.options.length > 0) {
        await db.insert(options).values(
          q.options.map((option: string) => ({
            questionId: question.id,
            text: option,
          }))
        );
      }
    }

    return NextResponse.json({ 
      success: true, 
      surveyId: survey.id,
      message: "Survey created successfully" 
    });

  } catch (error) {
    console.error("Error creating survey:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create survey" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const surveyId = searchParams.get('id');

    if (!surveyId) {
      return NextResponse.json(
        { error: "Survey ID is required" },
        { status: 400 }
      );
    }

    // Get survey with questions and options
    const survey = await db.query.surveys.findFirst({
      where: (surveys, { eq }) => eq(surveys.id, parseInt(surveyId)),
      with: {
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

    return NextResponse.json({ survey });

  } catch (error) {
    console.error("Error fetching survey:", error);
    return NextResponse.json(
      { error: "Failed to fetch survey" },
      { status: 500 }
    );
  }
}
