import { UnderDevelopmentBanner } from "@/components/ui/under-development-banner";

const RecruitmentPage = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Recrutement</h1>
        <p className="text-muted-foreground">
          Gérez vos offres d'emploi et le processus de recrutement
        </p>
      </div>
      
      <UnderDevelopmentBanner />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Contenu à venir */}
      </div>
    </div>
  );
};

export default RecruitmentPage;
