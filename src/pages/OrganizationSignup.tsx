
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, UserPlus } from 'lucide-react';

const OrganizationSignup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For now, just show a toast and redirect as if signup was successful
    toast({
      title: 'Organization Registration Successful',
      description: 'Welcome to NGO Freelancing! You can now post opportunities for social workers.'
    });
    navigate('/organization/dashboard');
  };

  return (
    <div className="min-h-screen bg-ngo-darkblue flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="h-12 w-12 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Register Your Organization</CardTitle>
          <CardDescription className="text-center">
            Create an account to post opportunities and hire social workers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input id="org-name" placeholder="Your NGO or Organization Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Organization Email</Label>
              <Input id="email" type="email" placeholder="organization@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Phone</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-type">Organization Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ngo">Non-Governmental Organization (NGO)</SelectItem>
                  <SelectItem value="nonprofit">Nonprofit</SelectItem>
                  <SelectItem value="government">Government Agency</SelectItem>
                  <SelectItem value="education">Educational Institution</SelectItem>
                  <SelectItem value="healthcare">Healthcare Organization</SelectItem>
                  <SelectItem value="foundation">Foundation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="focus-area">Primary Focus Area</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="children">Child Welfare</SelectItem>
                  <SelectItem value="elderly">Elderly Care</SelectItem>
                  <SelectItem value="health">Community Health</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="mental-health">Mental Health</SelectItem>
                  <SelectItem value="disaster">Disaster Relief</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-ngo-blue hover:bg-ngo-blue-dark">
              <UserPlus className="mr-2 h-4 w-4" /> Register Organization
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center">
            Already have an organization account?{' '}
            <Link to="/organization/login" className="text-blue-500 hover:text-blue-700 font-medium">
              Sign in
            </Link>
          </div>
          <div className="text-xs text-center text-gray-500">
            Looking to work as a social worker?{' '}
            <Link to="/signup" className="text-blue-500 hover:text-blue-700">
              Sign up as social worker
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrganizationSignup;
