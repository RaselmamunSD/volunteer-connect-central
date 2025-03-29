
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { volunteers, bookings } from '@/data/mockData';
import { formatCurrency } from '@/utils/helpers';
import { useToast } from '@/hooks/use-toast';

const AdminPage = () => {
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple login check (in a real app, this would validate against a server)
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      toast({
        title: "লগইন সফল",
        description: "অ্যাডমিন প্যানেলে স্বাগতম!",
      });
    } else {
      toast({
        title: "লগইন ব্যর্থ",
        description: "ইউজারনেম বা পাসওয়ার্ড ভুল!",
        variant: "destructive",
      });
    }
  };
  
  if (!isLoggedIn) {
    return (
      <div className="container py-6">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>অ্যাডমিন লগইন</CardTitle>
              <CardDescription>অ্যাডমিন প্যানেলে প্রবেশ করতে লগইন করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">ইউজারনেম</Label>
                  <Input 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="ইউজারনেম লিখুন" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">পাসওয়ার্ড</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="পাসওয়ার্ড লিখুন" 
                  />
                </div>
                <Button type="submit" className="w-full">লগইন</Button>
              </form>
            </CardContent>
            <CardFooter className="text-center text-sm text-muted-foreground">
              ডিফল্ট ক্রেডেনশিয়ালসঃ admin / admin
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  
  // Total calculations
  const totalVolunteers = volunteers.length;
  const totalVolunteerContributions = volunteers.reduce((sum, volunteer) => sum + volunteer.contribution, 0);
  const totalBookings = bookings.length;
  const totalBookingAmount = bookings.reduce((sum, booking) => sum + booking.amount, 0);
  const paidBookings = bookings.filter(booking => booking.isPaid);
  const unpaidBookings = bookings.filter(booking => !booking.isPaid);
  
  return (
    <div className="container py-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>অ্যাডমিন ড্যাশবোর্ড</CardTitle>
          <CardDescription>সমস্ত তথ্য এবং পরিসংখ্যান এখানে দেখুন</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm">মোট স্বেচ্ছাসেবক</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totalVolunteers}</p>
                <p className="text-sm text-muted-foreground">মোট অবদান: {formatCurrency(totalVolunteerContributions)}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm">মোট বুকিং</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totalBookings}</p>
                <p className="text-sm text-muted-foreground">মোট আয়: {formatCurrency(totalBookingAmount)}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm">পেমেন্ট কৃত</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{paidBookings.length}</p>
                <p className="text-sm text-muted-foreground">মোট আয়: {formatCurrency(paidBookings.reduce((sum, booking) => sum + booking.amount, 0))}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm">পেমেন্ট বাকি</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{unpaidBookings.length}</p>
                <p className="text-sm text-muted-foreground">বাকি আয়: {formatCurrency(unpaidBookings.reduce((sum, booking) => sum + booking.amount, 0))}</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="volunteers">
        <TabsList className="mb-4">
          <TabsTrigger value="volunteers">স্বেচ্ছাসেবক</TabsTrigger>
          <TabsTrigger value="bookings">বুকিং</TabsTrigger>
        </TabsList>
        
        <TabsContent value="volunteers">
          <Card>
            <CardHeader>
              <CardTitle>স্বেচ্ছাসেবক তালিকা</CardTitle>
              <CardDescription>সমস্ত নিবন্ধিত স্বেচ্ছাসেবকদের তথ্য</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>নাম</TableHead>
                    <TableHead>ফোন</TableHead>
                    <TableHead>ঠিকানা</TableHead>
                    <TableHead className="text-right">অবদান</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {volunteers.map(volunteer => (
                    <TableRow key={volunteer.id}>
                      <TableCell className="font-medium">{volunteer.name}</TableCell>
                      <TableCell>{volunteer.phone}</TableCell>
                      <TableCell>{volunteer.address}</TableCell>
                      <TableCell className="text-right">{formatCurrency(volunteer.contribution)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>বুকিং তালিকা</CardTitle>
              <CardDescription>সমস্ত বুকিংয়ের তথ্য</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>নাম</TableHead>
                    <TableHead>ফোন</TableHead>
                    <TableHead>ঠিকানা</TableHead>
                    <TableHead>পরিমাণ</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map(booking => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.name}</TableCell>
                      <TableCell>{booking.phone}</TableCell>
                      <TableCell>{booking.address}</TableCell>
                      <TableCell>{formatCurrency(booking.amount)}</TableCell>
                      <TableCell>
                        {booking.isPaid ? (
                          <Badge>পেমেন্ট সম্পন্ন</Badge>
                        ) : (
                          <Badge variant="outline">পেমেন্ট বাকি</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
