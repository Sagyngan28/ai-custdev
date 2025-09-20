"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} retry={this.retry} />;
      }

      return <DefaultErrorFallback error={this.state.error!} retry={this.retry} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 space-y-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <AlertTriangle className="h-16 w-16 text-red-500" />
      </motion.div>
      
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Что-то пошло не так</h2>
        <p className="text-muted-foreground max-w-md">
          Произошла ошибка при загрузке компонента. Попробуйте обновить страницу или повторить действие.
        </p>
      </div>

      <details className="text-left">
        <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
          Техническая информация
        </summary>
        <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto max-w-md">
          {error.message}
        </pre>
      </details>

      <div className="flex gap-2">
        <Button onClick={retry} variant="default">
          <RefreshCw className="h-4 w-4 mr-2" />
          Попробовать снова
        </Button>
        <Button onClick={() => window.location.reload()} variant="outline">
          Обновить страницу
        </Button>
      </div>
    </motion.div>
  );
}

export default ErrorBoundary;
