
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { validateForm } from '@/utils/helpers';

interface BookingFormProps {
  onSubmit: (booking: any) => void;
  onTabChange: (tab: string) => void;
}

const BookingForm = ({ onSubmit, onTabChange }: BookingFormProps) => {
  const { toast } = useToast();
  
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    address: '',
    amount: '',
    formNumber: '',
    batchNumber: ''
  });
  
  const [bookingErrors, setBookingErrors] = useState<Record<string, string>>({});
  
  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (bookingErrors[name]) {
      setBookingErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(bookingForm);
    if (Object.keys(errors).length > 0) {
      setBookingErrors(errors);
      return;
    }
    
    // Create new booking object
    const newBooking = {
      id: Date.now(),
      name: bookingForm.name,
      phone: bookingForm.phone,
      address: bookingForm.address,
      amount: parseFloat(bookingForm.amount) || 0,
      formNumber: bookingForm.formNumber || '',
      batchNumber: bookingForm.batchNumber || '',
      isPaid: true, // Offline bookings are considered paid
      bookingDate: new Date().toISOString(),
      paymentType: 'offline'
    };
    
    onSubmit(newBooking);
    
    toast({
      title: "আসন বুকিং সফল হয়েছে",
      description: "আসন বুকিং করার জন্য আপনাকে ধন্যবাদ!",
    });
    
    // Reset form
    setBookingForm({
      name: '',
      phone: '',
      address: '',
      amount: '',
      formNumber: '',
      batchNumber: ''
    });
  };

  return (
    <form onSubmit={handleBookingSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="booking-name">নাম</Label>
        <Input 
          id="booking-name" 
          name="name"
          value={bookingForm.name} 
          onChange={handleBookingChange} 
          placeholder="আসন গ্রহণকারীর নাম লিখুন"
          className={bookingErrors.name ? "border-red-500" : ""}
        />
        {bookingErrors.name && <p className="text-sm text-red-500">{bookingErrors.name}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="booking-phone">ফোন নম্বর</Label>
        <Input 
          id="booking-phone" 
          name="phone"
          value={bookingForm.phone} 
          onChange={handleBookingChange} 
          placeholder="আসন গ্রহণকারীর ফোন নম্বর লিখুন"
          className={bookingErrors.phone ? "border-red-500" : ""}
        />
        {bookingErrors.phone && <p className="text-sm text-red-500">{bookingErrors.phone}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="booking-address">ঠিকানা</Label>
        <Input 
          id="booking-address" 
          name="address"
          value={bookingForm.address} 
          onChange={handleBookingChange} 
          placeholder="আসন গ্রহণকারীর ঠিকানা লিখুন"
          className={bookingErrors.address ? "border-red-500" : ""}
        />
        {bookingErrors.address && <p className="text-sm text-red-500">{bookingErrors.address}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="booking-amount">টাকার পরিমাণ</Label>
        <Input 
          id="booking-amount" 
          name="amount"
          type="number"
          value={bookingForm.amount} 
          onChange={handleBookingChange} 
          placeholder="টাকার পরিমাণ লিখুন"
          className={bookingErrors.amount ? "border-red-500" : ""}
        />
        {bookingErrors.amount && <p className="text-sm text-red-500">{bookingErrors.amount}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="booking-form">ফর্ম নং</Label>
        <Input 
          id="booking-form" 
          name="formNumber"
          value={bookingForm.formNumber} 
          onChange={handleBookingChange} 
          placeholder="ফর্ম নম্বর লিখুন"
          className={bookingErrors.formNumber ? "border-red-500" : ""}
        />
        {bookingErrors.formNumber && <p className="text-sm text-red-500">{bookingErrors.formNumber}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="booking-batch">ব্যাচ নং</Label>
        <Input 
          id="booking-batch" 
          name="batchNumber"
          value={bookingForm.batchNumber} 
          onChange={handleBookingChange} 
          placeholder="ব্যাচ নম্বর লিখুন"
          className={bookingErrors.batchNumber ? "border-red-500" : ""}
        />
        {bookingErrors.batchNumber && <p className="text-sm text-red-500">{bookingErrors.batchNumber}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button type="submit" className="w-full">অফলাইন বুকিং করুন</Button>
        <Button type="button" onClick={() => onTabChange('online')} variant="outline" className="w-full">অনলাইন বুকিং দেখুন</Button>
        <Button type="button" onClick={() => onTabChange('offlineInfo')} variant="outline" className="w-full">অফলাইন বুকিং এর তথ্য</Button>
      </div>
    </form>
  );
};

export default BookingForm;
