
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
        <p className="text-lg md:text-xl mb-4">অফলাইন আসন বুকিং করতে লগইন করুন</p>
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
              <CardTitle>অফলাইন বুকিং করুন</CardTitle>
            </div>
            <CardDescription>
              পূর্নমিলনী অনুষ্ঠানে অফলাইন আসন বুকিং করতে লগইন করুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">স্বেচ্ছাসেবক হিসেবে লগইন করে অফলাইন বুকিং করতে নিচের বাটনে ক্লিক করুন</p>
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
              <CardTitle>অফলাইন বুকিং সম্পর্কে</CardTitle>
            </div>
            <CardDescription>
              অফলাইন বুকিং প্রক্রিয়া সম্পর্কে জানুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>অফলাইন আসন বুকিং এর জন্য ফর্ম পূরণ করুন</li>
              <li>বুকিং ফর্মে ব্যক্তির নাম, ফোন নম্বর, ঠিকানা, টাকার পরিমাণ এবং অন্যান্য তথ্য দিন</li>
              <li>ফর্ম জমা দিলে তা অফলাইন বুকিং তালিকায় যোগ হবে</li>
              <li>সব বুকিং সিস্টেমে সংরক্ষিত থাকবে</li>
              <li>বুকিং করার পর আপনি পরে তা দেখতে পারবেন</li>
            </ul>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">স্বেচ্ছাসেবক পোর্টালে শুধু অফলাইন বুকিং ফর্ম রয়েছে</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VolunteerPage;
