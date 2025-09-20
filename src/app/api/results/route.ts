import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { generateInsights } from "@/lib/glm";

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const surveyId = searchParams.get('surveyId');

    if (!surveyId) {
      return NextResponse.json(
        { error: "Survey ID is required" },
        { status: 400 }
      );
    }

    // Get complete survey data with results
    const survey = await db.query.surveys.findFirst({
      where: (surveys, { eq }) => eq(surveys.id, parseInt(surveyId)),
      with: {
        segments: true,
        questions: {
          with: {
            options: true,
            results: true
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

    // Aggregate results for visualization
    const aggregatedResults = survey.questions.map(question => {
      const questionResults = question.results || [];
      
      const optionTotals = question.options.map(option => {
        const optionResults = questionResults.filter(r => r.optionId === option.id);
        const total = optionResults.reduce((sum, r) => sum + (r.value || 0), 0);
        
        const segmentBreakdown = survey.segments.map(segment => {
          const segmentResult = optionResults.find(r => r.segmentId === segment.id);
          return {
            segmentId: segment.id,
            segmentName: segment.name,
            value: segmentResult?.value || 0
          };
        });

        return {
          optionId: option.id,
          optionText: option.text,
          total,
          segmentBreakdown
        };
      });

      return {
        questionId: question.id,
        questionText: question.text,
        options: optionTotals
      };
    });

    // Generate insights
    const insights = await generateInsights({
      survey,
      results: aggregatedResults
    });

    return NextResponse.json({
      success: true,
      survey: {
        id: survey.id,
        niche: survey.niche,
        title: survey.title,
        createdAt: survey.createdAt
      },
      segments: survey.segments,
      results: aggregatedResults,
      insights
    });

  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}
