
export const BrandLogo = () => {
  return (
    <div className="space-y-4">
      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg mb-6">
        <span className="font-bold text-3xl text-white">GRH</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">GRH++</span>
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
        La plateforme de gestion RH moderne pour les entreprises qui valorisent leurs talents.
      </p>
    </div>
  );
};
