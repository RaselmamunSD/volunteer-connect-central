
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { generateId, validateForm } from '@/utils/helpers';

const VolunteerLogin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('register');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Registration form state
  const [registerForm, setRegisterForm] = useState({
    name: '',
    phone: '',
    address: '',
    contribution: ''
  });
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    phone: '',
  });
  
  // Manual booking form state
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    address: '',
    amount: ''
  });
  
  // Form errors
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [bookingErrors, setBookingErrors] = useState<Record<string, string>>({});
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (registerErrors[name]) {
      setRegisterErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (loginErrors[name]) {
      setLoginErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (bookingErrors[name]) {
      setBookingErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(registerForm);
    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }
    
    // Registration would typically send data to a server
    // For this demo, we just show a success message
    toast({
      title: "রেজিস্ট্রেশন সফল হয়েছে",
      description: "স্বেচ্ছাসেবক হিসাবে নিবন্ধনের জন্য আপনাকে ধন্যবাদ!",
    });
    
    // Reset form
    setRegisterForm({
      name: '',
      phone: '',
      address: '',
      contribution: ''
    });
    
    // Automatically log in after registration
    setIsLoggedIn(true);
  };
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(loginForm);
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
      phone: '',
    });
    
    // Set logged in
    setIsLoggedIn(true);
  };
  
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(bookingForm);
    if (Object.keys(errors).length > 0) {
      setBookingErrors(errors);
      return;
    }
    
    // Booking would typically send data to a server
    // For this demo, we just show a success message
    toast({
      title: "আসন বুকিং সফল হয়েছে",
      description: "আসন বুকিং করার জন্য আপনাকে ধন্যবাদ!",
    });
    
    // Reset form
    setBookingForm({
      name: '',
      phone: '',
      address: '',
      amount: ''
    });
  };
  
  if (isLoggedIn) {
    return (
      <div className="container py-6">
        <Card>
          <CardHeader>
            <CardTitle>মেনুয়াল আসন বুকিং</CardTitle>
            <CardDescription>স্বেচ্ছাসেবক হিসেবে অন্যদের জন্য আসন বুক করুন</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="booking-name">নাম</Label>
                <Input 
                  id="booking-name" 
                  name="name"
                  value={bookingForm.name} 
                  onChange={handleBookingChange} 
                  placeholder="আসন গ্রহণকারীর নাম লিখুন"
                  className={bookingErrors.name ? "border-red-500" : ""}
                />
                {bookingErrors.name && <p className="text-sm text-red-500">{bookingErrors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="booking-phone">ফোন নম্বর</Label>
                <Input 
                  id="booking-phone" 
                  name="phone"
                  value={bookingForm.phone} 
                  onChange={handleBookingChange} 
                  placeholder="আসন গ্রহণকারীর ফোন নম্বর লিখুন"
                  className={bookingErrors.phone ? "border-red-500" : ""}
                />
                {bookingErrors.phone && <p className="text-sm text-red-500">{bookingErrors.phone}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="booking-address">ঠিকানা</Label>
                <Input 
                  id="booking-address" 
                  name="address"
                  value={bookingForm.address} 
                  onChange={handleBookingChange} 
                  placeholder="আসন গ্রহণকারীর ঠিকানা লিখুন"
                  className={bookingErrors.address ? "border-red-500" : ""}
                />
                {bookingErrors.address && <p className="text-sm text-red-500">{bookingErrors.address}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="booking-amount">টাকার পরিমাণ</Label>
                <Input 
                  id="booking-amount" 
                  name="amount"
                  type="number"
                  value={bookingForm.amount} 
                  onChange={handleBookingChange} 
                  placeholder="টাকার পরিমাণ লিখুন"
                  className={bookingErrors.amount ? "border-red-500" : ""}
                />
                {bookingErrors.amount && <p className="text-sm text-red-500">{bookingErrors.amount}</p>}
              </div>
              
              <Button type="submit" className="w-full">আসন বুক করুন</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsLoggedIn(false)}>লগআউট</Button>
            <p className="text-sm text-muted-foreground">সর্বশেষ আপডেটঃ {new Date().toLocaleDateString('bn-BD')}</p>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container py-6">
      <div className="max-w-md mx-auto">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="register">নিবন্ধন</TabsTrigger>
            <TabsTrigger value="login">লগইন</TabsTrigger>
          </TabsList>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>স্বেচ্ছাসেবক নিবন্ধন</CardTitle>
                <CardDescription>নতুন স্বেচ্ছাসেবক হিসাবে নিবন্ধন করুন</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">নাম</Label>
                    <Input 
                      id="register-name" 
                      name="name"
                      value={registerForm.name} 
                      onChange={handleRegisterChange} 
                      placeholder="আপনার নাম লিখুন"
                      className={registerErrors.name ? "border-red-500" : ""}
                    />
                    {registerErrors.name && <p className="text-sm text-red-500">{registerErrors.name}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-phone">ফোন নম্বর</Label>
                    <Input 
                      id="register-phone" 
                      name="phone"
                      value={registerForm.phone} 
                      onChange={handleRegisterChange} 
                      placeholder="আপনার ফোন নম্বর লিখুন"
                      className={registerErrors.phone ? "border-red-500" : ""}
                    />
                    {registerErrors.phone && <p className="text-sm text-red-500">{registerErrors.phone}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-address">ঠিকানা</Label>
                    <Input 
                      id="register-address" 
                      name="address"
                      value={registerForm.address} 
                      onChange={handleRegisterChange} 
                      placeholder="আপনার ঠিকানা লিখুন"
                      className={registerErrors.address ? "border-red-500" : ""}
                    />
                    {registerErrors.address && <p className="text-sm text-red-500">{registerErrors.address}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-contribution">অবদান (টাকা)</Label>
                    <Input 
                      id="register-contribution" 
                      name="contribution"
                      type="number"
                      value={registerForm.contribution} 
                      onChange={handleRegisterChange} 
                      placeholder="অবদানের পরিমাণ লিখুন"
                      className={registerErrors.contribution ? "border-red-500" : ""}
                    />
                    {registerErrors.contribution && <p className="text-sm text-red-500">{registerErrors.contribution}</p>}
                  </div>
                  
                  <Button type="submit" className="w-full">নিবন্ধন করুন</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>স্বেচ্ছাসেবক লগইন</CardTitle>
                <CardDescription>আপনার স্বেচ্ছাসেবক অ্যাকাউন্টে লগইন করুন</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-phone">ফোন নম্বর</Label>
                    <Input 
                      id="login-phone" 
                      name="phone"
                      value={loginForm.phone} 
                      onChange={handleLoginChange} 
                      placeholder="আপনার ফোন নম্বর লিখুন"
                      className={loginErrors.phone ? "border-red-500" : ""}
                    />
                    {loginErrors.phone && <p className="text-sm text-red-500">{loginErrors.phone}</p>}
                  </div>
                  
                  <Button type="submit" className="w-full">লগইন</Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="link" onClick={() => setActiveTab('register')}>
                  অ্যাকাউন্ট নেই? নিবন্ধন করুন
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VolunteerLogin;
