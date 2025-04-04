
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { validateForm } from '@/utils/helpers';
import { bookings } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/helpers';

const VolunteerLogin = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  
  // Manual booking form state
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    address: '',
    amount: '',
    formNumber: '',
    batchNumber: ''
  });
  
  // Form errors
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [bookingErrors, setBookingErrors] = useState<Record<string, string>>({});
  
  // Local bookings state
  const [localBookings, setLocalBookings] = useState<any[]>([]);
  const [onlineBookings, setOnlineBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('offline');
  
  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedOfflineBookings = JSON.parse(localStorage.getItem('offlineBookings') || '[]');
      const savedOnlineBookings = JSON.parse(localStorage.getItem('onlineBookings') || '[]');
      setLocalBookings(savedOfflineBookings);
      setOnlineBookings(savedOnlineBookings);
    } catch (err) {
      console.error('Error loading data from localStorage:', err);
      setLocalBookings([]);
      setOnlineBookings([]);
    }
  }, []);
  
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
    setIsLoggedIn(true);
  };
  
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(bookingForm);
    if (Object.keys(errors).length > 0) {
      setBookingErrors(errors);
      return;
    }
    
    // Create new booking object
    const newBooking = {
      id: Date.now(),
      name: bookingForm.name,
      phone: bookingForm.phone,
      address: bookingForm.address,
      amount: parseFloat(bookingForm.amount) || 0,
      formNumber: bookingForm.formNumber || '',
      batchNumber: bookingForm.batchNumber || '',
      isPaid: true, // Offline bookings are considered paid
      bookingDate: new Date().toISOString(),
      paymentType: 'offline'
    };
    
    // Update local state
    const updatedBookings = [...localBookings, newBooking];
    setLocalBookings(updatedBookings);
    
    // Save to localStorage
    localStorage.setItem('offlineBookings', JSON.stringify(updatedBookings));
    
    toast({
      title: "আসন বুকিং সফল হয়েছে",
      description: "আসন বুকিং করার জন্য আপনাকে ধন্যবাদ!",
    });
    
    // Reset form
    setBookingForm({
      name: '',
      phone: '',
      address: '',
      amount: '',
      formNumber: '',
      batchNumber: ''
    });
    
    // Switch to the online tab to show the booking
    setActiveTab('online');
  };
  
  if (isLoggedIn) {
    return (
      <div className="container py-6">
        <Card>
          <CardHeader>
            <CardTitle>স্বেচ্ছাসেবক পোর্টাল</CardTitle>
            <CardDescription>স্বেচ্ছাসেবক হিসেবে অন্যদের জন্য আসন বুক করুন</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="offline">অফলাইন বুকিং</TabsTrigger>
                <TabsTrigger value="online">অনলাইন বুকিং</TabsTrigger>
              </TabsList>
              
              <TabsContent value="offline">
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="booking-form">ফর্ম নং</Label>
                    <Input 
                      id="booking-form" 
                      name="formNumber"
                      value={bookingForm.formNumber} 
                      onChange={handleBookingChange} 
                      placeholder="ফর্ম নম্বর লিখুন"
                      className={bookingErrors.formNumber ? "border-red-500" : ""}
                    />
                    {bookingErrors.formNumber && <p className="text-sm text-red-500">{bookingErrors.formNumber}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="booking-batch">ব্যাচ নং</Label>
                    <Input 
                      id="booking-batch" 
                      name="batchNumber"
                      value={bookingForm.batchNumber} 
                      onChange={handleBookingChange} 
                      placeholder="ব্যাচ নম্বর লিখুন"
                      className={bookingErrors.batchNumber ? "border-red-500" : ""}
                    />
                    {bookingErrors.batchNumber && <p className="text-sm text-red-500">{bookingErrors.batchNumber}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button type="submit" className="w-full">অফলাইন বুকিং করুন</Button>
                    <Button type="button" onClick={() => setActiveTab('online')} variant="outline" className="w-full">অনলাইন বুকিং দেখুন</Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="online">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-2">অনলাইন বুকিংয়ের তালিকা</h3>
                  {onlineBookings.length > 0 ? (
                    onlineBookings.map((booking, index) => (
                      <div key={booking.id || index} className="border rounded-lg p-4">
                        <dl className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <dt className="font-medium">নাম:</dt>
                              <dd>{booking.name || 'অজানা'}</dd>
                            </div>
                            <Badge variant={booking.isPaid ? "default" : "outline"}>
                              {booking.isPaid ? "পেমেন্ট সম্পন্ন" : "অপেক্ষমান"}
                            </Badge>
                          </div>
                          
                          <div>
                            <dt className="font-medium">ফোন নাম্বার:</dt>
                            <dd>{booking.phone || 'উল্লেখ নেই'}</dd>
                          </div>
                          
                          <div>
                            <dt className="font-medium">ঠিকানা:</dt>
                            <dd>{booking.address || 'উল্লেখ নেই'}</dd>
                          </div>
                          
                          {booking.batchNumber && (
                            <div>
                              <dt className="font-medium">ব্যাচ নং:</dt>
                              <dd>{booking.batchNumber}</dd>
                            </div>
                          )}
                          
                          {booking.formNumber && (
                            <div>
                              <dt className="font-medium">ফর্ম নং:</dt>
                              <dd>{booking.formNumber}</dd>
                            </div>
                          )}
                          
                          <div className="pt-2 border-t mt-2">
                            <p className="font-medium text-right">মূল্য: {formatCurrency(booking.amount || 0)}</p>
                          </div>
                        </dl>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-8 text-muted-foreground">কোনো অনলাইন বুকিং তথ্য পাওয়া যায়নি</p>
                  )}
                  <Button onClick={() => setActiveTab('offline')} variant="outline" className="w-full">
                    অফলাইন বুকিং ফর্মে ফিরে যান
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
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

export default VolunteerLogin;
