
import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 py-4">
      <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="font-bold text-2xl text-patent-600">PatentEase</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            <span>Help</span>
          </Button>
          
          <Button variant="outline">Login</Button>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
