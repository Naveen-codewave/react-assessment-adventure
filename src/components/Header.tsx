
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <header className="w-full py-6 px-4 sm:px-6 md:px-8 flex items-center justify-between animate-fade-in">
      <div className="flex items-center">
        {!isHomePage && (
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
        )}
        <div className="flex flex-col">
          <span className={cn(
            "text-xs font-medium text-muted-foreground tracking-wider uppercase",
            "animate-slide-down [animation-delay:0.1s]"
          )}>
            React Developer
          </span>
          <h1 className={cn(
            "text-2xl font-semibold tracking-tight",
            "animate-slide-down [animation-delay:0.2s]"
          )}>
            Assessment Template
          </h1>
        </div>
      </div>
      <div className="animate-slide-down [animation-delay:0.3s]">
        <Button variant="ghost" size="sm" className="text-sm font-medium">
          Help
        </Button>
      </div>
    </header>
  );
};

export default Header;
