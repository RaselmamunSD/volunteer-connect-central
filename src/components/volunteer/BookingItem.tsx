
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/helpers';

interface BookingItemProps {
  booking: any;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  return (
    <div className="border rounded-lg p-4">
      <dl className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <dt className="font-medium">নাম:</dt>
            <dd>{booking.name || 'অজানা'}</dd>
          </div>
          <Badge variant={booking.isPaid ? "default" : "outline"}>
            {booking.isPaid ? "পেমেন্ট সম্পন্ন" : "অপেক্ষমান"}
          </Badge>
        </div>
        
        <div>
          <dt className="font-medium">ফোন নাম্বার:</dt>
          <dd>{booking.phone || 'উল্লেখ নেই'}</dd>
        </div>
        
        <div>
          <dt className="font-medium">ঠিকানা:</dt>
          <dd>{booking.address || 'উল্লেখ নেই'}</dd>
        </div>
        
        {booking.batchNumber && (
          <div>
            <dt className="font-medium">ব্যাচ নং:</dt>
            <dd>{booking.batchNumber}</dd>
          </div>
        )}
        
        {booking.formNumber && (
          <div>
            <dt className="font-medium">ফর্ম নং:</dt>
            <dd>{booking.formNumber}</dd>
          </div>
        )}
        
        <div className="pt-2 border-t mt-2">
          <p className="font-medium text-right">মূল্য: {formatCurrency(booking.amount || 0)}</p>
        </div>
      </dl>
    </div>
  );
};

export default BookingItem;
