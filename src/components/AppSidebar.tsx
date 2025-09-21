import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  MessageCircle, 
  Calendar, 
  Clock, 
  FileText, 
  Settings, 
  User,
  Home,
  Building2
} from 'lucide-react';

const items = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Chatbot', url: '/chat', icon: MessageCircle },
  { title: 'Pharmacy', url: '/pharmacy', icon: Building2 },
  { title: 'Appointments', url: '/appointments', icon: Calendar },
  { title: 'Reminders', url: '/reminders', icon: Clock },
  { title: 'Health Records', url: '/records', icon: FileText },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar
      className={state === "collapsed" ? "w-14" : "w-60"}
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Healthcare Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end
                      className={({ isActive }) =>
                        isActive 
                          ? 'bg-medical-blue/10 text-medical-blue font-medium border-r-2 border-medical-blue' 
                          : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                      }
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {state === "expanded" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}