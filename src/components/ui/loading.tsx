import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'skeleton' | 'pulse';
}

export function Loading({ className, size = 'md', variant = 'spinner' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  if (variant === 'spinner') {
    return (
      <div className={cn("animate-spin rounded-full border-2 border-gray-300 border-t-blue-600", sizeClasses[size], className)}>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div className={cn("animate-pulse bg-gray-300 dark:bg-gray-700 rounded", sizeClasses[size], className)} />
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn("animate-pulse", className)}>
        <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-full mb-2"></div>
        <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-3/4"></div>
      </div>
    );
  }

  return null;
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="bg-gray-300 dark:bg-gray-700 rounded-lg p-6">
        <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-400 dark:bg-gray-600 rounded"></div>
          <div className="h-3 bg-gray-400 dark:bg-gray-600 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}