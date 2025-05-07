
import { Shield, Clock, Check, Calendar } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

interface Feature {
  icon: JSX.Element;
  title: string;
  desc: string;
}

export const FeatureShowcase = () => {
  const features: Feature[] = [
    { 
      icon: <Shield className="h-5 w-5 text-blue-500" />, 
      title: "Sécurité renforcée", 
      desc: "Accès sécurisé à toutes vos données" 
    },
    { 
      icon: <Clock className="h-5 w-5 text-green-500" />, 
      title: "Gestion efficace", 
      desc: "Optimisez le temps de gestion RH" 
    },
    { 
      icon: <Check className="h-5 w-5 text-amber-500" />, 
      title: "Conformité", 
      desc: "Respect des normes légales" 
    },
    { 
      icon: <Calendar className="h-5 w-5 text-purple-500" />, 
      title: "Organisation", 
      desc: "Planifiez et gérez facilement" 
    },
  ];
  
  return (
    <>
      {/* Desktop view */}
      <div className="grid grid-cols-2 gap-5 mt-8 hidden lg:grid">
        {features.map((feature, i) => (
          <div 
            key={i} 
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 
                     hover:shadow-md hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                {feature.icon}
              </div>
              <h3 className="font-medium">{feature.title}</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>
      
      {/* Mobile view */}
      <div className="mt-8 text-center lg:hidden">
        <h3 className="font-medium text-gray-800 dark:text-white mb-4">Pourquoi choisir GRH++</h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
            />
          ))}
        </div>
      </div>
    </>
  );
};
