
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { concerts } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/utils/helpers';
import { Music, Calendar, MapPin } from 'lucide-react';

const ConcertPage = () => {
  return (
    <div className="container py-6">
      <div className="banner-gradient rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Upcoming Concerts</h1>
        <p className="text-lg md:text-xl mb-4">Book your tickets for these exciting events</p>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="secondary">
            <Link to="/">Book Now</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {concerts.map(concert => (
          <Card key={concert.id} className="event-card">
            <CardHeader>
              <div className="mb-2">
                <Avatar className="w-full h-40 rounded-md">
                  <AvatarImage src={concert.image} alt={concert.title} className="object-cover" />
                  <AvatarFallback className="rounded-md">
                    <Music className="h-10 w-10 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{concert.title}</CardTitle>
              <div className="flex items-center justify-between">
                <Badge>{formatCurrency(concert.price)}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{formatDate(concert.date)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{concert.venue}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/">Book Tickets</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Concert Information</CardTitle>
          <CardDescription>Important details about our concerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Ticket Information</h3>
              <p className="text-sm text-muted-foreground">
                Tickets must be purchased in advance. All sales are final, no refunds or exchanges.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Venue Policies</h3>
              <p className="text-sm text-muted-foreground">
                Outside food and drinks are not allowed. Security checks will be conducted at entry.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">COVID-19 Guidelines</h3>
              <p className="text-sm text-muted-foreground">
                Masks are recommended. Please follow social distancing guidelines where possible.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button asChild variant="outline">
            <Link to="/">Contact for Group Bookings</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConcertPage;
