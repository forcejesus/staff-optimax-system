
import { UnderDevelopmentBanner } from "@/components/ui/under-development-banner";
import { RetirementPlanning } from "@/components/retirement/RetirementPlanning";
import { RetirementProcess } from "@/components/retirement/RetirementProcess";

const RetirementPage = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Retraite et fins de contrat</h1>
        <p className="text-muted-foreground">
          Gérez les départs à la retraite et les fins de contrat
        </p>
      </div>
      
      <UnderDevelopmentBanner />
      
      <div className="grid gap-8">
        <RetirementPlanning />
        <RetirementProcess />
      </div>
    </div>
  );
};

export default RetirementPage;
