import React from 'react';

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ 
  onClick, 
  isLoading = false, 
  className = '' 
}) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`w-full py-3 my-4 rounded border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors disabled:opacity-50 ${className}`}
  >
    {isLoading ? 'Loading...' : 'Load More'}
  </button>
);
