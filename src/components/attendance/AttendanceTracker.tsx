
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttendanceFilter } from "./AttendanceFilter";
import { AttendanceTable } from "./AttendanceTable";
import { attendanceData } from "./attendanceData";

export function AttendanceTracker() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("2023-10-16");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredData = attendanceData.filter((record) => {
    const matchesSearch = record.employee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "present" && (record.status === "Présent" || record.status === "Retard")) ||
                      (activeTab === "absent" && (record.status === "Absent" || record.status === "Congé"));
    return matchesSearch && matchesStatus && matchesTab;
  });

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-muted/30 border-b">
        <CardTitle>Suivi des présences</CardTitle>
        <CardDescription>
          Suivez les heures de travail et les présences de vos employés
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-4">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="present">Présents</TabsTrigger>
            <TabsTrigger value="absent">Absents</TabsTrigger>
          </TabsList>

          <AttendanceFilter 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          <TabsContent value="all" className="mt-0">
            <AttendanceTable data={filteredData} />
          </TabsContent>

          <TabsContent value="present" className="mt-0">
            <AttendanceTable data={filteredData} />
          </TabsContent>

          <TabsContent value="absent" className="mt-0">
            <AttendanceTable data={filteredData} showActions={true} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
