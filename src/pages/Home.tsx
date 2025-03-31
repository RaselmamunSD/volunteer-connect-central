
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { volunteers, bookings } from '@/data/mockData';
import { calculateTotal, formatCurrency } from '@/utils/helpers';
import { CalendarDays, CreditCard, Users, Calendar, UserCheck, PhoneCall, Bell, BarChart4 } from 'lucide-react';

const Home = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const totalVolunteerContributions = calculateTotal(volunteers);
  const totalBookingAmount = calculateTotal(bookings);
  
  // Filter paid and unpaid bookings
  const paidBookings = bookings.filter(booking => booking.isPaid);
  const unpaidBookings = bookings.filter(booking => !booking.isPaid);
  
  // Separate offline and online bookings
  // For demo, we'll assume half of the bookings are offline
  const offlineBookings = bookings.slice(0, Math.floor(bookings.length / 2));
  const onlineBookings = bookings.slice(Math.floor(bookings.length / 2));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !address) {
      toast({
        title: "ত্রুটি",
        description: "অনুগ্রহ করে সমস্ত তথ্য পূরণ করুন",
        variant: "destructive",
      });
      return;
    }
    
    // Redirect to a simulated bKash payment interface
    window.location.href = '/bkash-payment';
  };

  return (
    <div className="container py-6">
      <div className="banner-gradient rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">পূর্নমিলনী-২০২৬</h1>
        <p className="text-lg md:text-xl mb-4">"এসো মিলি একত্রে স্মৃতির বন্ধনে ভ্রাতৃত্বের বন্ধনে"</p>
        <p className="mb-4">
          <span className="font-semibold">স্থান:</span> হাড়ীভাঙ্গা তা'লিমুল ইনসান হাফিজিয়া ক্বওমী মাদ্রাসা <br />
          <span className="font-semibold">তারিখ:</span> ঈদুল আযহার তৃতীয় দিন
        </p>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="secondary">
            <Link to="/volunteer/login">স্বেচ্ছাসেবক হিসাবে যোগদান করুন</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/concert">অনুষ্ঠান</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/notice">
              <Bell className="mr-2 h-4 w-4" />
              নোটিশ
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/finance">
              <BarChart4 className="mr-2 h-4 w-4" />
              আয় বেয় খরচ
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">মোট সংগ্রহ</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalVolunteerContributions + totalBookingAmount)}</div>
            <p className="text-xs text-muted-foreground">গত মাসের তুলনায় +২০%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">ডোনেশন তথ্য</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalVolunteerContributions)}</div>
            <p className="text-xs text-muted-foreground">{volunteers.length} জন দাতা</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">অফলাইন বুকিং আয়</CardTitle>
            <PhoneCall className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(offlineBookings.reduce((sum, booking) => sum + booking.amount, 0))}</div>
            <p className="text-xs text-muted-foreground">{offlineBookings.length} বুকিং</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">অনলাইন বুকিং আয়</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(onlineBookings.reduce((sum, booking) => sum + booking.amount, 0))}</div>
            <p className="text-xs text-muted-foreground">{onlineBookings.length} বুকিং</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>ডোনেশন তথ্য</CardTitle>
              <CardDescription>সাম্প্রতিক দাতাদের অবদানের সারসংক্ষেপ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {volunteers.map(volunteer => (
                  <div key={volunteer.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{volunteer.name}</p>
                      <p className="text-sm text-muted-foreground">{volunteer.phone}</p>
                    </div>
                    <Badge variant="outline">{formatCurrency(volunteer.contribution)}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>আসন বুক করুন</CardTitle>
              <CardDescription>আসন্ন অনুষ্ঠানের জন্য আপনার আসন সংরক্ষণ করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">নাম</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="আপনার নাম লিখুন" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">ফোন নম্বর</Label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="আপনার ফোন নম্বর লিখুন" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">ঠিকানা</Label>
                  <Input 
                    id="address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="আপনার ঠিকানা লিখুন" 
                  />
                </div>
                <Button type="submit" className="w-full">বিকাশ পেমেন্ট-এ যান</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">সমস্ত বুকিং</TabsTrigger>
          <TabsTrigger value="offline">অফলাইন বুকিং</TabsTrigger>
          <TabsTrigger value="online">অনলাইন বুকিং</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>সমস্ত আসন বুকিং</CardTitle>
              <CardDescription>সমস্ত বুকিংয়ের তালিকা</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {bookings.map(booking => (
                  <Card key={booking.id} className="event-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{booking.name}</CardTitle>
                      <CardDescription>{booking.phone}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{booking.address}</span>
                        <Badge variant={booking.isPaid ? "default" : "outline"}>
                          {booking.isPaid ? "পেমেন্ট সম্পন্ন" : "অপেক্ষমান"}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm font-medium">{formatCurrency(booking.amount)}</p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="offline">
          <Card>
            <CardHeader>
              <CardTitle>অফলাইন বুকিং</CardTitle>
              <CardDescription>স্বেচ্ছাসেবকদের দ্বারা করা বুকিংয়ের তালিকা</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {offlineBookings.map(booking => (
                  <Card key={booking.id} className="event-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{booking.name}</CardTitle>
                      <CardDescription>{booking.phone}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{booking.address}</span>
                        <Badge variant={booking.isPaid ? "default" : "outline"}>
                          {booking.isPaid ? "পেমেন্ট সম্পন্ন" : "অপেক্ষমান"}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm font-medium">{formatCurrency(booking.amount)}</p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="online">
          <Card>
            <CardHeader>
              <CardTitle>অনলাইন বুকিং</CardTitle>
              <CardDescription>বিকাশ পেমেন্টের মাধ্যমে করা বুকিংয়ের তালিকা</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {onlineBookings.map(booking => (
                  <Card key={booking.id} className="event-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{booking.name}</CardTitle>
                      <CardDescription>{booking.phone}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{booking.address}</span>
                        <Badge variant={booking.isPaid ? "default" : "outline"}>
                          {booking.isPaid ? "পেমেন্ট সম্পন্ন" : "অপেক্ষমান"}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm font-medium">{formatCurrency(booking.amount)}</p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
