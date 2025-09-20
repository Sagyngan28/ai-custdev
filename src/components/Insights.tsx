"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export function Insights({ items }: { items: string[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((text, i) => (
        <motion.div 
          key={i} 
          className="rounded-lg border bg-card p-4 text-sm shadow-sm hover:shadow-md transition-shadow duration-200"
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-start gap-3">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            </motion.div>
            <p className="leading-relaxed">{text}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
