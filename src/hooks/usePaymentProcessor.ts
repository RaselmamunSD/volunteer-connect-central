
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface UserInfo {
  name?: string;
  phone?: string;
  address?: string;
}

interface PaymentProcessorResult {
  isProcessing: boolean;
  isSuccess: boolean;
  isError: boolean;
  handleSubmit: (phoneNumber: string, pin: string) => void;
  handleRetry: () => void;
  handleGoHome: () => void;
}

export const usePaymentProcessor = (userInfo: UserInfo = {}): PaymentProcessorResult => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // Fixed amount for payment
  const amount = 510;

  const handleSubmit = (phoneNumber: string, pin: string) => {
    // Start payment processing
    setIsProcessing(true);
    
    // Simulate API call to bKash
    setTimeout(() => {
      setIsProcessing(false);
      
      // 80% chance of success, 20% chance of failure
      if (Math.random() > 0.2) {
        setIsSuccess(true);
        toast({
          title: "পেমেন্ট সফল হয়েছে",
          description: "আপনার বুকিং নিশ্চিত করা হয়েছে।",
        });
        
        // Save booking info to local storage
        const bookingData = {
          name: userInfo.name || 'অতিথি',
          phone: phoneNumber,
          amount: amount,
          isPaid: true,
          timestamp: new Date().toISOString(),
        };
        
        // Save to localStorage for demo purposes
        try {
          const existingBookings = JSON.parse(localStorage.getItem('onlineBookings') || '[]');
          existingBookings.push(bookingData);
          localStorage.setItem('onlineBookings', JSON.stringify(existingBookings));
        } catch (err) {
          console.error('Error saving booking data:', err);
        }
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

  return {
    isProcessing,
    isSuccess,
    isError,
    handleSubmit,
    handleRetry,
    handleGoHome
  };
};
