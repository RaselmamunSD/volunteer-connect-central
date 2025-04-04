
import React from 'react';
import { Button } from '@/components/ui/button';
import BookingItem from './BookingItem';

interface BookingListProps {
  bookings: any[];
  title: string;
  emptyMessage: string;
  onBack: () => void;
  onViewOther: () => void;
  backText: string;
  viewOtherText: string;
}

const BookingList = ({ 
  bookings, 
  title, 
  emptyMessage, 
  onBack, 
  onViewOther, 
  backText, 
  viewOtherText 
}: BookingListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <BookingItem key={booking.id || index} booking={booking} />
        ))
      ) : (
        <p className="text-center py-8 text-muted-foreground">{emptyMessage}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button onClick={onBack} variant="outline" className="w-full">
          {backText}
        </Button>
        <Button onClick={onViewOther} variant="outline" className="w-full">
          {viewOtherText}
        </Button>
      </div>
    </div>
  );
};

export default BookingList;
