
import React, { useState } from 'react';
import LoginForm from '@/components/volunteer/LoginForm';
import VolunteerDashboard from '@/components/volunteer/VolunteerDashboard';

const VolunteerLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  if (isLoggedIn) {
    return <VolunteerDashboard onLogout={handleLogout} />;
  }
  
  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default VolunteerLogin;
