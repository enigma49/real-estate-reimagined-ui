
export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: string[];
  description: string;
  propertyType: 'house' | 'apartment' | 'condo' | 'townhouse';
  listingType: 'sale' | 'rent';
  yearBuilt?: number;
  lotSize?: number;
  features: string[];
  contactInfo: {
    agent: string;
    phone: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  location: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  listingType?: 'sale' | 'rent';
}
