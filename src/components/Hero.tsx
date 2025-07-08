
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin } from 'lucide-react';

const Hero = () => {
  const [searchType, setSearchType] = useState('buy');
  const [location, setLocation] = useState('');

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Hero Text */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Find Your Dream Home
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Discover the perfect property that matches your lifestyle and budget
            </p>
          </div>

          {/* Search Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-3xl mx-auto">
            {/* Search Type Tabs */}
            <div className="flex space-x-1 mb-6 bg-slate-100 rounded-lg p-1">
              {['buy', 'rent'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSearchType(type)}
                  className={`flex-1 py-3 px-6 rounded-md font-medium text-sm transition-all duration-200 ${
                    searchType === type
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {type === 'buy' ? 'Buy' : 'Rent'}
                </button>
              ))}
            </div>

            {/* Search Form */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Location Input */}
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Enter city, neighborhood, or address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 py-3 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Property Type */}
                <Select>
                  <SelectTrigger className="w-full md:w-48 py-3 border-slate-300">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>

                {/* Price Range */}
                <Select>
                  <SelectTrigger className="w-full md:w-48 py-3 border-slate-300">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    <SelectItem value="0-300k">$0 - $300k</SelectItem>
                    <SelectItem value="300k-600k">$300k - $600k</SelectItem>
                    <SelectItem value="600k-1m">$600k - $1M</SelectItem>
                    <SelectItem value="1m+">$1M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <Button 
                size="lg" 
                className="w-full md:w-auto md:px-12 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Search className="h-5 w-5 mr-2" />
                Search Properties
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-white max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">10K+</div>
              <div className="text-sm text-white/80">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">5K+</div>
              <div className="text-sm text-white/80">Happy Clients</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-2xl md:text-3xl font-bold">50+</div>
              <div className="text-sm text-white/80">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
