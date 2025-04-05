
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Menu } from 'lucide-react';
import BookingForm from './BookingForm';
import BookingList from './BookingList';

interface VolunteerDashboardProps {
  onLogout: () => void;
}

const VolunteerDashboard = ({ onLogout }: VolunteerDashboardProps) => {
  const [activeTab, setActiveTab] = useState('addBooking');
  const [offlineBookings, setOfflineBookings] = useState<any[]>([]);
  
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
    setOfflineBookings(prev => [booking, ...prev]);
    setActiveTab('offlineList');
  };
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="container py-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">স্বেচ্ছাসেবক ড্যাশবোর্ড</h1>
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>স্বেচ্ছাসেবক মেনু</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-2">
                <Button 
                  onClick={() => setActiveTab('addBooking')} 
                  variant={activeTab === 'addBooking' ? 'default' : 'outline'} 
                  className="w-full justify-start"
                >
                  অফলাইন বুকিং করুন
                </Button>
                <Button 
                  onClick={() => setActiveTab('offlineList')} 
                  variant={activeTab === 'offlineList' ? 'default' : 'outline'} 
                  className="w-full justify-start"
                >
                  অফলাইন বুকিং এর তালিকা
                </Button>
                <Button 
                  onClick={onLogout} 
                  variant="outline" 
                  className="w-full justify-start mt-4"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  লগআউট করুন
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <Button onClick={onLogout} variant="outline" className="hidden md:flex">
            <LogOut className="mr-2 h-4 w-4" />
            লগআউট করুন
          </Button>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3 hidden md:block">
          <Card>
            <CardHeader>
              <CardTitle>মেনু</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                onClick={() => setActiveTab('addBooking')} 
                variant={activeTab === 'addBooking' ? 'default' : 'outline'} 
                className="w-full justify-start"
              >
                অফলাইন বুকিং করুন
              </Button>
              <Button 
                onClick={() => setActiveTab('offlineList')} 
                variant={activeTab === 'offlineList' ? 'default' : 'outline'} 
                className="w-full justify-start"
              >
                অফলাইন বুকিং এর তালিকা
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-9">
          <Card>
            <CardContent className="pt-6">
              {activeTab === 'addBooking' && (
                <BookingForm 
                  onSubmit={handleBookingSubmit} 
                  onTabChange={handleTabChange} 
                />
              )}
              
              {activeTab === 'offlineList' && (
                <BookingList 
                  bookings={offlineBookings}
                  title="অফলাইন বুকিং এর তালিকা"
                  emptyMessage="কোনো অফলাইন বুকিং এখনো করা হয়নি"
                  onBack={() => handleTabChange('addBooking')}
                  onViewOther={() => handleTabChange('addBooking')}
                  backText="ফিরে যান"
                  viewOtherText="নতুন বুকিং করুন"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
