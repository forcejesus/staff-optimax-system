
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
    blue: "from-blue-50/30 to-blue-100/20 dark:from-blue-900/5 dark:to-blue-900/5",
    green: "from-green-50/30 to-green-100/20 dark:from-green-900/5 dark:to-green-900/5",
    red: "from-red-50/30 to-red-100/20 dark:from-red-900/5 dark:to-red-900/5",
    yellow: "from-yellow-50/30 to-yellow-100/20 dark:from-yellow-900/5 dark:to-yellow-900/5",
    gray: "from-gray-50/30 to-gray-100/20 dark:from-gray-900/5 dark:to-gray-900/5",
  };

  const iconColorVariants = {
    blue: "text-blue-600/30 dark:text-blue-400/30",
    green: "text-green-600/30 dark:text-green-400/30",
    red: "text-red-600/30 dark:text-red-400/30",
    yellow: "text-yellow-600/30 dark:text-yellow-400/30",
    gray: "text-gray-600/30 dark:text-gray-400/30",
  };

  return (
    <div className={cn(
      "stat-card border-dashed border-2 border-muted/40",
      "bg-gradient-to-br backdrop-blur-sm",
      colorVariants[color],
    )}>
      <div className="flex items-center gap-4">
        <div className={cn(
          "rounded-lg p-3",
          "bg-white/20 dark:bg-white/5",
          iconColorVariants[color]
        )}>
          {icon}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground/50">
            {title}
          </p>
          <h3 className="text-2xl font-semibold tracking-tight text-foreground/50">
            {value}
          </h3>
          {description && (
            <p className="text-xs text-muted-foreground/40">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
    </div>
  );
}
