
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  color?: "blue" | "green" | "red" | "yellow" | "gray";
}

export function StatCard({
  title,
  value,
  icon,
  description,
  color = "blue",
}: StatCardProps) {
  return (
    <div className={cn(
      "stat-card relative overflow-hidden",
      "bg-gradient-to-br from-white to-gray-50",
      "border border-gray-100",
      "transition-all duration-300 hover:scale-105",
      "hover:shadow-lg"
    )}>
      <div className="relative z-10 flex items-center justify-between p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={cn(
          `text-hr-${color}`,
          "rounded-full p-3",
          "bg-gradient-to-br from-white to-gray-50",
          "shadow-inner"
        )}>
          {icon}
        </div>
      </div>
      <div className={cn(
        "absolute inset-0 opacity-5",
        `bg-hr-${color}`
      )} />
    </div>
  );
}
