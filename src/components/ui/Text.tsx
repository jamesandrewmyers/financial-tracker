import React, { JSX } from 'react';
import { clsx } from 'clsx';

interface TextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'responsive';
  color?: 'default' | 'muted' | 'light' | 'dark';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export function Text({ 
  children, 
  className, 
  as: Component = 'p',
  size = 'responsive',
  color = 'default',
  weight = 'normal'
}: TextProps) {
  // Define size variants with responsive scaling
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    // Responsive scaling for optimal readability
    responsive: 'text-sm sm:text-base lg:text-lg'
  };

  // Define color variants
  const colorClasses = {
    default: 'text-base-content',
    muted: 'text-base-content/70',
    light: 'text-base-content/60',
    dark: 'text-base-content',
  };

  // Define weight variants
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const textClasses = clsx(
    // Base styles with Inter font and optimal line height
    'font-sans leading-relaxed',
    // Line height of 1.6 (leading-relaxed = 1.625, closest to 1.6)
    'leading-[1.6]',
    // Apply size variant
    sizeClasses[size],
    // Apply color variant
    colorClasses[color],
    // Apply weight variant
    weightClasses[weight],
    // User-provided additional classes
    className
  );

  return (
    <Component className={textClasses}>
      {children}
    </Component>
  );
}

export default Text;
