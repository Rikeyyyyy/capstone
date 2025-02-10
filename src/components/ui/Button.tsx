import { ButtonHTMLAttributes } from 'react';
import { THEME } from '@/constants/theme';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

export function Button({ isLoading, loadingText, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
    >
      {isLoading ? (
        <span className="flex items-center">
          <LoadingSpinner />
          {loadingText}
        </span>
      ) : children}
    </button>
  );
} 