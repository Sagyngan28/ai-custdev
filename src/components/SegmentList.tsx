"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Baby, Rocket, Users } from "lucide-react";

export interface SegmentItem {
  id: number;
  name: string | null;
  percentage: number | null;
  persona: string | null;
}

export function SegmentList({
  segments,
  selected,
  onToggle,
}: {
  segments: SegmentItem[];
  selected?: number[];
  onToggle?: (id: number) => void;
}) {
  const iconFor = (name?: string | null) => {
    if (!name) return Users;
    if (name.includes("Студенты")) return GraduationCap;
    if (name.includes("Родители")) return Baby;
    if (name.includes("Стартап") || name.includes("Предприним")) return Rocket;
    if (name.includes("специалист")) return Briefcase;
    return Users;
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {segments.map((s, idx) => (
        <motion.button
          key={s.id}
          type="button"
          onClick={() => onToggle && onToggle(s.id)}
          className={`rounded-lg border bg-card p-4 text-left transition ${
            selected && selected.includes(s.id) ? "ring-2 ring-primary" : ""
          }`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {(() => {
                const Icon = iconFor(s.name);
                return <Icon className="h-5 w-5 text-muted-foreground" />;
              })()}
              <h3 className="font-medium">{s.name}</h3>
            </div>
            <span className="text-sm text-muted-foreground">{s.percentage}%</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{s.persona}</p>
        </motion.button>
      ))}
    </div>
  );
}
