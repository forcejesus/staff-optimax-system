import { UnderDevelopmentBanner } from "@/components/ui/under-development-banner";

const PerformancePage = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Évaluation des performances</h1>
        <p className="text-muted-foreground">
          Suivez et évaluez les performances de vos employés
        </p>
      </div>
      
      <UnderDevelopmentBanner />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Contenu à venir */}
      </div>
    </div>
  );
};

export default PerformancePage;
