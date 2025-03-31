
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Briefcase, LogIn, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const OrganizationLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          // If there's a valid session, check if organization exists
          const { data: orgData, error: orgError } = await supabase
            .from('organizations')
            .select('id')
            .eq('user_id', data.session.user.id)
            .maybeSingle(); // Using maybeSingle instead of single to avoid errors
            
          if (orgData && !orgError) {
            navigate('/organization/dashboard');
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };
    
    checkSession();
  }, [navigate]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Check if this user has an associated organization
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .select('id, name')
          .eq('user_id', data.user.id)
          .maybeSingle(); // Using maybeSingle instead of single
          
        if (orgError || !orgData) {
          console.log("Creating new organization record");
          // User is authenticated but has no organization record
          toast({
            title: 'Login Successful',
            description: "You're signed in, but we couldn't find your organization details. Creating one for you now.",
          });
          
          // Create a minimal organization record
          const { data: newOrg, error: createError } = await supabase
            .from('organizations')
            .insert([
              { 
                user_id: data.user.id, 
                name: 'Organization', 
                email: data.user.email 
              }
            ])
            .select('id')
            .single();
            
          if (createError) {
            console.error('Error creating organization:', createError);
            throw new Error('Failed to create organization profile');
          }
          
          navigate('/organization/dashboard');
        } else {
          // Success - user and organization exist
          toast({
            title: 'Login Successful',
            description: `Welcome back, ${orgData.name}!`
          });
          navigate('/organization/dashboard');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login. Please check your credentials.');
      toast({
        title: 'Login Failed',
        description: error.message || 'Please check your credentials and try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="border-gray-800 bg-gray-800 text-white shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <Briefcase className="h-12 w-12 text-blue-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Organization Sign In</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Enter your credentials to access your organization account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Organization Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="organization@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <Link to="/organization/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              {error && (
                <div className="text-red-400 text-sm mt-2">
                  {error}
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </span>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-gray-700 pt-4">
            <div className="text-sm text-center text-gray-300">
              Don't have an organization account?{' '}
              <Link to="/organization/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                Register organization
              </Link>
            </div>
            <div className="text-xs text-center text-gray-400">
              Looking to work as a social worker?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300">
                Sign in as social worker
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationLogin;
