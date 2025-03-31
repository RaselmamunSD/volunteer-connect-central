
import React from 'react';
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface PaymentSuccessProps {
  onGoHome: () => void;
}

const PaymentSuccess = ({ onGoHome }: PaymentSuccessProps) => {
  return (
    <CardContent className="flex flex-col items-center justify-center p-8">
      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
      <p className="text-center font-medium text-lg">পেমেন্ট সফল হয়েছে!</p>
      <p className="text-center text-muted-foreground">আপনার আসন বুকিং নিশ্চিত করা হয়েছে</p>
      <p className="text-center text-muted-foreground mt-4">আপনি স্বয়ংক্রিয়ভাবে হোম পেজে নেওয়া হবে...</p>
      <Button className="mt-6" onClick={onGoHome}>
        হোম পেজে যান
      </Button>
    </CardContent>
  );
};

export default PaymentSuccess;
