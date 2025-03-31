
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import PaymentForm from '@/components/payment/PaymentForm';
import PaymentProcessing from '@/components/payment/PaymentProcessing';
import PaymentSuccess from '@/components/payment/PaymentSuccess';
import PaymentError from '@/components/payment/PaymentError';
import { usePaymentProcessor } from '@/hooks/usePaymentProcessor';

const BkashPaymentPage = () => {
  const location = useLocation();
  
  // Get user info from location state if available
  const userInfo = location.state?.userInfo || {};
  
  // Fixed bKash merchant account number and amount as specified
  const bkashNumber = '01873558407';
  const amount = 510;
  
  const {
    isProcessing,
    isSuccess,
    isError,
    handleSubmit,
    handleRetry,
    handleGoHome
  } = usePaymentProcessor(userInfo);
  
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
        
        {isProcessing && <PaymentProcessing />}
        
        {isSuccess && <PaymentSuccess onGoHome={handleGoHome} />}
        
        {isError && <PaymentError onRetry={handleRetry} onGoHome={handleGoHome} />}
        
        {!isProcessing && !isSuccess && !isError && (
          <PaymentForm 
            bkashNumber={bkashNumber}
            amount={amount}
            onSubmit={handleSubmit}
          />
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
