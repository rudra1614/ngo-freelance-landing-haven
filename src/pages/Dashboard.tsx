
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppliedJobs from '@/components/dashboard/AppliedJobs';
import JobsListView from '@/components/dashboard/JobsListView';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { CircleUser, Briefcase } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <DashboardHeader />
      
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Personal Dashboard
            </span>
          </h1>
          <p className="text-gray-600">Manage your job applications and find new opportunities</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <CircleUser className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-1">Profile Completion</h3>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-gray-500 mt-2">75% Complete</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-1">Applications</h3>
              <p className="text-3xl font-bold text-blue-600">12</p>
              <p className="text-gray-500">Active applications</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-1">Interviews</h3>
              <p className="text-3xl font-bold text-green-600">3</p>
              <p className="text-gray-500">Upcoming interviews</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-1">Viewed</h3>
              <p className="text-3xl font-bold text-purple-600">28</p>
              <p className="text-gray-500">Profile views</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-blue-50 p-1 rounded-xl">
            <TabsTrigger 
              value="applications" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
            >
              Applied Jobs
            </TabsTrigger>
            <TabsTrigger 
              value="jobs" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
            >
              Available Jobs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="animate-fade-in">
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardTitle>Applied Jobs</CardTitle>
                <CardDescription className="text-blue-100">Track the status of your job applications</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <AppliedJobs />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="jobs" className="animate-fade-in">
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardTitle>Available Jobs</CardTitle>
                <CardDescription className="text-blue-100">Browse and apply for available job opportunities</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
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
