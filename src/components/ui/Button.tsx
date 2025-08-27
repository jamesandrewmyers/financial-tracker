import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className,
  ...props
}: ButtonProps) {
  // Base button uses daisyUI
  const baseClasses = ['btn', 'transition-all'];

  // Variant styles
  const variantClasses = {
    primary: ['btn-primary'],
    secondary: ['btn-secondary'],
    ghost: ['btn-ghost'],
    outline: ['btn-outline']
  };

  // Size styles
  const sizeClasses = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
    xl: 'btn-xl'
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <span className="loading loading-spinner loading-sm" />
  );

  // Combine all classes
  const buttonClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
}

export default Button;
