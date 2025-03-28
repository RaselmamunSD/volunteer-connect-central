
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { volunteers, bookings } from '@/data/mockData';
import { calculateTotal, formatCurrency } from '@/utils/helpers';
import { CalendarDays, CreditCard, Users, Calendar } from 'lucide-react';

const Home = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const totalVolunteerContributions = calculateTotal(volunteers);
  const totalBookingAmount = calculateTotal(bookings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !address) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "Redirecting to payment page...",
    });
    
    // Reset form
    setName('');
    setPhone('');
    setAddress('');
  };

  return (
    <div className="container py-6">
      <div className="banner-gradient rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to EventConnect</h1>
        <p className="text-lg md:text-xl mb-4">Manage your events with ease and connect with volunteers</p>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="secondary">
            <Link to="/volunteer">Become a Volunteer</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/concert">View Concerts</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Collections</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalVolunteerContributions + totalBookingAmount)}</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Volunteer Donations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalVolunteerContributions)}</div>
            <p className="text-xs text-muted-foreground">{volunteers.length} volunteers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Booking Revenue</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBookingAmount)}</div>
            <p className="text-xs text-muted-foreground">{bookings.length} bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">View schedule</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Overview of recent volunteer contributions</CardDescription>
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
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link to="/volunteer">View All Volunteers</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Book Your Seat</CardTitle>
              <CardDescription>Reserve your spot for our upcoming events</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter your name" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="Enter your phone number" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="Enter your address" 
                  />
                </div>
                <Button type="submit" className="w-full">Submit to bKash Payment</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Latest seat bookings</CardDescription>
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
                      {booking.isPaid ? "Paid" : "Pending"}
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
    </div>
  );
};

export default Home;
