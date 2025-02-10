import { InputHTMLAttributes } from 'react';
import { THEME } from '@/constants/theme';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, ...props }: InputProps) {
  return (
    <div className="group relative">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-300 transition-colors duration-200 group-hover:text-gray-200"
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="mt-1 block w-full px-4 py-3 bg-[#222222] border border-[#333333] rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out hover:border-indigo-500/50 hover:bg-[#2a2a2a] cursor-pointer focus:cursor-text"
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
} 