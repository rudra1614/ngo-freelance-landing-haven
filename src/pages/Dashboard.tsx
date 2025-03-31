
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppliedJobs from '@/components/dashboard/AppliedJobs';
import JobsListView from '@/components/dashboard/JobsListView';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const Dashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardHeader />
      
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Personal Dashboard</h1>
        
        <Tabs defaultValue="applications" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="applications">Applied Jobs</TabsTrigger>
            <TabsTrigger value="jobs">Available Jobs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Applied Jobs</CardTitle>
                <CardDescription>Track the status of your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <AppliedJobs />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Available Jobs</CardTitle>
                <CardDescription>Browse and apply for available job opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <JobsListView />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
