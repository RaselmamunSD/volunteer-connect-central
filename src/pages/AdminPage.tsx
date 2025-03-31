
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { volunteers } from '@/data/mockData';
import { formatCurrency } from '@/utils/helpers';
import { useToast } from '@/hooks/use-toast';

const AdminPage = () => {
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // For donation/expense form
  const [donationForm, setDonationForm] = useState({
    name: '',
    amount: '',
    type: 'donation' // Can be 'donation' or 'expense'
  });
  
  // For volunteer donation update
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    phone: '',
    contribution: '',
  });
  
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
  
  const handleDonationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDonationForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleVolunteerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVolunteerForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!donationForm.name || !donationForm.amount) {
      toast({
        title: "ত্রুটি",
        description: "সকল তথ্য পূরণ করুন",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "সফল",
      description: donationForm.type === 'donation' ? "আয় তথ্য সংরক্ষণ করা হয়েছে" : "ব্যয় তথ্য সংরক্ষণ করা হয়েছে",
    });
    
    // Reset form
    setDonationForm({
      name: '',
      amount: '',
      type: 'donation'
    });
  };
  
  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!volunteerForm.name || !volunteerForm.contribution) {
      toast({
        title: "ত্রুটি",
        description: "সকল তথ্য পূরণ করুন",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "সফল",
      description: "ডোনেশন তথ্য সংরক্ষণ করা হয়েছে",
    });
    
    // Reset form
    setVolunteerForm({
      name: '',
      phone: '',
      contribution: ''
    });
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
  
  // Total calculations for financial data
  const totalVolunteers = volunteers.length;
  const totalVolunteerContributions = volunteers.reduce((sum, volunteer) => sum + volunteer.contribution, 0);
  
  return (
    <div className="container py-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>অ্যাডমিন ড্যাশবোর্ড</CardTitle>
          <CardDescription>আয় বেয় খরচের তথ্য এবং ডোনেশন তথ্য আপডেট করুন</CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>আয় বেয় খরচ আপডেট</CardTitle>
            <CardDescription>নতুন আয় বা ব্যয় যোগ করুন</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDonationSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">বিবরণ</Label>
                <Input 
                  id="name" 
                  name="name"
                  value={donationForm.name} 
                  onChange={handleDonationChange} 
                  placeholder="বিবরণ লিখুন" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">পরিমাণ</Label>
                <Input 
                  id="amount" 
                  name="amount"
                  type="number"
                  value={donationForm.amount} 
                  onChange={handleDonationChange} 
                  placeholder="টাকার পরিমাণ লিখুন" 
                />
              </div>
              
              <div className="space-y-2">
                <Label>ধরণ</Label>
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <Input
                      type="radio"
                      id="donation"
                      name="type"
                      value="donation"
                      checked={donationForm.type === 'donation'}
                      onChange={handleDonationChange}
                      className="mr-2 h-4 w-4"
                    />
                    <Label htmlFor="donation" className="cursor-pointer">আয়</Label>
                  </div>
                  <div className="flex items-center">
                    <Input
                      type="radio"
                      id="expense"
                      name="type"
                      value="expense"
                      checked={donationForm.type === 'expense'}
                      onChange={handleDonationChange}
                      className="mr-2 h-4 w-4"
                    />
                    <Label htmlFor="expense" className="cursor-pointer">ব্যয়</Label>
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full">সংরক্ষণ করুন</Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>ডোনেশন তথ্য আপডেট</CardTitle>
            <CardDescription>নতুন ডোনেশন তথ্য যোগ করুন</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVolunteerSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="donorName">দাতার নাম</Label>
                <Input 
                  id="donorName" 
                  name="name"
                  value={volunteerForm.name} 
                  onChange={handleVolunteerChange} 
                  placeholder="দাতার নাম লিখুন" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="donorPhone">ফোন নম্বর</Label>
                <Input 
                  id="donorPhone" 
                  name="phone"
                  value={volunteerForm.phone} 
                  onChange={handleVolunteerChange} 
                  placeholder="ফোন নম্বর লিখুন" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contribution">অবদান</Label>
                <Input 
                  id="contribution" 
                  name="contribution"
                  type="number"
                  value={volunteerForm.contribution} 
                  onChange={handleVolunteerChange} 
                  placeholder="টাকার পরিমাণ লিখুন" 
                />
              </div>
              
              <Button type="submit" className="w-full">সংরক্ষণ করুন</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>ডোনেশন তথ্য</CardTitle>
          <CardDescription>বর্তমান ডোনেশন তথ্য দেখুন</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>নাম</TableHead>
                <TableHead>ফোন নম্বর</TableHead>
                <TableHead className="text-right">অবদান</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {volunteers.map(volunteer => (
                <TableRow key={volunteer.id}>
                  <TableCell className="font-medium">{volunteer.name}</TableCell>
                  <TableCell>{volunteer.phone}</TableCell>
                  <TableCell className="text-right">{formatCurrency(volunteer.contribution)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>মোট</TableCell>
                <TableCell className="text-right">{formatCurrency(totalVolunteerContributions)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
