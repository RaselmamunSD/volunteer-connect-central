
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCheck, PenLine } from 'lucide-react';

const VolunteerPage = () => {
  return (
    <div className="container py-6">
      <div className="banner-gradient rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">স্বেচ্ছাসেবক পোর্টাল</h1>
        <p className="text-lg md:text-xl mb-4">আপনার অবদান রাখুন পূর্নমিলনী অনুষ্ঠানে</p>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="secondary">
            <Link to="/volunteer/login">স্বেচ্ছাসেবক লগইন</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              <CardTitle>স্বেচ্ছাসেবক লগইন করুন</CardTitle>
            </div>
            <CardDescription>
              পূর্নমিলনী অনুষ্ঠানে স্বেচ্ছাসেবক হিসেবে আসন বুকিং করতে লগইন করুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">স্বেচ্ছাসেবক হিসেবে লগইন করতে নিচের বাটনে ক্লিক করুন</p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild size="lg">
              <Link to="/volunteer/login">লগইন করুন</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <PenLine className="h-5 w-5 text-primary" />
              <CardTitle>স্বেচ্ছাসেবকদের দায়িত্ব</CardTitle>
            </div>
            <CardDescription>
              স্বেচ্ছাসেবকরা নিম্নলিখিত কাজগুলো করবেন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>মেনুয়ালি আসন বুকিং করে দেওয়া</li>
              <li>অনুষ্ঠানের দিন অভ্যর্থনা ব্যবস্থায় সহায়তা করা</li>
              <li>অতিথিদের গাইড করা</li>
              <li>অনুষ্ঠানের জন্য প্রচার করা</li>
              <li>যোগাযোগ ব্যবস্থায় সহায়তা করা</li>
            </ul>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">লগইন করার পর আপনি আসন বুকিং করতে পারবেন</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VolunteerPage;
