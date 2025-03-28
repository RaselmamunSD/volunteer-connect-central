
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Lock, UserCog } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Simple validation
    if (!username) {
      setErrors(prev => ({ ...prev, username: 'Username is required' }));
    }
    
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
    }
    
    // If there are errors, don't proceed
    if (!username || !password) {
      return;
    }
    
    // For demo purposes, we'll just assume the login is successful
    // In a real app, you would validate credentials against a backend
    toast({
      title: "Login Successful",
      description: "Welcome to the admin dashboard",
    });
    
    // Navigate to admin dashboard
    navigate('/admin');
  };
  
  return (
    <div className="container py-6">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <UserCog className="h-7 w-7 text-primary" />
            </div>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Access the event management dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="Enter your username"
                  className={errors.username ? "border-red-500" : ""}
                />
                {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter your password"
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
              
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" className="text-sm">
              Forgot password?
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
