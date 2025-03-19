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
  BarChart3
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const location = useLocation();

  // Définition des menus
  const mainMenuItems = [
    { to: "/", icon: LayoutDashboard, label: "Tableau de bord" },
    { to: "/employees", icon: Users, label: "Employés", badge: "42" },
    { to: "/leave", icon: Calendar, label: "Congés", badge: "8" },
    { to: "/attendance", icon: Clock, label: "Présences" },
    { to: "/payroll", icon: FileText, label: "Paie" },
  ];

  const secondaryMenuItems = [
    { to: "/performance", icon: BarChart3, label: "Performances" },
    { to: "/training", icon: BookOpen, label: "Formations", badge: "Nouveau" },
    { to: "/recruitment", icon: UserPlus, label: "Recrutement" },
    { to: "/retirement", icon: Building, label: "Retraite" },
  ];

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
                  >
                    <NavLink to={item.to}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge 
                          variant="outline" 
                          className="ml-auto text-xs bg-primary/10 hover:bg-primary/20"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Modules avancés</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryMenuItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.to}
                    tooltip={item.label}
                  >
                    <NavLink to={item.to}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge 
                          variant="outline" 
                          className="ml-auto text-xs bg-primary/10 hover:bg-primary/20"
                        >
                          {item.badge}
                        </Badge>
                      )}
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
              <AvatarFallback className="bg-primary/10 text-primary">MN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Malonga Nkouka</span>
              <span className="text-xs text-muted-foreground">Administrateur</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Button>
            <Button variant="outline" size="sm" className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
