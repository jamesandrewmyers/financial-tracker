import React from 'react';
import { clsx } from 'clsx';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
}

export function Heading({ 
  children, 
  className, 
  as: Component = 'h1',
  size = 'responsive'
}: HeadingProps) {
  // Define size variants with responsive scaling
  const sizeClasses = {
    xs: 'font-bold text-2xl',
    sm: 'font-bold text-3xl',
    md: 'font-bold text-4xl',
    lg: 'font-bold text-5xl',
    xl: 'font-bold text-6xl',
    // Responsive scaling from 2xl to 5xl based on viewport
    responsive: 'font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
  };

  const headingClasses = clsx(
    'font-sans tracking-tight',
    'text-base-content',
    sizeClasses[size],
    className
  );

  return (
    <Component className={headingClasses}>
      {children}
    </Component>
  );
}

export default Heading;
