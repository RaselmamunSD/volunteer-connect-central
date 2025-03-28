
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { volunteers } from '@/data/mockData';
import { formatCurrency } from '@/utils/helpers';
import { UserCheck, Heart, Calendar, Award } from 'lucide-react';

const VolunteerPage = () => {
  return (
    <div className="container py-6">
      <div className="banner-gradient rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Join Our Volunteer Team</h1>
        <p className="text-lg md:text-xl mb-4">Make a difference by contributing your time and skills</p>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="secondary">
            <Link to="/volunteer/login">Volunteer Login</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="event-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              <CardTitle>Register</CardTitle>
            </div>
            <CardDescription>
              Sign up to become a volunteer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Join our team of dedicated volunteers and help make our events successful. Your contribution matters!</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/volunteer/login">Register Now</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="event-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <CardTitle>Contribute</CardTitle>
            </div>
            <CardDescription>
              Make donations to support our cause
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Financial contributions help us organize better events and reach more people in need.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/volunteer/login">Donate Now</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="event-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle>Participate</CardTitle>
            </div>
            <CardDescription>
              Join upcoming volunteer events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Check our event calendar and sign up for volunteer opportunities that match your interests.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/concert">View Events</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <CardTitle>Our Volunteer Stars</CardTitle>
            </div>
            <CardDescription>
              Recognizing the amazing contributions of our volunteers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {volunteers.map(volunteer => (
                <Card key={volunteer.id} className="event-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{volunteer.name}</CardTitle>
                    <CardDescription>{volunteer.phone}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">{volunteer.address}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p className="text-sm">Contribution</p>
                    <Badge>{formatCurrency(volunteer.contribution)}</Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Volunteer Benefits</CardTitle>
            <CardDescription>Why you should join our volunteer program</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Community Impact</h3>
                <p className="text-sm text-muted-foreground">Make a real difference in your community through meaningful service.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Skill Development</h3>
                <p className="text-sm text-muted-foreground">Learn new skills and gain valuable experience for your career.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Networking</h3>
                <p className="text-sm text-muted-foreground">Connect with like-minded individuals and expand your professional network.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VolunteerPage;
