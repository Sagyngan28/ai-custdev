"use client";

import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";

interface PieDataItem {
  name: string;
  value: number;
}

export function ChartPie({ data }: { data: PieDataItem[] }) {
  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#8b5cf6"];
  
  return (
    <motion.div 
      className="h-72 w-full" 
      initial={{ opacity: 0, scale: 0.8, y: 20 }} 
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            dataKey="value" 
            data={data} 
            cx="50%" 
            cy="50%" 
            outerRadius={80}
            innerRadius={30}
            paddingAngle={2}
            animationBegin={200}
            animationDuration={800}
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value} ответов`, 'Количество']}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
