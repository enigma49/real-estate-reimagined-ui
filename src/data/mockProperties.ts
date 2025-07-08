
import { Property } from '@/types/property';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    price: 750000,
    location: 'Downtown, Seattle',
    address: '123 Pike Street, Seattle, WA 98101',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    images: [
      'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop'
    ],
    description: 'Stunning modern apartment in the heart of downtown Seattle. Features floor-to-ceiling windows, hardwood floors, and premium finishes throughout.',
    propertyType: 'apartment',
    listingType: 'sale',
    yearBuilt: 2018,
    features: ['Hardwood Floors', 'City Views', 'In-Unit Laundry', 'Gym Access', 'Rooftop Deck'],
    contactInfo: {
      agent: 'Sarah Johnson',
      phone: '(206) 555-0123',
      email: 'sarah.johnson@realty.com'
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Charming Suburban House',
    price: 950000,
    location: 'Bellevue, WA',
    address: '456 Maple Avenue, Bellevue, WA 98004',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
    ],
    description: 'Beautiful family home in prestigious Bellevue neighborhood. Large backyard, updated kitchen, and excellent school district.',
    propertyType: 'house',
    listingType: 'sale',
    yearBuilt: 2005,
    lotSize: 8000,
    features: ['Large Backyard', 'Updated Kitchen', 'Garage', 'Fireplace', 'Walk-in Closets'],
    contactInfo: {
      agent: 'Michael Chen',
      phone: '(425) 555-0456',
      email: 'michael.chen@realty.com'
    },
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16'
  },
  {
    id: '3',
    title: 'Luxury Waterfront Condo',
    price: 1200000,
    location: 'Capitol Hill, Seattle',
    address: '789 Waterfront Way, Seattle, WA 98102',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    description: 'Luxurious waterfront condo with panoramic views of Puget Sound. Premium amenities and prime location in trendy Capitol Hill.',
    propertyType: 'condo',
    listingType: 'sale',
    yearBuilt: 2020,
    features: ['Water Views', 'Concierge', 'Roof Deck', 'Wine Storage', 'Smart Home Tech'],
    contactInfo: {
      agent: 'Emily Rodriguez',
      phone: '(206) 555-0789',
      email: 'emily.rodriguez@realty.com'
    },
    createdAt: '2024-01-17',
    updatedAt: '2024-01-17'
  },
  {
    id: '4',
    title: 'Cozy Rental Apartment',
    price: 2500,
    location: 'Fremont, Seattle',
    address: '321 Aurora Avenue, Seattle, WA 98103',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 800,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ],
    description: 'Charming studio apartment in vibrant Fremont neighborhood. Perfect for young professionals, close to cafes and shops.',
    propertyType: 'apartment',
    listingType: 'rent',
    yearBuilt: 2010,
    features: ['Pet Friendly', 'Close to Transit', 'Exposed Brick', 'High Ceilings'],
    contactInfo: {
      agent: 'David Park',
      phone: '(206) 555-0321',
      email: 'david.park@realty.com'
    },
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  },
  {
    id: '5',
    title: 'Executive Townhouse',
    price: 850000,
    location: 'Redmond, WA',
    address: '654 Tech Boulevard, Redmond, WA 98052',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2200,
    images: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
    ],
    description: 'Modern townhouse in tech corridor. Perfect for professionals working in the area, with easy access to major employers.',
    propertyType: 'townhouse',
    listingType: 'sale',
    yearBuilt: 2015,
    features: ['Attached Garage', 'Patio', 'Open Floor Plan', 'Modern Appliances'],
    contactInfo: {
      agent: 'Jennifer Liu',
      phone: '(425) 555-0654',
      email: 'jennifer.liu@realty.com'
    },
    createdAt: '2024-01-19',
    updatedAt: '2024-01-19'
  },
  {
    id: '6',
    title: 'Family Home with Pool',
    price: 1100000,
    location: 'Kirkland, WA',
    address: '987 Lakeview Drive, Kirkland, WA 98033',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3500,
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    description: 'Spacious family home with swimming pool and large backyard. Perfect for entertaining and family gatherings.',
    propertyType: 'house',
    listingType: 'sale',
    yearBuilt: 2008,
    lotSize: 12000,
    features: ['Swimming Pool', 'Large Deck', 'Master Suite', 'Home Office', 'Storage'],
    contactInfo: {
      agent: 'Robert Kim',
      phone: '(425) 555-0987',
      email: 'robert.kim@realty.com'
    },
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  }
];
