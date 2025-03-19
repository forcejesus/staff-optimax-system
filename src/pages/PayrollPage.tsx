import { UnderDevelopmentBanner } from "@/components/ui/under-development-banner";

const PayrollPage = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestion de la paie</h1>
        <p className="text-muted-foreground">
          Gérez les salaires, primes et indemnités de vos employés
        </p>
      </div>
      
      <UnderDevelopmentBanner />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Contenu à venir */}
      </div>
    </div>
  );
};

export default PayrollPage;
