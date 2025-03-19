
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ClearStatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  color?: "blue" | "green" | "red" | "yellow" | "gray" | "purple";
}

export function ClearStatCard({
  title,
  value,
  icon,
  description,
  color = "blue",
}: ClearStatCardProps) {
  const colorVariants = {
    blue: "from-blue-50 to-blue-100/70 dark:from-blue-900/20 dark:to-blue-900/10",
    green: "from-green-50 to-green-100/70 dark:from-green-900/20 dark:to-green-900/10",
    red: "from-red-50 to-red-100/70 dark:from-red-900/20 dark:to-red-900/10",
    yellow: "from-yellow-50 to-yellow-100/70 dark:from-yellow-900/20 dark:to-yellow-900/10",
    gray: "from-gray-50 to-gray-100/70 dark:from-gray-900/20 dark:to-gray-900/10",
    purple: "from-purple-50 to-purple-100/70 dark:from-purple-900/20 dark:to-purple-900/10",
  };

  const iconColorVariants = {
    blue: "text-primary dark:text-primary",
    green: "text-green-600 dark:text-green-400",
    red: "text-red-600 dark:text-red-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
    gray: "text-gray-600 dark:text-gray-400",
    purple: "text-purple-600 dark:text-purple-400",
  };

  return (
    <div className={cn(
      "stat-card border border-muted/40",
      "bg-gradient-to-br",
      colorVariants[color],
    )}>
      <div className="flex items-center gap-4">
        <div className={cn(
          "rounded-lg p-3",
          "bg-white/50 dark:bg-white/10",
          iconColorVariants[color]
        )}>
          {icon}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>
          <h3 className="text-2xl font-semibold tracking-tight text-foreground/80">
            {value}
          </h3>
          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}
