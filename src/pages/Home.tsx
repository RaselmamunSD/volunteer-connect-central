import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { volunteers, bookings } from '@/data/mockData';
import { calculateTotal, formatCurrency } from '@/utils/helpers';
import { CalendarDays, CreditCard, Users, Calendar, UserCheck, PhoneCall, Bell, BarChart4 } from 'lucide-react';

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

const Home = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [formNumber, setFormNumber] = useState('');
  const [localVolunteers, setLocalVolunteers] = useState(volunteers);
  const [localOfflineBookings, setLocalOfflineBookings] = useState([]);
  const [localOnlineBookings, setLocalOnlineBookings] = useState([]);
  const [incomeData, setIncomeData] = useState(initialIncomeData);
  const [expenseData, setExpenseData] = useState(initialExpenseData);

  useEffect(() => {
    try {
      const savedVolunteers = JSON.parse(localStorage.getItem('volunteers') || JSON.stringify(volunteers));
      const savedOfflineBookings = JSON.parse(localStorage.getItem('offlineBookings') || '[]');
      const savedOnlineBookings = JSON.parse(localStorage.getItem('onlineBookings') || '[]');
      const savedIncomeData = JSON.parse(localStorage.getItem('incomeData') || JSON.stringify(initialIncomeData));
      const savedExpenseData = JSON.parse(localStorage.getItem('expenseData') || JSON.stringify(initialExpenseData));
      
      setLocalVolunteers(savedVolunteers);
      setLocalOfflineBookings(savedOfflineBookings);
      setLocalOnlineBookings(savedOnlineBookings);
      setIncomeData(savedIncomeData);
      setExpenseData(savedExpenseData);
    } catch (err) {
      console.error('Error loading data from localStorage:', err);
      setLocalVolunteers(volunteers);
      setLocalOfflineBookings([]);
      setLocalOnlineBookings([]);
      setIncomeData(initialIncomeData);
      setExpenseData(initialExpenseData);
    }
  }, []);

  const totalVolunteerContributions = localVolunteers.reduce((sum, volunteer) => sum + (volunteer.contribution || 0), 0);
  
  const offlineBookings = [...localOfflineBookings];
  const onlineBookings = [...localOnlineBookings];
  
  const offlineBookingTotal = offlineBookings.reduce((sum, booking) => sum + (booking.amount || 0), 0);
  const onlineBookingTotal = onlineBookings.reduce((sum, booking) => sum + (booking.amount || 0), 0);
  
  const totalIncome = incomeData.reduce((sum, item) => sum + item.value, 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + item.value, 0);

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
    
    navigate('/bkash-payment', {
      state: {
        userInfo: {
          name,
          phone,
          address,
          batchNumber,
          formNumber
        }
      }
    });
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
            <div className="text-2xl font-bold">{formatCurrency(totalIncome - totalExpense)}</div>
            <p className="text-xs text-muted-foreground">
              মোট আয়: {formatCurrency(totalIncome)}, মোট ব্যয়: {formatCurrency(totalExpense)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">ডোনেশন তথ্য</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalVolunteerContributions)}</div>
            <p className="text-xs text-muted-foreground">{localVolunteers.length} জন দাতা</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">অফলাইন বুকিং আয়</CardTitle>
            <PhoneCall className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(offlineBookingTotal)}</div>
            <p className="text-xs text-muted-foreground">{offlineBookings.length} বুকিং</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">অনলাইন বুকিং আয়</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(onlineBookingTotal)}
            </div>
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
                {localVolunteers.slice(0, 10).map(volunteer => (
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
                  <Label htmlFor="phone">��োন নম্বর</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="batchNumber">ব্যাচ নং</Label>
                  <Input 
                    id="batchNumber" 
                    value={batchNumber} 
                    onChange={(e) => setBatchNumber(e.target.value)} 
                    placeholder="ব্যাচ নম্বর লিখুন" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="formNumber">ফর্ম নং</Label>
                  <Input 
                    id="formNumber" 
                    value={formNumber} 
                    onChange={(e) => setFormNumber(e.target.value)} 
                    placeholder="ফর্ম নম্বর লিখুন" 
                  />
                </div>
                <Button type="submit" className="w-full">বিকাশ পেমেন্ট-এ যান</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>অফলাইন বুকিং তথ্য</CardTitle>
          <CardDescription>স্বেচ্ছাসেবকদের দ্বারা করা অফলাইন বুকিংয়ের তালিকা</CardDescription>
        </CardHeader>
        <CardContent>
          {offlineBookings.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>নাম</TableHead>
                    <TableHead>ফোন নম্বর</TableHead>
                    <TableHead>ঠিকানা</TableHead>
                    <TableHead>ব্যাচ নং</TableHead>
                    <TableHead>ফর্ম নং</TableHead>
                    <TableHead className="text-right">টাকার পরিমাণ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {offlineBookings.map((booking, index) => (
                    <TableRow key={booking.id || index}>
                      <TableCell className="font-medium">{booking.name || 'অজানা'}</TableCell>
                      <TableCell>{booking.phone || 'উল্লেখ নেই'}</TableCell>
                      <TableCell>{booking.address || 'উল্লেখ নেই'}</TableCell>
                      <TableCell>{booking.batchNumber || 'উল্লেখ নেই'}</TableCell>
                      <TableCell>{booking.formNumber || 'উল্লেখ নেই'}</TableCell>
                      <TableCell className="text-right">{formatCurrency(booking.amount || 0)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center py-8 text-muted-foreground">কোনো অফলাইন বুকিং তথ্য পাওয়া যায়নি</p>
          )}
        </CardContent>
      </Card>
      
      <Tabs defaultValue="online">
        <TabsList className="mb-4">
          <TabsTrigger value="online">অনলাইন বুকিং</TabsTrigger>
        </TabsList>
        
        <TabsContent value="online">
          <Card>
            <CardHeader>
              <CardTitle>অনলাইন বুকিং</CardTitle>
              <CardDescription>বিকাশ পেমেন্টের মাধ্যমে করা বুকিংয়ের তালিকা</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
