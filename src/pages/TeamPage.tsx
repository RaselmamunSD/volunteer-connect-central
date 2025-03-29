
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { teamMembers } from '@/data/mockData';
import { Phone, MapPin, UserSquare } from 'lucide-react';

const TeamPage = () => {
  return (
    <div className="container py-6">
      <div className="banner-gradient rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">আয়োজক কমিটি</h1>
        <p className="text-lg md:text-xl mb-4">হাড়ীভাঙ্গা তা'লিমুল ইনসান হাফিজিয়া ক্বওমী মাদ্রাসার আয়োজক কমিটি</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map(member => (
          <Card key={member.id} className="event-card">
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-2">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>
                  <UserSquare className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <CardTitle>{member.name}</CardTitle>
              <CardDescription>{member.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{member.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{member.address}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
