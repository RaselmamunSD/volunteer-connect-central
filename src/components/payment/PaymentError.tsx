
import React from 'react';
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface PaymentErrorProps {
  onRetry: () => void;
  onGoHome: () => void;
}

const PaymentError = ({ onRetry, onGoHome }: PaymentErrorProps) => {
  return (
    <CardContent className="flex flex-col items-center justify-center p-8">
      <AlertCircle className="h-16 w-16 text-destructive mb-4" />
      <p className="text-center font-medium text-lg">পেমেন্ট ব্যর্থ হয়েছে</p>
      <p className="text-center text-muted-foreground">দয়া করে আবার চেষ্টা করুন</p>
      <p className="text-center text-muted-foreground mt-4">আপনি স্বয়ংক্রিয়ভাবে হোম পেজে নেওয়া হবে...</p>
      <div className="flex gap-4 mt-6">
        <Button variant="outline" onClick={onRetry}>
          আবার চেষ্টা করুন
        </Button>
        <Button onClick={onGoHome}>
          হোম পেজে যান
        </Button>
      </div>
    </CardContent>
  );
};

export default PaymentError;
