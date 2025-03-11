
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Layout() {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar />}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {isMobile && !showSidebar && (
            <Button
              variant="outline"
              size="icon"
              className="mb-4"
              onClick={() => setShowSidebar(true)}
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Ouvrir le menu</span>
            </Button>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
