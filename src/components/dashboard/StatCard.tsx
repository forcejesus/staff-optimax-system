
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

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
  const colorVariants = {
    blue: "from-blue-50/50 to-blue-100/30 dark:from-blue-900/10 dark:to-blue-900/5",
    green: "from-green-50/50 to-green-100/30 dark:from-green-900/10 dark:to-green-900/5",
    red: "from-red-50/50 to-red-100/30 dark:from-red-900/10 dark:to-red-900/5",
    yellow: "from-yellow-50/50 to-yellow-100/30 dark:from-yellow-900/10 dark:to-yellow-900/5",
    gray: "from-gray-50/50 to-gray-100/30 dark:from-gray-900/10 dark:to-gray-900/5",
  };

  const iconColorVariants = {
    blue: "text-blue-600/50 dark:text-blue-400/50",
    green: "text-green-600/50 dark:text-green-400/50",
    red: "text-red-600/50 dark:text-red-400/50",
    yellow: "text-yellow-600/50 dark:text-yellow-400/50",
    gray: "text-gray-600/50 dark:text-gray-400/50",
  };

  return (
    <div className={cn(
      "stat-card border-dashed border-muted/70",
      "bg-gradient-to-br",
      colorVariants[color],
    )}>
      <div className="flex items-center gap-4">
        <div className={cn(
          "rounded-lg p-3",
          "bg-white/30 dark:bg-white/5",
          iconColorVariants[color]
        )}>
          {icon}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground/70">
            {title}
          </p>
          <h3 className="text-2xl font-semibold tracking-tight text-foreground/70">
            {value}
          </h3>
          {description && (
            <p className="text-xs text-muted-foreground/60">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
    </div>
  );
}
