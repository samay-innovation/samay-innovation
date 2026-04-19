import * as LucideIcons from 'lucide-react';
import FlaticonIcon from './FlaticonIcon';

interface ServiceIconProps {
  lucideIcon?: string;
  flaticonIcon?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export default function ServiceIcon({ 
  lucideIcon, 
  flaticonIcon, 
  size = 'md',
  className = '' 
}: ServiceIconProps) {
  const lucideSizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    '2xl': 64,
  };

  if (flaticonIcon) {
    return <FlaticonIcon icon={flaticonIcon} size={size} className={className} />;
  }

  if (lucideIcon) {
    const IconComponent = (LucideIcons as any)[lucideIcon];
    
    if (!IconComponent) {
      console.warn(`Lucide icon "${lucideIcon}" not found`);
      return null;
    }

    return (
      <IconComponent 
        size={lucideSizeMap[size]} 
        className={className}
        aria-hidden="true"
      />
    );
  }

  return null;
}
