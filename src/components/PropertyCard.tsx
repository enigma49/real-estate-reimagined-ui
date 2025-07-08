
import { Property } from '@/types/property';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Bed, Bath, Square, MapPin } from 'lucide-react';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
}

const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number, listingType: string) => {
    if (listingType === 'rent') {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
      onClick={onClick}
    >
      <div className="relative">
        {/* Property Image */}
        <div className="relative h-64 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse" />
          )}
          <img
            src={property.images[0]}
            alt={property.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isLiked 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-slate-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3">
          <Badge 
            variant="secondary" 
            className="bg-white/90 text-slate-800 font-medium capitalize backdrop-blur-sm"
          >
            {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
          </Badge>
        </div>

        {/* Image Count */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 right-3">
            <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-sm">
              1 / {property.images.length}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-5">
        {/* Price */}
        <div className="mb-3">
          <span className="text-2xl font-bold text-slate-900">
            {formatPrice(property.price, property.listingType)}
          </span>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 mb-3 text-slate-600">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span className="text-sm font-medium">{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span className="text-sm font-medium">{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span className="text-sm font-medium">{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-slate-600 mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>

        {/* Features */}
        {property.features.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {property.features.slice(0, 2).map((feature, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs text-slate-600 border-slate-300"
              >
                {feature}
              </Badge>
            ))}
            {property.features.length > 2 && (
              <Badge variant="outline" className="text-xs text-slate-600 border-slate-300">
                +{property.features.length - 2} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
