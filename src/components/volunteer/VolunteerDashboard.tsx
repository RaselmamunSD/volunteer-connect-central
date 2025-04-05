
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import BookingForm from './BookingForm';
import { useToast } from '@/hooks/use-toast';

interface VolunteerDashboardProps {
  onLogout: () => void;
}

const VolunteerDashboard = ({ onLogout }: VolunteerDashboardProps) => {
  const [offlineBookings, setOfflineBookings] = useState<any[]>([]);
  const { toast } = useToast();
  
  // Load bookings from localStorage on component mount
  useEffect(() => {
    try {
      const savedOfflineBookings = JSON.parse(localStorage.getItem('offlineBookings') || '[]');
      setOfflineBookings(savedOfflineBookings);
    } catch (err) {
      console.error('Error loading bookings from localStorage:', err);
      setOfflineBookings([]);
    }
  }, []);
  
  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('offlineBookings', JSON.stringify(offlineBookings));
  }, [offlineBookings]);
  
  const handleBookingSubmit = (booking: any) => {
    // Add the booking to the top of the list
    const updatedBookings = [booking, ...offlineBookings];
    setOfflineBookings(updatedBookings);
    
    // Store the updated list in localStorage so it's available to the home page
    localStorage.setItem('offlineBookings', JSON.stringify(updatedBookings));
    
    toast({
      title: "আসন বুকিং সফল হয়েছে",
      description: "আসন বুকিং করার জন্য আপনাকে ধন্যবাদ!",
    });
  };

  return (
    <div className="container py-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">স্বেচ্ছাসেবক ড্যাশবোর্ড</h1>
        <Button onClick={onLogout} variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          লগআউট করুন
        </Button>
      </header>
      
      <Card>
        <CardContent className="pt-6">
          <BookingForm onSubmit={handleBookingSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default VolunteerDashboard;
