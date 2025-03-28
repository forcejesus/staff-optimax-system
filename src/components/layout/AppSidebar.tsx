
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
  LogOut,
  Settings,
  Building,
  BarChart3,
  ChevronRight
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

// Define a type for the menu items
interface MenuItem {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export function AppSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Définition des menus
  const mainMenuItems: MenuItem[] = [
    { to: "/", icon: LayoutDashboard, label: "Tableau de bord" },
    { to: "/employes", icon: Users, label: "Employés" },
    { to: "/conges", icon: Calendar, label: "Congés" },
    { to: "/presences", icon: Clock, label: "Présences" },
    { to: "/paie", icon: FileText, label: "Paie" },
  ];

  const secondaryMenuItems: MenuItem[] = [
    { to: "/performances", icon: BarChart3, label: "Performances" },
    { to: "/formations", icon: BookOpen, label: "Formations" },
    { to: "/recrutement", icon: UserPlus, label: "Recrutement" },
    { to: "/retraite", icon: Building, label: "Retraite" },
  ];

  // Récupération des initiales de l'utilisateur
  const initials = user && user.employe 
    ? `${user.employe.employe_nom.charAt(0)}${user.employe.employe_prenom.charAt(0)}`
    : "UA";

  // Récupération du nom complet de l'utilisateur
  const fullName = user && user.employe 
    ? `${user.employe.employe_prenom} ${user.employe.employe_nom}`
    : "Utilisateur Administrateur";

  // Récupération de l'email de l'utilisateur
  const email = user?.employe?.employe_email || "admin@example.com";

  return (
    <Sidebar variant="sidebar" className="border-r">
      <SidebarHeader className="py-4">
        <div className="px-4 flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground">
            <span className="font-bold">GRH</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base">Gestion RH++</span>
            <span className="text-xs text-muted-foreground">v1.0</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.to}
                    tooltip={item.label}
                    className="group"
                  >
                    <NavLink to={item.to} className="relative">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Autres fonctionnalités</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryMenuItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.to}
                    tooltip={item.label}
                    className="group"
                  >
                    <NavLink to={item.to} className="relative">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{fullName}</span>
              <span className="text-xs text-muted-foreground">{email}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
