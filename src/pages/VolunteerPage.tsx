
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
        <h1 className="text-3xl md:text-4xl font-bold mb-2">স্বেচ্ছাসেবক রেজিস্ট্রেশন</h1>
        <p className="text-lg md:text-xl mb-4">আপনার অবদান রাখুন পূর্নমিলনী অনুষ্ঠানে</p>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="secondary">
            <Link to="/volunteer/login">স্বেচ্ছাসেবক লগইন</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="event-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              <CardTitle>রেজিস্ট্রেশন</CardTitle>
            </div>
            <CardDescription>
              স্বেচ্ছাসেবক হিসেবে নিবন্ধন করুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>আমাদের স্বেচ্ছাসেবক দলে যোগ দিন এবং পূর্নমিলনী অনুষ্ঠানকে সফল করতে সহায়তা করুন। আপনার অবদান গুরুত্বপূর্ণ!</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/volunteer/login">রেজিস্ট্রেশন করুন</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="event-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <CardTitle>অনুদান</CardTitle>
            </div>
            <CardDescription>
              আমাদের উদ্যোগকে সমর্থন করতে অনুদান দিন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>আর্থিক অবদান আমাদের বৃহত্তর আকারে অনুষ্ঠান আয়োজন করতে এবং আরও বেশি মানুষকে সম্পৃক্ত করতে সাহায্য করে।</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/volunteer/login">অনুদান দিন</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="event-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle>অংশগ্রহণ</CardTitle>
            </div>
            <CardDescription>
              আসন্ন পূর্নমিলনী অনুষ্ঠানে যোগ দিন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>পূর্নমিলনী অনুষ্ঠানের ক্যালেন্ডার দেখুন এবং আপনার আগ্রহের সাথে মিলে যায় এমন স্বেচ্ছাসেবক সুযোগের জন্য সাইন আপ করুন।</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/concert">অনুষ্ঠান দেখুন</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <CardTitle>আমাদের স্বেচ্ছাসেবকগণ</CardTitle>
            </div>
            <CardDescription>
              স্বেচ্ছাসেবকদের অসাধারণ অবদানের স্বীকৃতি
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
                    <p className="text-sm">অবদান</p>
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
            <CardTitle>স্বেচ্ছাসেবকদের সুবিধা</CardTitle>
            <CardDescription>কেন আপনি আমাদের স্বেচ্ছাসেবক প্রোগ্রামে যোগ দেবেন</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">সামাজিক প্রভাব</h3>
                <p className="text-sm text-muted-foreground">আপনার সম্প্রদায়ে অর্থপূর্ণ সেবার মাধ্যমে একটি বাস্তব পার্থক্য তৈরি করুন।</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">দক্ষতা উন্নয়ন</h3>
                <p className="text-sm text-muted-foreground">নতুন দক্ষতা শিখুন এবং আপনার কর্মজীবনের জন্য মূল্যবান অভিজ্ঞতা অর্জন করুন।</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">নেটওয়ার্কিং</h3>
                <p className="text-sm text-muted-foreground">একই মনোভাবাপন্ন ব্যক্তিদের সাথে সংযোগ করুন এবং আপনার পেশাদার নেটওয়ার্ক সম্প্রসারিত করুন।</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VolunteerPage;
