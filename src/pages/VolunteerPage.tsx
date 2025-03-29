
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCheck } from 'lucide-react';

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
      
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            <CardTitle>স্বেচ্ছাসেবক হিসাবে যোগদান করুন</CardTitle>
          </div>
          <CardDescription>
            পূর্নমিলনী অনুষ্ঠানে আপনার অবদান রাখতে স্বেচ্ছাসেবক হিসেবে নিবন্ধন করুন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">স্বেচ্ছাসেবক হিসেবে রেজিস্ট্রেশন করতে নিচের বাটনে ক্লিক করুন</p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button asChild size="lg">
            <Link to="/volunteer/login">রেজিস্ট্রেশন করুন</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VolunteerPage;
