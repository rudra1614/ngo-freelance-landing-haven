
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, UserPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const OrganizationSignup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    orgName: '',
    email: '',
    password: '',
    phone: '',
    orgType: '',
    focusArea: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            is_organization: 'true',
            org_name: formData.orgName,
            org_type: formData.orgType,
            focus_area: formData.focusArea,
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Update the phone which wasn't part of the signup metadata
        const { error: updateError } = await supabase
          .from('organizations')
          .update({ phone: formData.phone })
          .eq('user_id', data.user.id);

        if (updateError) {
          console.error('Error updating phone:', updateError);
        }

        toast({
          title: 'Organization Registration Successful',
          description: 'Welcome to NGO Freelancing! You can now post opportunities for social workers.'
        });
        navigate('/organization/dashboard');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'Failed to register. Please try again.');
      toast({
        title: 'Registration Failed',
        description: error.message || 'Please check your information and try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
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
              <Label htmlFor="orgName">Organization Name</Label>
              <Input 
                id="orgName" 
                placeholder="Your NGO or Organization Name" 
                value={formData.orgName}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Organization Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="organization@example.com" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Phone</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="+1 (555) 123-4567" 
                value={formData.phone}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orgType">Organization Type</Label>
              <Select onValueChange={(value) => handleSelectChange('orgType', value)}>
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
              <Label htmlFor="focusArea">Primary Focus Area</Label>
              <Select onValueChange={(value) => handleSelectChange('focusArea', value)}>
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
            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-ngo-blue hover:bg-ngo-blue-dark"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" /> Register Organization
                </>
              )}
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
