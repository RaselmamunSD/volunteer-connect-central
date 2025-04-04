
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const { toast } = useToast();
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (loginErrors[name]) {
      setLoginErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: Record<string, string> = {};
    if (!loginForm.username) errors.username = 'ইউজারনেম আবশ্যক';
    if (!loginForm.password) errors.password = 'পাসওয়ার্ড আবশ্যক';
    
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }
    
    // Login would typically verify credentials with a server
    // For this demo, we just show a success message
    toast({
      title: "লগইন সফল হয়েছে",
      description: "স্বেচ্ছাসেবক পোর্টালে আপনাকে স্বাগতম!",
    });
    
    // Reset form
    setLoginForm({
      username: '',
      password: ''
    });
    
    // Set logged in
    onLoginSuccess();
  };

  return (
    <div className="container py-6">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>স্বেচ্ছাসেবক লগইন</CardTitle>
            <CardDescription>আপনার স্বেচ্ছাসেবক অ্যাকাউন্টে লগইন করুন</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-username">ইউজারনেম</Label>
                <Input 
                  id="login-username" 
                  name="username"
                  value={loginForm.username} 
                  onChange={handleLoginChange} 
                  placeholder="আপনার ইউজারনেম লিখুন"
                  className={loginErrors.username ? "border-red-500" : ""}
                />
                {loginErrors.username && <p className="text-sm text-red-500">{loginErrors.username}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">পাসওয়ার্ড</Label>
                <Input 
                  id="login-password" 
                  name="password"
                  type="password"
                  value={loginForm.password} 
                  onChange={handleLoginChange} 
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  className={loginErrors.password ? "border-red-500" : ""}
                />
                {loginErrors.password && <p className="text-sm text-red-500">{loginErrors.password}</p>}
              </div>
              
              <Button type="submit" className="w-full">লগইন</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
