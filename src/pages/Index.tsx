
import { useState } from 'react';
import { Property } from '@/types/property';
import { mockProperties } from '@/data/mockProperties';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PropertyGrid from '@/components/PropertyGrid';
import PropertyDetails from '@/components/PropertyDetails';
import Footer from '@/components/Footer';

const Index = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [properties] = useState<Property[]>(mockProperties);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleBackToGrid = () => {
    setSelectedProperty(null);
  };

  if (selectedProperty) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <PropertyDetails 
          property={selectedProperty} 
          onBack={handleBackToGrid}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <PropertyGrid 
        properties={properties}
        onPropertyClick={handlePropertyClick}
      />
      <Footer />
    </div>
  );
};

export default Index;
