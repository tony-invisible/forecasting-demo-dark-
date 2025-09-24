'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function KPICard({ 
  title, 
  value, 
  change, 
  subtitle, 
  icon, 
  className = '' 
}: KPICardProps) {
  const getTrendIcon = () => {
    if (change === undefined) return null;
    if (change > 0) return <TrendingUp className="w-4 h-4 text-secondary" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-alert" />;
    return <Minus className="w-4 h-4 text-text-secondary" />;
  };

  const getChangeColor = () => {
    if (change === undefined) return 'text-text-secondary';
    if (change > 0) return 'text-secondary';
    if (change < 0) return 'text-alert';
    return 'text-text-secondary';
  };

  return (
    <div className={`bg-white rounded-lg border border-border p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-semibold text-text">{value}</p>
          {subtitle && (
            <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="text-primary">
            {icon}
          </div>
        )}
      </div>
      
      {change !== undefined && (
        <div className="flex items-center space-x-1 mt-3">
          {getTrendIcon()}
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {change > 0 ? '+' : ''}{change.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
}


