'use client';

interface ConfidenceBadgeProps {
  confidence: number;
  reason?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ConfidenceBadge({ 
  confidence, 
  reason, 
  size = 'md' 
}: ConfidenceBadgeProps) {
  const getConfidenceLevel = (conf: number) => {
    if (conf >= 70) return { label: 'High', color: 'bg-secondary text-white' };
    if (conf >= 40) return { label: 'Medium', color: 'bg-warning text-white' };
    return { label: 'Low', color: 'bg-alert text-white' };
  };

  const level = getConfidenceLevel(confidence);
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <div className="flex items-center space-x-2">
      <span className={`inline-flex items-center rounded-full font-medium ${level.color} ${sizeClasses[size]}`}>
        {level.label} ({confidence.toFixed(0)}%)
      </span>
      {reason && (
        <span className="text-sm text-text-secondary" title={reason}>
          {reason}
        </span>
      )}
    </div>
  );
}


