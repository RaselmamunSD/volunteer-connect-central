
import React, { useState } from 'react';
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface PaymentFormProps {
  bkashNumber: string;
  amount: number;
  onSubmit: (phoneNumber: string, pin: string) => void;
}

const PaymentForm = ({ bkashNumber, amount, onSubmit }: PaymentFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      setErrorMessage('দয়া করে বিকাশ নাম্বার লিখুন');
      return;
    }
    
    if (!pin) {
      setErrorMessage('দয়া করে পিন নাম্বার লিখুন');
      return;
    }
    
    // Reset error
    setErrorMessage('');
    
    // Call parent handler with form data
    onSubmit(phoneNumber, pin);
  };

  return (
    <CardContent>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">মার্চেন্ট</p>
            <p className="font-medium">পূর্নমিলনী-২০২৬</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">বিকাশ অ্যাকাউন্ট</p>
            <p className="font-medium">{bkashNumber}</p>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-between items-center">
          <p className="font-medium">মোট মূল্য</p>
          <p className="text-xl font-bold">{amount} টাকা</p>
        </div>
        
        <Separator className="my-4" />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">বিকাশ নাম্বার</Label>
          <Input 
            id="phone" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            placeholder="আপনার বিকাশ নাম্বার লিখুন" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pin">পিন নাম্বার</Label>
          <Input 
            id="pin"
            type="password"
            value={pin} 
            onChange={(e) => setPin(e.target.value)} 
            placeholder="আপনার পিন নাম্বার লিখুন" 
          />
        </div>
        
        {errorMessage && (
          <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
        )}
        
        <Button type="submit" className="w-full">পেমেন্ট করুন</Button>
      </form>
    </CardContent>
  );
};

export default PaymentForm;
