
import { Clock, UserPlus, Calendar, Award, Users } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingLeave } from "@/components/dashboard/UpcomingLeave";
import { UnderDevelopmentBanner } from "@/components/ui/under-development-banner";

const Index = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-primary">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue sur votre tableau de bord de gestion des ressources humaines
        </p>
      </div>
      
      <UnderDevelopmentBanner />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-fade-in">
        <StatCard
          title="Employés actifs"
          value="42"
          icon={<Users className="h-4 w-4" />}
          description="2 nouveaux ce mois-ci"
          color="blue"
        />
        <StatCard
          title="Taux de présence"
          value="92%"
          icon={<Clock className="h-4 w-4" />}
          description="↑ 3% par rapport au mois dernier"
          color="green"
        />
        <StatCard
          title="Demandes de congés"
          value="8"
          icon={<Calendar className="h-4 w-4" />}
          description="5 en attente d'approbation"
          color="yellow"
        />
        <StatCard
          title="Évaluations à venir"
          value="12"
          icon={<Award className="h-4 w-4" />}
          description="Prévues ce trimestre"
          color="red"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 animate-fade-in" style={{ animationDelay: "150ms" }}>
        <RecentActivity />
        <UpcomingLeave />
      </div>
    </div>
  );
}

export default Index;
