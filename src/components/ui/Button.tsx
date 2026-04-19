import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  magnetic?: boolean;
}

/**
 * Button Component
 * 
 * Elegant button with outlined style matching the reference design
 * 
 * @example
 * <Button variant="outline">ALL TEAM</Button>
 * <Button variant="primary" href="/portfolio">VIEW PORTFOLIO</Button>
 */
export default function Button({
  children,
  variant = 'outline',
  size = 'md',
  href,
  className = '',
  magnetic = false,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-light tracking-widest uppercase transition-all duration-300 rounded-full';
  
  const variants = {
    primary: 'bg-text-primary dark:bg-dark-text-primary text-white dark:text-dark-bg-primary hover:bg-text-secondary dark:hover:bg-dark-text-secondary',
    outline: 'border-2 border-text-primary dark:border-dark-text-primary text-text-primary dark:text-dark-text-primary hover:bg-text-primary hover:text-white dark:hover:bg-dark-text-primary dark:hover:text-dark-bg-primary',
    ghost: 'text-text-primary dark:text-dark-text-primary hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary',
  };

  const sizes = {
    sm: 'px-6 py-2 text-xs',
    md: 'px-8 py-3 text-xs',
    lg: 'px-10 py-4 text-sm',
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  let el: ReactNode;

  if (href) {
    if (href.startsWith('http')) {
      el = (
        <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses}>
          {children}
        </a>
      );
    } else {
      el = <Link to={href} className={buttonClasses}>{children}</Link>;
    }
  } else {
    el = <button className={buttonClasses} {...props}>{children}</button>;
  }

  return magnetic ? <MagneticButton>{el}</MagneticButton> : <>{el}</>;
}
