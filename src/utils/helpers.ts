
// Format currency
export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString()} Tk`;
};

// Format phone number
export const formatPhone = (phone: string): string => {
  if (!phone) return '';
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
};

// Calculate total contributions
export const calculateTotal = (items: { contribution?: number, amount?: number }[]): number => {
  return items.reduce((total, item) => {
    const value = item.contribution || item.amount || 0;
    return total + value;
  }, 0);
};

// Format date
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Generate random ID
export const generateId = (): number => {
  return Math.floor(Math.random() * 10000);
};

// Validate form data
export const validateForm = (data: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  Object.entries(data).forEach(([key, value]) => {
    if (!value && key !== 'contribution' && key !== 'amount') {
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    }
    
    if (key === 'phone' && value && !/^\d{11}$/.test(value)) {
      errors[key] = 'Phone number must be 11 digits';
    }
    
    if ((key === 'contribution' || key === 'amount') && value && isNaN(Number(value))) {
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} must be a number`;
    }
  });
  
  return errors;
};
