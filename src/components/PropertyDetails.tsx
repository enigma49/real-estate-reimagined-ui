
import { useState } from 'react';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Calendar, 
  Home, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  ChevronLeft, 
  ChevronRight,
  Car,
  Flame,
  Wifi,
  Dumbbell,
  Star
} from 'lucide-react';

interface PropertyDetailsProps {
  property: Property;
  onBack: () => void;
}

const PropertyDetails = ({ property, onBack }: PropertyDetailsProps) => {
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const formatPrice = (price: number, listingType: string) => {
    if (listingType === 'rent') {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Handle form submission here
  };

  const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes('garage') || lowerFeature.includes('parking')) return <Car className="h-4 w-4" />;
    if (lowerFeature.includes('fireplace')) return <Flame className="h-4 w-4" />;
    if (lowerFeature.includes('wifi') || lowerFeature.includes('internet')) return <Wifi className="h-4 w-4" />;
    if (lowerFeature.includes('gym') || lowerFeature.includes('fitness')) return <Dumbbell className="h-4 w-4" />;
    return <Home className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={onBack} className="text-slate-600">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({
                    title: "Link Copied",
                    description: "Property link copied to clipboard",
                  });
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  setIsLiked(!isLiked);
                  toast({
                    title: isLiked ? "Removed from Bookmarks" : "Added to Bookmarks",
                    description: isLiked 
                      ? "Property removed from your saved list" 
                      : "Property saved to your bookmarks",
                  });
                }}
                className={isLiked ? 'text-red-500' : 'text-slate-600'}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative h-96 md:h-[500px] bg-slate-900">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Property Type Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-blue-600 text-white font-medium">
            {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
          </Badge>
        </div>
      </div>

      {/* Property Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    {formatPrice(property.price, property.listingType)}
                  </div>
                  <h1 className="text-2xl font-semibold text-slate-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-1 text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span>{property.address}</span>
                  </div>
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-slate-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Bed className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="font-semibold text-slate-900">{property.bedrooms}</div>
                    <div className="text-sm text-slate-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Bath className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="font-semibold text-slate-900">{property.bathrooms}</div>
                    <div className="text-sm text-slate-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Square className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="font-semibold text-slate-900">{property.sqft.toLocaleString()}</div>
                    <div className="text-sm text-slate-600">Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Calendar className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="font-semibold text-slate-900">{property.yearBuilt || 'N/A'}</div>
                    <div className="text-sm text-slate-600">Year Built</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Description</h2>
                <p className="text-slate-700 leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-slate-700">
                      {getFeatureIcon(feature)}
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rating Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Rate This Property</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => {
                          setUserRating(star);
                          setIsRated(true);
                          toast({
                            title: "Rating Submitted",
                            description: `You rated this property ${star} star${star !== 1 ? 's' : ''}`,
                          });
                        }}
                        className={`p-1 transition-colors ${
                          star <= userRating 
                            ? 'text-yellow-500' 
                            : 'text-gray-300 hover:text-yellow-400'
                        }`}
                      >
                        <Star className={`h-6 w-6 ${star <= userRating ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                  {isRated && (
                    <span className="text-sm text-slate-600">
                      Thank you for your rating!
                    </span>
                  )}
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  Help others by rating this property (1-5 stars)
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Agent */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-semibold text-lg">
                      {property.contactInfo.agent.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900">{property.contactInfo.agent}</h3>
                  <p className="text-sm text-slate-600">Real Estate Agent</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{property.contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{property.contactInfo.email}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Agent
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Contact {property.contactInfo.agent}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            value={contactForm.message}
                            onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                            placeholder="I'm interested in this property..."
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                          Send Message
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Property Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Property Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Property Type:</span>
                    <span className="capitalize font-medium">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Listing Type:</span>
                    <span className="capitalize font-medium">{property.listingType}</span>
                  </div>
                  {property.lotSize && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Lot Size:</span>
                      <span className="font-medium">{property.lotSize.toLocaleString()} sqft</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-600">Listed:</span>
                    <span className="font-medium">{new Date(property.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
