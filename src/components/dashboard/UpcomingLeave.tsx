
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const leaves = [
  {
    employee: "Sophie Martin",
    department: "Marketing",
    startDate: "14/10/2023",
    endDate: "21/10/2023",
    type: "Congés payés",
  },
  {
    employee: "Jean Dupont",
    department: "Développement",
    startDate: "18/10/2023",
    endDate: "19/10/2023", 
    type: "RTT",
  },
  {
    employee: "Marie Lambert",
    department: "Ressources Humaines",
    startDate: "23/10/2023",
    endDate: "27/10/2023",
    type: "Congés payés",
  },
];

export function UpcomingLeave() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base">Congés à venir</CardTitle>
          <CardDescription>
            Les prochains congés prévus
          </CardDescription>
        </div>
        <div className="ml-auto rounded-md bg-primary/10 p-1">
          <Calendar className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaves.map((leave, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">{leave.employee}</h3>
                  <p className="text-xs text-muted-foreground">{leave.department}</p>
                </div>
                <Badge variant="outline">{leave.type}</Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>
                  {leave.startDate} - {leave.endDate}
                </span>
              </div>
              {index < leaves.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
