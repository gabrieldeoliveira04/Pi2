import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
}

export const ProgressBar = ({ 
  value, 
  max = 100, 
  className,
  showPercentage = true,
  size = "md"
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("progress-bar", sizeClasses[size])}>
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-sm text-muted-foreground mt-1 text-right">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};