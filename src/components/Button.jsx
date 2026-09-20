import { useState } from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(loading);

  const handleClick = (e) => {
    if (disabled || isLoading) return;
    if (onClick) onClick(e);
  };

  // Variant styles
  const variantClasses = {
    primary: 'bg-[#166F7C] text-white hover:bg-[#0d5a63]',
    secondary: 'border border-[#DBE4E2] text-[#10242A] hover:bg-[#F2F5F4]',
    outline: 'border border-[#166F7C] text-[#166F7C] hover:bg-[#E0F0F1]',
    danger: 'border border-[#AC4320] text-[#AC4320] hover:bg-[#FEF3F0]',
    success: 'border border-[#33754A] text-[#33754A] hover:bg-[#E8F5E9]'
  };

  // Size styles
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={
        `inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus-ring-offset-2 disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
      }
    >
      {isLoading ? (
        <>
          <span className="mr-2">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;