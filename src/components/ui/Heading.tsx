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
    xs: 'text-2xl font-bold',
    sm: 'text-3xl font-bold',
    md: 'text-4xl font-bold',
    lg: 'text-5xl font-bold',
    xl: 'text-6xl font-bold',
    // Responsive scaling from 2xl to 5xl based on viewport
    responsive: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'
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
