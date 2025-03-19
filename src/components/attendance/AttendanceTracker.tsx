
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttendanceFilter } from "./AttendanceFilter";
import { AttendanceTable } from "./AttendanceTable";
import { attendanceData } from "./attendanceData";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem,
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

export function AttendanceTracker() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("2023-10-16");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = attendanceData.filter((record) => {
    const matchesSearch = record.employee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "present" && (record.status === "Présent" || record.status === "Retard")) ||
                      (activeTab === "absent" && (record.status === "Absent" || record.status === "Congé"));
    return matchesSearch && matchesStatus && matchesTab;
  });

  // Calculate pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max pages to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate start and end page numbers
      let start = Math.max(currentPage - 1, 2);
      let end = Math.min(start + maxPagesToShow - 3, totalPages - 1);
      
      // Adjust start if end is too close to totalPages
      if (end === totalPages - 1) {
        start = Math.max(end - maxPagesToShow + 3, 2);
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Add pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push(-2); // -2 represents the second ellipsis
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <Card className="shadow-md border border-purple-100 dark:border-purple-950/30">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border-b">
        <CardTitle className="flex items-center gap-2 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <polyline points="16 11 18 13 22 9"></polyline>
          </svg>
          Suivi des présences
        </CardTitle>
        <CardDescription className="text-purple-600/70 dark:text-purple-400/70">
          Suivez les heures de travail et les présences de vos employés
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-4 bg-slate-100 dark:bg-slate-800/50">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900/40 dark:data-[state=active]:text-purple-200">Tous</TabsTrigger>
            <TabsTrigger value="present" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900/40 dark:data-[state=active]:text-purple-200">Présents</TabsTrigger>
            <TabsTrigger value="absent" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900/40 dark:data-[state=active]:text-purple-200">Absents</TabsTrigger>
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
            <AttendanceTable data={paginatedData} />
            {renderPagination()}
          </TabsContent>

          <TabsContent value="present" className="mt-0">
            <AttendanceTable data={paginatedData} />
            {renderPagination()}
          </TabsContent>

          <TabsContent value="absent" className="mt-0">
            <AttendanceTable data={paginatedData} showActions={true} />
            {renderPagination()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );

  // Helper function to render pagination
  function renderPagination() {
    if (totalPages <= 1) return null;
    
    const pageNumbers = getPageNumbers();
    
    return (
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} 
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {pageNumbers.map((page, index) => {
            if (page === -1 || page === -2) {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <span className="flex h-9 w-9 items-center justify-center">...</span>
                </PaginationItem>
              );
            }
            
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} 
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
}
