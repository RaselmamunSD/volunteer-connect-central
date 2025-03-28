
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, MusicIcon, UserCog, UserCheck } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { 
      name: 'Home', 
      path: '/', 
      icon: <Home className="mr-2 h-4 w-4" /> 
    },
    { 
      name: 'Volunteer', 
      path: '/volunteer', 
      icon: <UserCheck className="mr-2 h-4 w-4" /> 
    },
    { 
      name: 'Management Team', 
      path: '/team', 
      icon: <Users className="mr-2 h-4 w-4" /> 
    },
    { 
      name: 'Concert', 
      path: '/concert', 
      icon: <MusicIcon className="mr-2 h-4 w-4" /> 
    },
    { 
      name: 'Admin', 
      path: '/admin', 
      icon: <UserCog className="mr-2 h-4 w-4" /> 
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex font-bold text-2xl text-primary">
            <Link to="/" className="flex items-center gap-2">
              <span className="hidden md:inline-block">EventConnect</span>
            </Link>
          </div>
          <nav className="flex-1 flex items-center justify-between">
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  asChild
                  className={cn(
                    "text-sm font-medium transition-colors",
                    location.pathname === item.path 
                      ? "text-primary-foreground" 
                      : "text-foreground/60 hover:text-foreground"
                  )}
                >
                  <Link to={item.path} className="flex items-center">
                    {item.icon}
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>
            
            {/* Mobile navigation */}
            <div className="md:hidden w-full flex justify-between overflow-auto">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  asChild
                  size="sm"
                  className={cn(
                    "px-1",
                    location.pathname === item.path 
                      ? "text-primary-foreground" 
                      : "text-foreground/60 hover:text-foreground"
                  )}
                >
                  <Link to={item.path} className="flex flex-col items-center text-xs">
                    {item.icon}
                    <span className="mt-1">{item.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:h-16 items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with ❤️ by EventConnect Team &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
