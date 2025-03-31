
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const BkashPaymentPage = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();
  
  // Fixed amount based on the requirement
  const amount = 510;
  
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
    
    // Start payment processing
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      
      // 80% chance of success, 20% chance of failure
      if (Math.random() > 0.2) {
        setIsSuccess(true);
        toast({
          title: "পেমেন্ট সফল হয়েছে",
          description: "আপনার বুকিং নিশ্চিত করা হয়েছে।",
        });
      } else {
        setIsError(true);
        toast({
          title: "পেমেন্ট ব্যর্থ হয়েছে",
          description: "দয়া করে আবার চেষ্টা করুন।",
          variant: "destructive",
        });
      }
    }, 2000);
  };
  
  const handleRetry = () => {
    setIsError(false);
    setPhoneNumber('');
    setPin('');
  };
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  useEffect(() => {
    if (isSuccess || isError) {
      // Auto redirect after 5 seconds
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isSuccess, isError, navigate]);
  
  return (
    <div className="container max-w-lg py-8">
      <Button variant="outline" asChild className="mb-4">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          হোম পেজে ফিরে যান
        </Link>
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://www.bkash.com/sites/all/themes/bkash/logo.png" 
              alt="বিকাশ লোগো" 
              className="h-12" 
            />
          </div>
          <CardTitle className="text-center">বিকাশ পেমেন্ট</CardTitle>
          <CardDescription className="text-center">বিকাশের মাধ্যমে পেমেন্ট করে আসন নিশ্চিত করুন</CardDescription>
        </CardHeader>
        
        {isProcessing && (
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
            <p className="text-center font-medium text-lg">পেমেন্ট প্রসেস করা হচ্ছে...</p>
            <p className="text-center text-muted-foreground">দয়া করে অপেক্ষা করুন</p>
          </CardContent>
        )}
        
        {isSuccess && (
          <CardContent className="flex flex-col items-center justify-center p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <p className="text-center font-medium text-lg">পেমেন্ট সফল হয়েছে!</p>
            <p className="text-center text-muted-foreground">আপনার আসন বুকিং নিশ্চিত করা হয়েছে</p>
            <p className="text-center text-muted-foreground mt-4">আপনি স্বয়ংক্রিয়ভাবে হোম পেজে নেওয়া হবে...</p>
            <Button className="mt-6" onClick={handleGoHome}>
              হোম পেজে যান
            </Button>
          </CardContent>
        )}
        
        {isError && (
          <CardContent className="flex flex-col items-center justify-center p-8">
            <AlertCircle className="h-16 w-16 text-destructive mb-4" />
            <p className="text-center font-medium text-lg">পেমেন্ট ব্যর্থ হয়েছে</p>
            <p className="text-center text-muted-foreground">দয়া করে আবার চেষ্টা করুন</p>
            <p className="text-center text-muted-foreground mt-4">আপনি স্বয়ংক্রিয়ভাবে হোম পেজে নেওয়া হবে...</p>
            <div className="flex gap-4 mt-6">
              <Button variant="outline" onClick={handleRetry}>
                আবার চেষ্টা করুন
              </Button>
              <Button onClick={handleGoHome}>
                হোম পেজে যান
              </Button>
            </div>
          </CardContent>
        )}
        
        {!isProcessing && !isSuccess && !isError && (
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">মার্চেন্ট</p>
                  <p className="font-medium">পূর্নমিলনী-২০২৬</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">বিকাশ অ্যাকাউন্ট</p>
                  <p className="font-medium">01873558407</p>
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
        )}
        
        <CardFooter className="text-center text-sm text-muted-foreground flex-col">
          <p>পেমেন্ট মূল্য: {amount} টাকা</p>
          <p>বিকাশ চার্জ প্রযোজ্য</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BkashPaymentPage;
