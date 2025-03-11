
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const activities = [
  {
    user: "Martine Dubois",
    action: "a demandé un congé",
    date: "Il y a 2 heures",
    status: "En attente",
    statusType: "warning",
  },
  {
    user: "Thomas Laurent",
    action: "a été ajouté à l'équipe",
    date: "Il y a 1 jour",
    status: "Nouveau",
    statusType: "success",
  },
  {
    user: "Sophie Martin",
    action: "a complété sa formation",
    date: "Il y a 2 jours",
    status: "Terminé",
    statusType: "success",
  },
  {
    user: "Lucas Bernard",
    action: "est absent aujourd'hui",
    date: "Aujourd'hui",
    status: "Absent",
    statusType: "danger",
  },
  {
    user: "Julie Petit",
    action: "a modifié son profil",
    date: "Il y a 3 jours",
    status: "Mis à jour",
    statusType: "info",
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Activités récentes</CardTitle>
          <CardDescription>
            Les 5 dernières activités dans le système
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="gap-1">
          Voir tout <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.action}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge
                    variant={
                      activity.statusType === "success"
                        ? "default"
                        : activity.statusType === "danger"
                        ? "destructive"
                        : "outline"
                    }
                    className="ml-2"
                  >
                    {activity.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {activity.date}
                  </span>
                </div>
              </div>
              {index < activities.length - 1 && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
