import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Clock, 
  FileText, 
  Award, 
  BookOpen, 
  UserPlus,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
};

const NavItem = ({ to, icon: Icon, label, isCollapsed }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isCollapsed ? "justify-center" : "",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
};

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-sidebar transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        {!isCollapsed ? (
          <h1 className="text-lg font-bold text-sidebar-foreground">Staff Optimax</h1>
        ) : (
          <span className="text-xl font-bold text-sidebar-foreground">SO</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto text-sidebar-foreground"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <Menu className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          <NavItem to="/" icon={LayoutDashboard} label="Tableau de bord" isCollapsed={isCollapsed} />
          <NavItem to="/employees" icon={Users} label="Employés" isCollapsed={isCollapsed} />
          <NavItem to="/leave" icon={Calendar} label="Congés" isCollapsed={isCollapsed} />
          <NavItem to="/attendance" icon={Clock} label="Présences" isCollapsed={isCollapsed} />
          <NavItem to="/payroll" icon={FileText} label="Paie" isCollapsed={isCollapsed} />
          <NavItem to="/performance" icon={Award} label="Performances" isCollapsed={isCollapsed} />
          <NavItem to="/training" icon={BookOpen} label="Formations" isCollapsed={isCollapsed} />
          <NavItem to="/recruitment" icon={UserPlus} label="Recrutement" isCollapsed={isCollapsed} />
        </nav>
      </div>

      <div className="border-t p-4">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {!isCollapsed && <span>Déconnexion</span>}
        </Button>
      </div>
    </div>
  );
}
