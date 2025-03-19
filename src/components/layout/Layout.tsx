
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function Layout() {
  const isMobile = useIsMobile();
  const location = useLocation();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />
        
        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {isMobile && (
              <SidebarTrigger className="mb-4" />
            )}
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
