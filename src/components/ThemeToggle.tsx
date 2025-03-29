
import React from 'react';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return (savedTheme === 'dark' ? 'dark' : 'light') as 'light' | 'dark';
    }
    return 'light';
  });

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleTheme} 
      className={className}
    >
      {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="sr-only">
        {theme === 'light' ? 'ডার্ক মোড' : 'লাইট মোড'}
      </span>
    </Button>
  );
};

export default ThemeToggle;
