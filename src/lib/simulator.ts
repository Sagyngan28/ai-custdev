// Fallback simulation algorithms for generating responses

export interface SimulationResult {
  questionId: number;
  optionId: number;
  segmentId: number;
  value: number;
}

export function simulateResponses(
  segments: Array<{ id: number; name: string; percentage: number; persona: string }>,
  questions: Array<{ id: number; text: string; options: Array<{ id: number; text: string }> }>
): SimulationResult[] {
  const results: SimulationResult[] = [];
  const totalRespondents = 1000; // Base number for simulation

  segments.forEach(segment => {
    const segmentRespondents = Math.round((segment.percentage / 100) * totalRespondents);
    
    questions.forEach(question => {
      // Generate realistic distribution based on segment persona
      const distribution = generateDistribution(segment, question);
      
      question.options.forEach((option, optionIndex) => {
        const responseCount = Math.round(segmentRespondents * distribution[optionIndex]);
        
        results.push({
          questionId: question.id,
          optionId: option.id,
          segmentId: segment.id,
          value: responseCount
        });
      });
    });
  });

  return results;
}

function generateDistribution(
  segment: { name: string; persona: string },
  question: { text: string; options: Array<{ text: string }> }
): number[] {
  const optionCount = question.options.length;
  
  // Generate realistic distributions based on segment characteristics
  if (segment.name.includes("Студенты")) {
    // Students prefer cheaper/free options
    return generateSkewedDistribution(optionCount, "price-sensitive");
  } else if (segment.name.includes("Родители")) {
    // Parents prefer convenience and quality
    return generateSkewedDistribution(optionCount, "convenience-focused");
  } else if (segment.name.includes("Предприниматели")) {
    // Entrepreneurs are early adopters
    return generateSkewedDistribution(optionCount, "innovation-focused");
  } else {
    // Young professionals - balanced approach
    return generateSkewedDistribution(optionCount, "balanced");
  }
}

function generateSkewedDistribution(optionCount: number, type: string): number[] {
  const distribution = new Array(optionCount).fill(0);
  
  switch (type) {
    case "price-sensitive":
      // Prefer first options (usually cheaper)
      distribution[0] = 0.5;
      distribution[1] = 0.3;
      for (let i = 2; i < optionCount; i++) {
        distribution[i] = 0.2 / (optionCount - 2);
      }
      break;
      
    case "convenience-focused":
      // Prefer middle-to-high options (premium features)
      const midIndex = Math.floor(optionCount / 2);
      distribution[midIndex] = 0.4;
      distribution[optionCount - 1] = 0.3;
      for (let i = 0; i < optionCount; i++) {
        if (i !== midIndex && i !== optionCount - 1) {
          distribution[i] = 0.3 / (optionCount - 2);
        }
      }
      break;
      
    case "innovation-focused":
      // Prefer last options (newest/most innovative)
      distribution[optionCount - 1] = 0.6;
      for (let i = 0; i < optionCount - 1; i++) {
        distribution[i] = 0.4 / (optionCount - 1);
      }
      break;
      
    default: // balanced
      // Even distribution with slight randomness
      const base = 1 / optionCount;
      for (let i = 0; i < optionCount; i++) {
        distribution[i] = base + (Math.random() - 0.5) * 0.2;
      }
      // Normalize
      const sum = distribution.reduce((a, b) => a + b, 0);
      for (let i = 0; i < optionCount; i++) {
        distribution[i] /= sum;
      }
  }
  
  return distribution;
}
