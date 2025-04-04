
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingForm from './BookingForm';
import BookingList from './BookingList';

interface VolunteerDashboardProps {
  onLogout: () => void;
}

const VolunteerDashboard = ({ onLogout }: VolunteerDashboardProps) => {
  const [activeTab, setActiveTab] = useState('offline');
  const [localBookings, setLocalBookings] = useState<any[]>([]);
  const [onlineBookings, setOnlineBookings] = useState<any[]>([]);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedOfflineBookings = JSON.parse(localStorage.getItem('offlineBookings') || '[]');
      const savedOnlineBookings = JSON.parse(localStorage.getItem('onlineBookings') || '[]');
      setLocalBookings(savedOfflineBookings);
      setOnlineBookings(savedOnlineBookings);
    } catch (err) {
      console.error('Error loading data from localStorage:', err);
      setLocalBookings([]);
      setOnlineBookings([]);
    }
  }, []);
  
  const handleBookingSubmit = (newBooking: any) => {
    // Update local state
    const updatedBookings = [...localBookings, newBooking];
    setLocalBookings(updatedBookings);
    
    // Save to localStorage
    localStorage.setItem('offlineBookings', JSON.stringify(updatedBookings));
  };

  return (
    <div className="container py-6">
      <Card>
        <CardHeader>
          <CardTitle>স্বেচ্ছাসেবক পোর্টাল</CardTitle>
          <CardDescription>স্বেচ্ছাসেবক হিসেবে অন্যদের জন্য আসন বুক করুন</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="offline">অফলাইন বুকিং</TabsTrigger>
              <TabsTrigger value="online">অনলাইন বুকিং</TabsTrigger>
              <TabsTrigger value="offlineInfo">অফলাইন বুকিং এর তথ্য</TabsTrigger>
            </TabsList>
            
            <TabsContent value="offline">
              <BookingForm 
                onSubmit={handleBookingSubmit} 
                onTabChange={setActiveTab}
              />
            </TabsContent>
            
            <TabsContent value="online">
              <BookingList 
                bookings={onlineBookings}
                title="অনলাইন বুকিংয়ের তালিকা"
                emptyMessage="কোনো অনলাইন বুকিং তথ্য পাওয়া যায়নি"
                onBack={() => setActiveTab('offline')}
                onViewOther={() => setActiveTab('offlineInfo')}
                backText="অফলাইন বুকিং ফর্মে ফিরে যান"
                viewOtherText="অফলাইন বুকিং এর তথ্য দেখুন"
              />
            </TabsContent>
            
            <TabsContent value="offlineInfo">
              <BookingList 
                bookings={localBookings}
                title="অফলাইন বুকিংয়ের তালিকা"
                emptyMessage="কোনো অফলাইন বুকিং তথ্য পাওয়া যায়নি"
                onBack={() => setActiveTab('offline')}
                onViewOther={() => setActiveTab('online')}
                backText="অফলাইন বুকিং ফর্মে ফিরে যান"
                viewOtherText="অনলাইন বুকিং দেখুন"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onLogout}>লগআউট</Button>
          <p className="text-sm text-muted-foreground">সর্বশেষ আপডেটঃ {new Date().toLocaleDateString('bn-BD')}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VolunteerDashboard;
