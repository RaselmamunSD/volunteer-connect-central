
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { teamMembers } from '@/data/mockData';
import { Phone, MapPin, UserSquare, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const TeamPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group by titles for better organization
  const groupedByTitle = filteredMembers.reduce((acc, member) => {
    if (!acc[member.title]) {
      acc[member.title] = [];
    }
    acc[member.title].push(member);
    return acc;
  }, {} as Record<string, typeof teamMembers>);

  // Leadership positions to show at the top
  const leadershipTitles = [
    'প্রধান শিক্ষক', 
    'সহকারী প্রধান শিক্ষক', 
    'কমিটি সভাপতি', 
    'সাধারণ সম্পাদক',
    'অর্থ সম্পাদক'
  ];
  
  // Sort titles to put leadership first
  const sortedTitles = Object.keys(groupedByTitle).sort((a, b) => {
    const aIndex = leadershipTitles.indexOf(a);
    const bIndex = leadershipTitles.indexOf(b);
    
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="container py-6">
      <div className="bg-gradient-event rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">আয়োজক কমিটি</h1>
        <p className="text-lg md:text-xl mb-4">হাড়ীভাঙ্গা তা'লিমুল ইনসান হাফিজিয়া ক্বওমী মাদ্রাসার আয়োজক কমিটি</p>
        
        <div className="relative max-w-md mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
          <Input
            type="text"
            placeholder="নাম, পদবী বা ঠিকানা দিয়ে খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">পদাধিকারীবৃন্দ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {leadershipTitles.map(title => 
            groupedByTitle[title]?.map(member => (
              <MemberCard key={member.id} member={member} isLeadership={true} />
            ))
          )}
        </div>
      </div>
      
      {sortedTitles
        .filter(title => !leadershipTitles.includes(title))
        .map(title => (
          <div key={title} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {groupedByTitle[title].map(member => (
                <MemberCard key={member.id} member={member} isLeadership={false} />
              ))}
            </div>
          </div>
        ))
      }
    </div>
  );
};

interface MemberCardProps {
  member: typeof teamMembers[0];
  isLeadership: boolean;
}

const MemberCard = ({ member, isLeadership }: MemberCardProps) => {
  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${isLeadership ? 'border-primary/50 bg-primary/5' : 'hover:border-primary/30'}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <Avatar className={`w-16 h-16 rounded-full ring-2 ${isLeadership ? 'ring-primary' : 'ring-muted'}`}>
            <AvatarImage src={member.image} alt={member.name} className="object-cover" />
            <AvatarFallback className="bg-muted">
              <UserSquare className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{member.name}</CardTitle>
            <Badge variant={isLeadership ? "default" : "outline"} className="mt-1">
              {member.title}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-primary" />
          <span>{member.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{member.address}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamPage;
