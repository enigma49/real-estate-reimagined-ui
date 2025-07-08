
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X, Home } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const NavLinks = () => (
    <>
      <Button variant="ghost" className="text-slate-700 hover:text-slate-900">
        Buy
      </Button>
      <Button variant="ghost" className="text-slate-700 hover:text-slate-900">
        Rent
      </Button>
      <Button variant="ghost" className="text-slate-700 hover:text-slate-900">
        Sell
      </Button>
      <Button variant="ghost" className="text-slate-700 hover:text-slate-900">
        Find Agent
      </Button>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">RealtyHub</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLinks />
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by city, neighborhood, or address"
                className={`pl-10 pr-4 py-2 w-full border-slate-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 ${
                  isSearchFocused ? 'shadow-lg' : ''
                }`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              className="text-slate-700 hover:text-slate-900"
              onClick={() => window.location.href = '/login'}
            >
              Log in
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.location.href = '/signup'}
            >
              Sign up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search properties..."
                      className="pl-10 pr-4 py-2 w-full"
                    />
                  </div>
                  
                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-2">
                    <NavLinks />
                  </div>
                  
                  {/* Mobile Auth */}
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Button 
                      variant="ghost" 
                      className="justify-start"
                      onClick={() => window.location.href = '/login'}
                    >
                      Log in
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white justify-start"
                      onClick={() => window.location.href = '/signup'}
                    >
                      Sign up
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
