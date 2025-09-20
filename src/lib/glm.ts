// GLM-4.5-Flash API integration

export interface GLMResponse {
  segments: Array<{
    name: string;
    percentage: number;
    persona: string;
  }>;
}

export interface GLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GLMChatRequest {
  model: string;
  messages: GLMMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface GLMChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

async function callGLMAPI(messages: GLMMessage[]): Promise<string> {
  const apiKey = process.env.GLM_API_KEY;
  const apiUrl = process.env.GLM_API_URL || 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

  if (!apiKey) {
    console.warn('GLM_API_KEY not found, using mock data');
    throw new Error('GLM_API_KEY not configured');
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4-flash',
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      } as GLMChatRequest),
    });

    if (!response.ok) {
      throw new Error(`GLM API error: ${response.status} ${response.statusText}`);
    }

    const data: GLMChatResponse = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('GLM API call failed:', error);
    throw error;
  }
}

export async function generateSegments(niche: string, questions: string[]): Promise<GLMResponse> {
  const systemPrompt = `Ты эксперт по customer development и сегментации аудитории. 
Твоя задача - проанализировать нишу и вопросы опроса, чтобы создать реалистичные сегменты аудитории.

Верни ответ СТРОГО в формате JSON без дополнительного текста:
{
  "segments": [
    {
      "name": "Название сегмента с возрастом",
      "percentage": число_от_1_до_100,
      "persona": "Подробное описание поведения, потребностей и характеристик сегмента"
    }
  ]
}

Требования:
- Создай 3-5 сегментов
- Сумма percentage должна быть 100
- Названия сегментов должны включать возрастные группы
- Персоны должны быть детальными и реалистичными
- Учитывай специфику ниши при создании сегментов`;

  const userPrompt = `Ниша: ${niche}

Вопросы опроса:
${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

Создай сегменты аудитории для этой ниши.`;

  try {
    const response = await callGLMAPI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);

    // Parse JSON response
    const parsed = JSON.parse(response);
    return parsed;
  } catch (error) {
    console.error('GLM segments generation failed, using fallback:', error);
    
    // Fallback to mock data
    const mockSegments = [
      {
        name: "Студенты 18–22",
        percentage: 25,
        persona: "Низкий доход, высокая digital-активность, ищут бесплатные или дешевые решения"
      },
      {
        name: "Молодые специалисты 23–28", 
        percentage: 35,
        persona: "Начало карьеры, ищут value-for-money, готовы инвестировать в развитие"
      },
      {
        name: "Родители 29–40",
        percentage: 30,
        persona: "Ограничено временем, готовы платить за удобство и качество"
      },
      {
        name: "Предприниматели 25–45",
        percentage: 10,
        persona: "Риск-аппетит, ранние адоптеры, ищут инновационные решения"
      }
    ];

    return { segments: mockSegments };
  }
}

export async function generateResponses(
  segments: Array<{ id: number; name: string; percentage: number; persona: string }>,
  questions: Array<{ id: number; text: string; options: Array<{ id: number; text: string }> }>
): Promise<Array<{ questionId: number; optionId: number; segmentId: number; value: number }>> {
  const systemPrompt = `Ты эксперт по анализу потребительского поведения. 
Твоя задача - симулировать реалистичные ответы разных сегментов аудитории на вопросы опроса.

Верни ответ СТРОГО в формате JSON без дополнительного текста:
{
  "responses": [
    {
      "questionId": число,
      "optionId": число,
      "segmentId": число,
      "value": число_респондентов
    }
  ]
}

Правила:
- Учитывай персону каждого сегмента при распределении ответов
- Общее количество респондентов: 1000
- Распредели респондентов пропорционально процентам сегментов
- Ответы должны логически соответствовать характеристикам сегмента`;

  const userPrompt = `Сегменты:
${segments.map(s => `${s.id}. ${s.name} (${s.percentage}%): ${s.persona}`).join('\n')}

Вопросы и варианты ответов:
${questions.map(q => 
  `${q.id}. ${q.text}\n${q.options.map(o => `   ${o.id}. ${o.text}`).join('\n')}`
).join('\n\n')}

Создай реалистичное распределение ответов.`;

  try {
    const response = await callGLMAPI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);

    const parsed = JSON.parse(response);
    return parsed.responses;
  } catch (error) {
    console.error('GLM responses generation failed, using fallback:', error);
    
    // Fallback to existing simulator logic
    const { simulateResponses } = await import('./simulator');
    return simulateResponses(segments, questions);
  }
}

export async function generateInsights(surveyData: any): Promise<string[]> {
  const { survey, results } = surveyData;
  
  const systemPrompt = `Ты эксперт по customer development и анализу данных. 
Проанализируй результаты опроса и создай ценные инсайты для бизнеса.

Верни ответ СТРОГО в формате JSON без дополнительного текста:
{
  "insights": [
    "Инсайт 1",
    "Инсайт 2",
    "Инсайт 3",
    "Инсайт 4"
  ]
}

Требования:
- 4-6 инсайтов
- Каждый инсайт должен быть конкретным и действенным
- Включай цифры и проценты
- Фокусируйся на бизнес-возможностях и рисках
- Давай рекомендации по продукту/маркетингу`;

  const userPrompt = `Ниша: ${survey.niche}
Название опроса: ${survey.title}

Результаты по сегментам:
${results.map((r: any) => 
  `Вопрос: ${r.questionText}\n${r.options.map((o: any) => 
    `- ${o.optionText}: ${o.total} ответов\n${o.segmentBreakdown.map((s: any) => 
      `  ${s.segmentName}: ${s.value}`
    ).join('\n')}`
  ).join('\n')}`
).join('\n\n')}

Создай инсайты для бизнеса.`;

  try {
    const response = await callGLMAPI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);

    const parsed = JSON.parse(response);
    return parsed.insights;
  } catch (error) {
    console.error('GLM insights generation failed, using fallback:', error);
    
    // Fallback to mock insights
    const insights = [
      "Основная аудитория (35%) - молодые специалисты, которые ценят соотношение цена-качество",
      "Студенческий сегмент (25%) чувствителен к цене и предпочитает бесплатные пробные версии",
      "Родители готовы платить премиум за удобство использования и экономию времени",
      "Предпринимательский сегмент, хоть и небольшой (10%), может стать источником высокой прибыли"
    ];

    return insights;
  }
}
