import DashboardClient from "@/components/DashboardClient";
import { db } from "@/db/client";
import { generateInsights } from "@/lib/glm";

async function fetchResults(id: string) {
  try {
    const surveyId = parseInt(id);
    
    // Get complete survey data with results
    const survey = await db.query.surveys.findFirst({
      where: (surveys, { eq }) => eq(surveys.id, surveyId),
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
      throw new Error("Survey not found");
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

    return {
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
    };
  } catch (error) {
    console.error("Error fetching results:", error);
    throw new Error("Failed to load results");
  }
}

export default async function DashboardPage({ params }: { params: { id: string } }) {
  const data = await fetchResults(params.id);
  return <DashboardClient data={data} />;
}
