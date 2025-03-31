
import React from 'react';
import { CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const PaymentProcessing = () => {
  return (
    <CardContent className="flex flex-col items-center justify-center p-8">
      <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
      <p className="text-center font-medium text-lg">পেমেন্ট প্রসেস করা হচ্ছে...</p>
      <p className="text-center text-muted-foreground">দয়া করে অপেক্ষা করুন</p>
    </CardContent>
  );
};

export default PaymentProcessing;
