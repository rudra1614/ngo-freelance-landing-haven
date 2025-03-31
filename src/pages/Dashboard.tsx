
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PersonalInfoForm from '@/components/dashboard/PersonalInfoForm';
import EducationForm from '@/components/dashboard/EducationForm';
import ExperienceForm from '@/components/dashboard/ExperienceForm';
import CertificatesForm from '@/components/dashboard/CertificatesForm';
import AppliedJobs from '@/components/dashboard/AppliedJobs';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const Dashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardHeader />
      
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Personal Dashboard</h1>
        
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="applications">Applied Jobs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <PersonalInfoForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>Add your educational qualifications</CardDescription>
              </CardHeader>
              <CardContent>
                <EducationForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Add your previous work history</CardDescription>
              </CardHeader>
              <CardContent>
                <ExperienceForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>Certificates</CardTitle>
                <CardDescription>Add your certifications and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <CertificatesForm />
              </CardContent>
            </Card>
          </TabsContent>
          
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
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
