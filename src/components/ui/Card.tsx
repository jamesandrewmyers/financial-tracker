// Import React types for proper TypeScript support
import React, { JSX } from 'react';
// Import clsx utility for conditional class names
import { clsx } from 'clsx';

// Define the props interface for the Card component
interface CardProps {
  // Children elements to be rendered inside the card
  children: React.ReactNode;
  // Optional additional CSS classes to apply
  className?: string;
  // Optional HTML element type (defaults to 'div')
  as?: keyof JSX.IntrinsicElements;
  // Optional padding variants
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  // Optional shadow variants
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  // Optional border variants
  border?: boolean;
  // Optional hover effects
  hover?: boolean;
  // Optional click handler for interactive cards
  onClick?: () => void;
}

// Card component with modern styling and dark mode support
export function Card({ 
  children, 
  className,
  as: Component = 'div',
  padding = 'md',
  shadow = 'sm',
  border = true,
  hover = false,
  onClick
}: CardProps) {
  // Define padding variants
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',           // 16px
    md: 'p-6',           // 24px - modern standard
    lg: 'p-8',           // 32px
    xl: 'p-12'           // 48px
  };

  // Define shadow variants
  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',     // Subtle shadow
    md: 'shadow-md',     // Medium shadow
    lg: 'shadow-lg',     // Large shadow
    xl: 'shadow-xl'      // Extra large shadow
  };

  // Combine all classes with proper defaults and user overrides
  const cardClasses = clsx(
    // daisyUI card base
    'card bg-base-100 transition-all',
    // Apply padding variant
    paddingClasses[padding],
    // Apply shadow variant
    shadowClasses[shadow],
    // Apply border if enabled
    border && 'border border-base-300',
    // Apply hover effects if enabled
    hover && [
      'hover:shadow-md',
      'hover:border-base-300',
      'hover:scale-[1.02] transform',
      onClick && 'cursor-pointer'
    ],
    // User-provided additional classes
    className
  );

  return (
    <Component className={cardClasses} onClick={onClick}>
      {children}
    </Component>
  );
}

// Define the props interface for the CardGrid component
interface CardGridProps {
  // Children Card components to be rendered in the grid
  children: React.ReactNode;
  // Optional additional CSS classes to apply
  className?: string;
  // Optional gap size between cards
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  // Optional minimum card width (useful for responsive behavior)
  minCardWidth?: 'xs' | 'sm' | 'md' | 'lg';
}

// CardGrid component for responsive card layouts
export function CardGrid({ 
  children, 
  className,
  gap = 'md',
  minCardWidth = 'md'
}: CardGridProps) {
  // Define gap variants
  const gapClasses = {
    sm: 'gap-4',         // 16px
    md: 'gap-6',         // 24px - modern standard
    lg: 'gap-8',         // 32px
    xl: 'gap-12'         // 48px
  };

  // Define minimum card width for auto-fit grid
  const minWidthClasses = {
    xs: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    sm: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    md: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    lg: 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
  };

  // Combine all classes for responsive grid layout
  const gridClasses = clsx(
    // Base grid styling
    'grid w-full',
    // Apply responsive column layout
    minWidthClasses[minCardWidth],
    // Apply gap variant
    gapClasses[gap],
    // User-provided additional classes
    className
  );

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
}

// Compound component for Card with common sub-components
Card.Grid = CardGrid;

// Define additional card sub-components for common patterns
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={clsx('mb-0 pb-4 border-b border-base-300 card-body', className)}>{children}</div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function CardTitle({ children, className, size = 'md' }: CardTitleProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <h3 className={clsx('card-title', sizeClasses[size], className)}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={clsx('card-body', className)}>{children}</div>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={clsx('justify-end p-4 border-base-300 border-t card-actions', className)}>{children}</div>
  );
}

// Attach sub-components to main Card component
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

// Export default for easier importing
export default Card;
