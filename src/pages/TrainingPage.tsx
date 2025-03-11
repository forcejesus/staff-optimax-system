
import { BookOpen, GraduationCap, Video, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";

const TrainingPage = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Formations</h1>
        <p className="text-muted-foreground">
          Gérez les formations, compétences et plans de développement
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Formations disponibles"
          value="24"
          description="Ce trimestre"
          icon={<BookOpen className="h-6 w-6" />}
          color="blue"
        />
        <StatCard 
          title="Inscriptions en cours"
          value="15"
          description="Employés inscrits"
          icon={<GraduationCap className="h-6 w-6" />}
          color="green"
        />
        <StatCard 
          title="Heures de formation"
          value="187"
          description="Réalisées ce mois"
          icon={<Video className="h-6 w-6" />}
          color="yellow"
        />
        <StatCard 
          title="Budget formation"
          value="85%"
          description="Utilisé cette année"
          icon={<Calendar className="h-6 w-6" />}
          color="red"
        />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Formations à venir</h2>
        <Button>Proposer une formation</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({length: 6}).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="h-32 bg-muted flex items-center justify-center">
              <BookOpen className="h-16 w-16 text-muted-foreground/50" />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">
                  {["Management d'équipe", "Développement web", "Communication efficace", 
                    "Excel avancé", "Gestion de projet", "Intelligence émotionnelle"][index % 6]}
                </CardTitle>
                <Badge variant={index % 2 === 0 ? "default" : "secondary"}>
                  {index % 2 === 0 ? "Présentiel" : "En ligne"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span>12/12/2023 - 14/12/2023</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>{Math.floor(Math.random() * 10) + 5} places disponibles</span>
                </div>
              </div>
              <p className="text-sm mb-4 line-clamp-2">
                Description de la formation, objectifs et compétences acquises à l'issue de celle-ci.
              </p>
              <Button variant="outline" className="w-full">S'inscrire</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrainingPage;
