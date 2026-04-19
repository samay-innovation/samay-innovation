import type { HTMLAttributes } from 'react';

interface FlaticonIconProps extends HTMLAttributes<HTMLElement> {
  icon: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export default function FlaticonIcon({ 
  icon, 
  size = 'md', 
  className = '',
  ...props 
}: FlaticonIconProps) {
  const sizeClass = size ? `flaticon-${size}` : '';
  const iconClass = `flaticon-${icon}`;
  
  return (
    <i 
      className={`${iconClass} ${sizeClass} ${className}`.trim()} 
      {...props}
      aria-hidden="true"
    />
  );
}
