
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Briefcase, LogIn } from 'lucide-react';

const OrganizationLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For now, just show a toast and redirect as if login was successful
    toast({
      title: 'Organization Login Successful',
      description: 'Welcome back to NGO Freelancing!'
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
          <CardTitle className="text-2xl font-bold text-center">Organization Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your organization account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Organization Email</Label>
              <Input id="email" type="email" placeholder="organization@example.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/organization/forgot-password" className="text-sm text-blue-500 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-ngo-blue hover:bg-ngo-blue-dark">
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center">
            Don't have an organization account?{' '}
            <Link to="/organization/signup" className="text-blue-500 hover:text-blue-700 font-medium">
              Register organization
            </Link>
          </div>
          <div className="text-xs text-center text-gray-500">
            Looking to work as a social worker?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Sign in as social worker
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrganizationLogin;
