
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { volunteers, bookings, concerts, teamMembers } from '@/data/mockData';
import { calculateTotal, formatCurrency } from '@/utils/helpers';
import { UserCheck, CalendarDays, Music, Users, Coins } from 'lucide-react';

const AdminPage = () => {
  const totalVolunteerContributions = calculateTotal(volunteers);
  const totalBookingAmount = calculateTotal(bookings);
  
  return (
    <div className="container py-6">
      <div className="banner-gradient rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-lg md:text-xl mb-4">Manage your events, volunteers, and bookings</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Volunteers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volunteers.length}</div>
            <p className="text-xs text-muted-foreground">Registered volunteers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
            <p className="text-xs text-muted-foreground">Active bookings</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Concerts</CardTitle>
            <Music className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{concerts.length}</div>
            <p className="text-xs text-muted-foreground">Upcoming events</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalVolunteerContributions + totalBookingAmount)}</div>
            <p className="text-xs text-muted-foreground">All collections</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="volunteers" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="concerts">Concerts</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        
        <TabsContent value="volunteers">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Volunteer Management</CardTitle>
                  <CardDescription>View and manage volunteer data</CardDescription>
                </div>
                <Button size="sm">Add Volunteer</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted">
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Phone</th>
                      <th className="px-4 py-2">Address</th>
                      <th className="px-4 py-2">Contribution</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volunteers.map(volunteer => (
                      <tr key={volunteer.id} className="border-b">
                        <td className="px-4 py-3">{volunteer.id}</td>
                        <td className="px-4 py-3">{volunteer.name}</td>
                        <td className="px-4 py-3">{volunteer.phone}</td>
                        <td className="px-4 py-3">{volunteer.address}</td>
                        <td className="px-4 py-3">{formatCurrency(volunteer.contribution)}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-semibold">
                      <td colSpan={4} className="px-4 py-3 text-right">Total:</td>
                      <td className="px-4 py-3">{formatCurrency(totalVolunteerContributions)}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Booking Management</CardTitle>
                  <CardDescription>View and manage booking data</CardDescription>
                </div>
                <Button size="sm">Add Booking</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted">
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Phone</th>
                      <th className="px-4 py-2">Address</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking.id} className="border-b">
                        <td className="px-4 py-3">{booking.id}</td>
                        <td className="px-4 py-3">{booking.name}</td>
                        <td className="px-4 py-3">{booking.phone}</td>
                        <td className="px-4 py-3">{booking.address}</td>
                        <td className="px-4 py-3">{formatCurrency(booking.amount)}</td>
                        <td className="px-4 py-3">{booking.date}</td>
                        <td className="px-4 py-3">
                          <Badge variant={booking.isPaid ? "default" : "outline"}>
                            {booking.isPaid ? "Paid" : "Pending"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-semibold">
                      <td colSpan={4} className="px-4 py-3 text-right">Total:</td>
                      <td className="px-4 py-3">{formatCurrency(totalBookingAmount)}</td>
                      <td colSpan={3}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="concerts">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Concert Management</CardTitle>
                  <CardDescription>View and manage concert data</CardDescription>
                </div>
                <Button size="sm">Add Concert</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted">
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Title</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Venue</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {concerts.map(concert => (
                      <tr key={concert.id} className="border-b">
                        <td className="px-4 py-3">{concert.id}</td>
                        <td className="px-4 py-3">{concert.title}</td>
                        <td className="px-4 py-3">{concert.date}</td>
                        <td className="px-4 py-3">{concert.venue}</td>
                        <td className="px-4 py-3">{formatCurrency(concert.price)}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Management</CardTitle>
                  <CardDescription>View and manage team members</CardDescription>
                </div>
                <Button size="sm">Add Team Member</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted">
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Title</th>
                      <th className="px-4 py-2">Phone</th>
                      <th className="px-4 py-2">Address</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map(member => (
                      <tr key={member.id} className="border-b">
                        <td className="px-4 py-3">{member.id}</td>
                        <td className="px-4 py-3">{member.name}</td>
                        <td className="px-4 py-3">{member.title}</td>
                        <td className="px-4 py-3">{member.phone}</td>
                        <td className="px-4 py-3">{member.address}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
