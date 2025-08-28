import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({ value, className, size = "md" }: ProgressBarProps) {
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const getColor = (score: number) => {
    if (score >= 80) return "bg-green-600";
    if (score >= 60) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={cn("w-16 bg-gray-200 rounded-full", sizeClasses[size], className)}>
        <div
          className={cn("rounded-full", sizeClasses[size], getColor(value))}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-sm text-foreground min-w-[3ch]">{value}%</span>
    </div>
  );
}
