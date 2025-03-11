
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
    <div className="stat-card bg-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className={cn(`text-hr-${color}`, "rounded-full p-2 bg-opacity-10")}>
          {icon}
        </div>
      </div>
    </div>
  );
}
