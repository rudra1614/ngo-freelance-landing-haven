
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { LogOut, Briefcase, Users, FilePlus, LayoutDashboard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface DashboardSidebarProps {
  activeTab: 'jobs' | 'applications' | 'create-job';
  setActiveTab: (tab: 'jobs' | 'applications' | 'create-job') => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out',
      });
      navigate('/organization/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Error',
        description: 'Failed to log out',
        variant: 'destructive',
      });
    }
  };

  return (
    <Sidebar>
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold">NGO Dashboard</h2>
          </div>
          <SidebarTrigger />
        </div>

        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    className={activeTab === 'jobs' ? 'bg-accent/50' : ''}
                    onClick={() => setActiveTab('jobs')}
                  >
                    <Briefcase />
                    <span>Jobs</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    className={activeTab === 'applications' ? 'bg-accent/50' : ''}
                    onClick={() => setActiveTab('applications')}
                  >
                    <Users />
                    <span>Applications</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    className={activeTab === 'create-job' ? 'bg-accent/50' : ''}
                    onClick={() => setActiveTab('create-job')}
                  >
                    <FilePlus />
                    <span>Create New Job</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
};

export default DashboardSidebar;
