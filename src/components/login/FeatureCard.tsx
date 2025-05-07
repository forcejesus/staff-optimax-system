
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
  className?: string;
}

export const FeatureCard = ({ icon, title, desc, className = "" }: FeatureCardProps) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}
    >
      <div className="flex flex-col items-center gap-2 mb-1">
        <div className="p-1 rounded-md bg-gray-50 dark:bg-gray-700">
          {icon}
        </div>
        <h4 className="text-sm font-medium">{title}</h4>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
    </div>
  );
};
