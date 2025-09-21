import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, User, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import nourivoxLogo from "@/assets/nourivox-logo.png";
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import AppointmentsCard from '@/components/dashboard/AppointmentsCard';
import RemindersCard from '@/components/dashboard/RemindersCard';
import HealthStatsCard from '@/components/dashboard/HealthStatsCard';
import HealthRecordsCard from '@/components/dashboard/HealthRecordsCard';
import QuickActionsCard from '@/components/dashboard/QuickActionsCard';
import PatientProfileCard from '@/components/dashboard/PatientProfileCard';

const Dashboard = () => {
  const { t } = useTranslation();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-card border-b border-border px-6 py-4 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="hover:bg-muted" />
                <div className="flex items-center gap-3">
                  <img 
                    src={nourivoxLogo} 
                    alt="Nourivox Logo" 
                    className="h-8 w-auto animate-fade-in"
                  />
                  <div>
                    <h1 className="text-xl font-semibold text-foreground">{t('dashboard.title')}</h1>
                    <p className="text-sm text-muted-foreground">{t('hero.subtitle')}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Back to Home Button */}
                <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                  <Link to="/" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('navigation.home')}</span>
                  </Link>
                </Button>
                
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive">
                    3
                  </Badge>
                </Button>
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Patient" />
                  <AvatarFallback className="bg-medical-blue text-white">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">Patient ID: P001234</p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 space-y-6">
            {/* Patient Profile */}
            <PatientProfileCard />
            
            {/* Quick Actions */}
            <QuickActionsCard />
            
            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Appointments - Takes 2 columns on xl screens */}
              <div className="xl:col-span-2">
                <AppointmentsCard />
              </div>
              
              {/* Reminders */}
              <div className="xl:col-span-1">
                <RemindersCard />
              </div>
              
              {/* Health Stats - Takes 2 columns on lg screens and up */}
              <div className="lg:col-span-2 xl:col-span-2">
                <HealthStatsCard />
              </div>
              
              {/* Health Records */}
              <div className="lg:col-span-2 xl:col-span-1">
                <HealthRecordsCard />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;