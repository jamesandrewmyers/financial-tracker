// Import React types for proper TypeScript support
import React, { JSX } from 'react';
// Import clsx utility for conditional class names
import { clsx } from 'clsx';

// Define the props interface for the Container component
interface ContainerProps {
  // Children elements to be rendered inside the container
  children: React.ReactNode;
  // Optional additional CSS classes to apply
  className?: string;
  // Optional HTML element type (defaults to 'div')
  as?: keyof JSX.IntrinsicElements;
  // Optional size variants for different container widths
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  // Optional padding variants
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

// Container component with modern spacing and responsive design
export function Container({ 
  children, 
  className,
  as: Component = 'div',
  size = 'lg',
  padding = 'md'
}: ContainerProps) {
  // Define size-based max-width classes
  const sizeClasses = {
    sm: 'max-w-3xl',     // 768px
    md: 'max-w-4xl',     // 896px  
    lg: 'max-w-6xl',     // 1152px (closest to 1200px in Tailwind)
    xl: 'max-w-7xl',     // 1280px
    full: 'max-w-full'   // No max width
  };

  // Define padding variants
  const paddingClasses = {
    none: 'px-0',
    sm: 'px-4',          // 16px
    md: 'px-6',          // 24px - modern standard
    lg: 'px-8',          // 32px
    xl: 'px-12'          // 48px
  };

  // Combine all classes with proper defaults and user overrides
  const containerClasses = clsx(
    // Base container styling
    'mx-auto w-full',
    // Apply size-based max-width
    sizeClasses[size],
    // Apply padding variant
    paddingClasses[padding],
    // User-provided additional classes
    className
  );

  return (
    <Component className={containerClasses}>
      {children}
    </Component>
  );
}

// Export default for easier importing
export default Container;