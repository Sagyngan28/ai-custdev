"use client";

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

/*
Expected input shape:
segments: [{ id, name }]
questions: [{ questionId, questionText, options: [{ optionId, optionText, total, segmentBreakdown:[{segmentId, value}]}]}]
We compute for each segment an average preference score per question using normalized totals.
*/

type AggregatedQuestion = {
  questionId: number;
  questionText: string;
  options: Array<{
    optionId: number;
    optionText: string | null;
    total: number;
    segmentBreakdown: Array<{ segmentId: number; segmentName: string | null; value: number }>;
  }>;
};

export function RadarCompare({
  segments,
  questions,
  selectedSegmentIds,
}: {
  segments: Array<{ id: number; name: string | null }>;
  questions: AggregatedQuestion[];
  selectedSegmentIds?: number[];
}) {
  const activeSegments = (selectedSegmentIds && selectedSegmentIds.length > 0)
    ? segments.filter(s => selectedSegmentIds.includes(s.id))
    : segments;

  // Build per-question totals for normalization and per-segment values
  const data = questions.map((q) => {
    const sumTotals = q.options.reduce((acc, o) => acc + o.total, 0) || 1;
    const entry: any = { question: q.questionText };
    for (const seg of activeSegments) {
      const sumBySeg = q.options.reduce((acc, o) => {
        const segVal = o.segmentBreakdown.find((x) => x.segmentId === seg.id)?.value || 0;
        return acc + segVal;
      }, 0);
      // Normalize 0..100
      entry[seg.name || `Segment ${seg.id}`] = Math.round((sumBySeg / sumTotals) * 100);
    }
    return entry;
  });

  // Keys to plot
  const keys = activeSegments.map((s) => s.name || `Segment ${s.id}`);

  const colors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#8b5cf6"];

  return (
    <motion.div 
      className="h-96 w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius={120} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis 
            dataKey="question" 
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          />
          {keys.map((k, idx) => (
            <Radar 
              key={k} 
              name={k} 
              dataKey={k} 
              stroke={colors[idx % colors.length]} 
              fill={colors[idx % colors.length]} 
              fillOpacity={0.1}
              strokeWidth={2}
              animationDuration={1000}
              animationBegin={idx * 200}
            />
          ))}
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Предпочтение']}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
      
      {selectedSegmentIds && selectedSegmentIds.length > 0 && (
        <motion.div 
          className="mt-4 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Сравнение {selectedSegmentIds.length} сегмент(ов) по всем вопросам
        </motion.div>
      )}
    </motion.div>
  );
}
