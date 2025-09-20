"use client";

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

export function ChartBar({ data, dataKey, labelKey }: { data: any[]; dataKey: string; labelKey: string }) {
  return (
    <motion.div 
      className="h-72 w-full" 
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))" 
            opacity={0.3}
          />
          <XAxis 
            dataKey={labelKey} 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Процент']}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
          />
          <Bar 
            dataKey={dataKey} 
            fill="#6366f1" 
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
            animationBegin={400}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
