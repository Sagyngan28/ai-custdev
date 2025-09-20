"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  glmMode?: boolean;
}

export function LoadingSpinner({ message = "Загрузка...", glmMode = false }: LoadingSpinnerProps) {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const sparkleVariants = {
    animate: {
      y: [-10, -20, -10],
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-8 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {glmMode ? (
          <motion.div
            className="relative"
            variants={pulseVariants}
            animate="animate"
          >
            <Brain className="h-12 w-12 text-blue-500" />
            <motion.div
              className="absolute -top-2 -right-2"
              variants={sparkleVariants}
              animate="animate"
            >
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
            variants={spinnerVariants}
            animate="animate"
          />
        )}
      </div>
      
      <motion.p 
        className="text-sm text-muted-foreground text-center max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {glmMode ? (
          <>
            <span className="font-medium text-blue-600">GLM-4.5-Flash</span> анализирует данные...
          </>
        ) : (
          message
        )}
      </motion.p>

      {glmMode && (
        <motion.div
          className="flex space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                y: [-4, 4, -4],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
