
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { teamMembers } from '@/data/mockData';
import { Phone, MapPin } from 'lucide-react';

const TeamPage = () => {
  return (
    <div className="container py-6">
      <div className="banner-gradient rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Management Team</h1>
        <p className="text-lg md:text-xl mb-4">Meet the dedicated professionals who make our events possible</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {teamMembers.map((member) => (
          <Card key={member.id} className="event-card">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-2">
                <AvatarImage src={member.photo} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle>{member.name}</CardTitle>
              <Badge variant="outline" className="mx-auto">
                {member.title}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{member.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{member.address}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="outline" size="sm">Contact</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>About Our Team</CardTitle>
          <CardDescription>Working together to create memorable events</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Our management team brings together years of experience in event planning, volunteer coordination, 
            and community engagement. Each member of our team is committed to creating impactful events that 
            bring people together for common causes.
          </p>
          <p>
            We believe in the power of community and work tirelessly to ensure that our events are inclusive, 
            accessible, and memorable for all participants. From planning to execution, our team handles every 
            aspect of event management with professionalism and dedication.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamPage;
