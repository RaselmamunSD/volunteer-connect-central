
// Format currency for Bengali
export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString()} টাকা`;
};

// Format phone number
export const formatPhone = (phone: string): string => {
  if (!phone) return '';
  return phone;
};

// Calculate total contributions
export const calculateTotal = (items: { contribution?: number, amount?: number }[]): number => {
  return items.reduce((total, item) => {
    const value = item.contribution || item.amount || 0;
    return total + value;
  }, 0);
};

// Format date for Bengali (accepts string or Date object)
export const formatDate = (date: string | Date): string => {
  // Convert to Date object if string
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Bengali month names
  const bengaliMonths = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  
  // Format the date in Bengali style
  return `${dateObj.getDate()} ${bengaliMonths[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;
};

// Generate random ID
export const generateId = (): number => {
  return Math.floor(Math.random() * 10000);
};

// Validate form data with Bengali error messages
export const validateForm = (data: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  const fieldNames: Record<string, string> = {
    name: 'নাম',
    phone: 'ফোন নম্বর',
    address: 'ঠিকানা',
    contribution: 'অবদান',
    amount: 'পরিমাণ'
  };
  
  Object.entries(data).forEach(([key, value]) => {
    if (!value && key !== 'contribution' && key !== 'amount') {
      errors[key] = `${fieldNames[key] || key} প্রয়োজন`;
    }
    
    if (key === 'phone' && value && !/^\d{11}$/.test(value)) {
      errors[key] = 'ফোন নম্বর ১১ সংখ্যার হতে হবে';
    }
    
    if ((key === 'contribution' || key === 'amount') && value && isNaN(Number(value))) {
      errors[key] = `${fieldNames[key]} একটি সংখ্যা হতে হবে`;
    }
  });
  
  return errors;
};
