import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { volunteers, bookings } from '@/data/mockData';
import { formatCurrency } from '@/utils/helpers';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash } from 'lucide-react';

interface Volunteer {
  id: number;
  name: string;
  phone: string;
  contribution: number;
  joinDate?: string;
  address?: string;
}

interface FinancialItem {
  id: number;
  name: string;
  value: number;
}

interface Booking {
  id: number;
  name: string;
  phone: string;
  address: string;
  amount: number;
  isPaid: boolean;
  bookingDate?: string;
  paymentType?: string;
}

const initialIncomeData = [
  { id: 1, name: 'অনুষ্ঠান টিকেট বিক্রয়', value: 250000 },
  { id: 2, name: 'ডোনেশন', value: 180000 },
  { id: 3, name: 'স্পন্সরশিপ', value: 120000 },
  { id: 4, name: 'অন্যান্য', value: 50000 },
];

const initialExpenseData = [
  { id: 1, name: 'ভেন্যু খরচ', value: 100000 },
  { id: 2, name: 'খাবার', value: 150000 },
  { id: 3, name: 'সাউন্ড সিস্টেম', value: 80000 },
  { id: 4, name: 'ডেকোরেশন', value: 70000 },
  { id: 5, name: 'প্রিন্টিং', value: 40000 },
  { id: 6, name: 'অন্যান্য খরচ', value: 60000 },
];

const AdminPage = () => {
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [donationForm, setDonationForm] = useState({
    name: '',
    amount: '',
    type: 'donation'
  });
  
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    phone: '',
    contribution: ''
  });

  const [editingItem, setEditingItem] = useState<FinancialItem | null>(null);
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const [localVolunteers, setLocalVolunteers] = useState<Volunteer[]>([]);
  const [incomeData, setIncomeData] = useState<FinancialItem[]>([]);
  const [expenseData, setExpenseData] = useState<FinancialItem[]>([]);
  const [localBookings, setLocalBookings] = useState<Booking[]>([]);
  const [offlineBookings, setOfflineBookings] = useState<Booking[]>([]);
  const [onlineBookings, setOnlineBookings] = useState<Booking[]>([]);
  
  useEffect(() => {
    try {
      const savedVolunteers = JSON.parse(localStorage.getItem('volunteers') || JSON.stringify(volunteers));
      const savedIncomeData = JSON.parse(localStorage.getItem('incomeData') || JSON.stringify(initialIncomeData));
      const savedExpenseData = JSON.parse(localStorage.getItem('expenseData') || JSON.stringify(initialExpenseData));
      const savedOfflineBookings = JSON.parse(localStorage.getItem('offlineBookings') || '[]');
      const savedOnlineBookings = JSON.parse(localStorage.getItem('onlineBookings') || '[]');
      
      setLocalVolunteers(savedVolunteers);
      setIncomeData(savedIncomeData);
      setExpenseData(savedExpenseData);
      setOfflineBookings(savedOfflineBookings);
      setOnlineBookings(savedOnlineBookings);
      setLocalBookings([...savedOfflineBookings, ...savedOnlineBookings]);
    } catch (err) {
      console.error('Error loading data from localStorage:', err);
      setLocalVolunteers(volunteers);
      setIncomeData(initialIncomeData);
      setExpenseData(initialExpenseData);
      setOfflineBookings([]);
      setOnlineBookings([]);
      setLocalBookings([]);
    }
  }, []);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
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
    
    const amount = parseFloat(donationForm.amount);
    
    if (donationForm.type === 'donation') {
      if (editingItem) {
        const updatedIncomeData = incomeData.map(item => 
          item.id === editingItem.id ? { ...item, name: donationForm.name, value: amount } : item
        );
        setIncomeData(updatedIncomeData);
        localStorage.setItem('incomeData', JSON.stringify(updatedIncomeData));
        setEditingItem(null);
        
        toast({
          title: "সফল",
          description: "আয় তথ্য আপডেট করা হয়েছে",
        });
      } else {
        const newIncomeItem = {
          id: Date.now(),
          name: donationForm.name,
          value: amount
        };
        
        const updatedIncomeData = [...incomeData, newIncomeItem];
        setIncomeData(updatedIncomeData);
        localStorage.setItem('incomeData', JSON.stringify(updatedIncomeData));
        
        toast({
          title: "সফল",
          description: "আয় তথ্য সংরক্ষণ করা হয়েছে",
        });
      }
    } else {
      if (editingItem) {
        const updatedExpenseData = expenseData.map(item => 
          item.id === editingItem.id ? { ...item, name: donationForm.name, value: amount } : item
        );
        setExpenseData(updatedExpenseData);
        localStorage.setItem('expenseData', JSON.stringify(updatedExpenseData));
        setEditingItem(null);
        
        toast({
          title: "সফল",
          description: "ব্যয় তথ্য আপডেট করা হয়েছে",
        });
      } else {
        const newExpenseItem = {
          id: Date.now(),
          name: donationForm.name,
          value: amount
        };
        
        const updatedExpenseData = [...expenseData, newExpenseItem];
        setExpenseData(updatedExpenseData);
        localStorage.setItem('expenseData', JSON.stringify(updatedExpenseData));
        
        toast({
          title: "সফল",
          description: "ব্যয় তথ্য সংরক্ষণ করা হয়েছে",
        });
      }
    }
    
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
    
    if (editingVolunteer) {
      const updatedVolunteers = localVolunteers.map(volunteer => 
        volunteer.id === editingVolunteer.id ? {
          ...volunteer,
          name: volunteerForm.name,
          phone: volunteerForm.phone || volunteer.phone,
          contribution: parseFloat(volunteerForm.contribution)
        } : volunteer
      );
      
      setLocalVolunteers(updatedVolunteers);
      localStorage.setItem('volunteers', JSON.stringify(updatedVolunteers));
      setEditingVolunteer(null);
      
      toast({
        title: "সফল",
        description: "ডোনেশন তথ্য আপডেট করা হয়েছে",
      });
    } else {
      const newVolunteer: Volunteer = {
        id: Date.now(),
        name: volunteerForm.name,
        phone: volunteerForm.phone || 'N/A',
        contribution: parseFloat(volunteerForm.contribution),
        joinDate: new Date().toISOString().split('T')[0]
      };
      
      const updatedVolunteers = [...localVolunteers, newVolunteer];
      setLocalVolunteers(updatedVolunteers);
      localStorage.setItem('volunteers', JSON.stringify(updatedVolunteers));
      
      toast({
        title: "সফল",
        description: "ডোনেশন তথ্য সংরক্ষণ করা হয়েছে",
      });
    }
    
    setVolunteerForm({
      name: '',
      phone: '',
      contribution: ''
    });
  };
  
  const handleEditIncome = (item: FinancialItem) => {
    setEditingItem(item);
    setDonationForm({
      name: item.name,
      amount: item.value.toString(),
      type: 'donation'
    });
  };
  
  const handleEditExpense = (item: FinancialItem) => {
    setEditingItem(item);
    setDonationForm({
      name: item.name,
      amount: item.value.toString(),
      type: 'expense'
    });
  };
  
  const handleDeleteIncome = (id: number) => {
    const updatedIncomeData = incomeData.filter(item => item.id !== id);
    setIncomeData(updatedIncomeData);
    localStorage.setItem('incomeData', JSON.stringify(updatedIncomeData));
    
    toast({
      title: "সফল",
      description: "আয় তথ্য মুছে ফেলা হয়েছে",
    });
  };
  
  const handleDeleteExpense = (id: number) => {
    const updatedExpenseData = expenseData.filter(item => item.id !== id);
    setExpenseData(updatedExpenseData);
    localStorage.setItem('expenseData', JSON.stringify(updatedExpenseData));
    
    toast({
      title: "সফল",
      description: "ব্যয় তথ্য মুছে ফেলা হয়েছে",
    });
  };
  
  const handleEditVolunteer = (volunteer: Volunteer) => {
    setEditingVolunteer(volunteer);
    setVolunteerForm({
      name: volunteer.name,
      phone: volunteer.phone,
      contribution: volunteer.contribution.toString()
    });
  };
  
  const handleDeleteVolunteer = (id: number) => {
    const updatedVolunteers = localVolunteers.filter(volunteer => volunteer.id !== id);
    setLocalVolunteers(updatedVolunteers);
    localStorage.setItem('volunteers', JSON.stringify(updatedVolunteers));
    
    toast({
      title: "সফল",
      description: "ডোনেশন তথ্য মুছে ফেলা হয়েছে",
    });
  };

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking);
  };

  const handleDeleteBooking = (id: number, type: string) => {
    if (type === 'offline') {
      const updatedBookings = offlineBookings.filter(booking => booking.id !== id);
      setOfflineBookings(updatedBookings);
      localStorage.setItem('offlineBookings', JSON.stringify(updatedBookings));
    } else {
      const updatedBookings = onlineBookings.filter(booking => booking.id !== id);
      setOnlineBookings(updatedBookings);
      localStorage.setItem('onlineBookings', JSON.stringify(updatedBookings));
    }
    
    setLocalBookings([
      ...offlineBookings.filter(booking => booking.id !== id),
      ...onlineBookings.filter(booking => booking.id !== id)
    ]);
    
    toast({
      title: "সফল",
      description: "বুকিং তথ্য মুছে ফেলা হয়েছে",
    });
  };
  
  const totalVolunteerContributions = localVolunteers.reduce((sum, volunteer) => sum + volunteer.contribution, 0);
  
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
  
  return (
    <div className="container py-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>অ্যাডমিন ড্যাশবোর্ড</CardTitle>
          <CardDescription>আয় বেয় খরচের তথ্য এবং ডোনেশন তথ্য আপডেট করুন</CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
              
              <Button type="submit" className="w-full">
                {editingItem ? "আপডেট করুন" : "সংরক্ষণ করুন"}
              </Button>
              
              {editingItem && (
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setEditingItem(null);
                    setDonationForm({
                      name: '',
                      amount: '',
                      type: 'donation'
                    });
                  }}
                >
                  বাতিল করুন
                </Button>
              )}
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
              
              <Button type="submit" className="w-full">
                {editingVolunteer ? "আপডেট করুন" : "সংরক্ষণ করুন"}
              </Button>
              
              {editingVolunteer && (
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setEditingVolunteer(null);
                    setVolunteerForm({
                      name: '',
                      phone: '',
                      contribution: ''
                    });
                  }}
                >
                  বাতিল করুন
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="donations">
        <TabsList>
          <TabsTrigger value="donations">ডোনেশন তথ্য</TabsTrigger>
          <TabsTrigger value="income">আয়ের তালিকা</TabsTrigger>
          <TabsTrigger value="expenses">খরচের তালিকা</TabsTrigger>
          <TabsTrigger value="bookings">বুকিং তথ্য</TabsTrigger>
        </TabsList>
        
        <TabsContent value="donations" className="mt-4">
          <Card>
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
                    <TableHead className="text-right">পদক্ষেপ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localVolunteers.map(volunteer => (
                    <TableRow key={volunteer.id}>
                      <TableCell className="font-medium">{volunteer.name}</TableCell>
                      <TableCell>{volunteer.phone}</TableCell>
                      <TableCell className="text-right">{formatCurrency(volunteer.contribution)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditVolunteer(volunteer)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500"
                            onClick={() => handleDeleteVolunteer(volunteer.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>মোট</TableCell>
                    <TableCell className="text-right" colSpan={2}>{formatCurrency(totalVolunteerContributions)}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="income" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>আয়ের তালিকা</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>বিবরণ</TableHead>
                    <TableHead className="text-right">পরিমাণ</TableHead>
                    <TableHead className="text-right">পদক্ষেপ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomeData.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.value)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditIncome(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500"
                            onClick={() => handleDeleteIncome(item.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>মোট আয়</TableCell>
                    <TableCell className="text-right" colSpan={2}>
                      {formatCurrency(incomeData.reduce((sum, item) => sum + item.value, 0))}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expenses" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>খরচের তালিকা</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>বিবরণ</TableHead>
                    <TableHead className="text-right">পরিমাণ</TableHead>
                    <TableHead className="text-right">পদক্ষেপ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseData.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.value)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditExpense(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500"
                            onClick={() => handleDeleteExpense(item.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>মোট ব্যয়</TableCell>
                    <TableCell className="text-right" colSpan={2}>
                      {formatCurrency(expenseData.reduce((sum, item) => sum + item.value, 0))}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>বুকিং তথ্য</CardTitle>
              <CardDescription>অনলাইন ও অফলাইন বুকিংয়ের তালিকা</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>নাম</TableHead>
                    <TableHead>ফোন</TableHead>
                    <TableHead>ঠিকানা</TableHead>
                    <TableHead>পেমেন্ট</TableHead>
                    <TableHead>ধরণ</TableHead>
                    <TableHead className="text-right">পরিমাণ</TableHead>
                    <TableHead className="text-right">পদক্ষেপ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localBookings.map(booking => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.name}</TableCell>
                      <TableCell>{booking.phone}</TableCell>
                      <TableCell>{booking.address}</TableCell>
                      <TableCell>
                        <Badge variant={booking.isPaid ? "default" : "outline"}>
                          {booking.isPaid ? "পেমেন্ট সম্পন্ন" : "অপেক্ষমান"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={booking.paymentType === 'offline' ? "secondary" : "default"}>
                          {booking.paymentType === 'offline' ? "অফলাইন" : "অনলাইন"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(booking.amount)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500"
                          onClick={() => handleDeleteBooking(booking.id, booking.paymentType || 'online')}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5}>মোট</TableCell>
                    <TableCell className="text-right" colSpan={2}>
                      {formatCurrency(localBookings.reduce((sum, booking) => sum + booking.amount, 0))}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
