import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Plus, MapPin } from 'lucide-react';
import { Property } from '@/types/property';

interface PropertyFormProps {
  property?: Property;
  onSubmit: (property: Partial<Property>) => void;
  onCancel: () => void;
}

const PropertyForm = ({ property, onSubmit, onCancel }: PropertyFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: property?.title || '',
    price: property?.price || '',
    location: property?.location || '',
    address: property?.address || '',
    bedrooms: property?.bedrooms || '',
    bathrooms: property?.bathrooms || '',
    sqft: property?.sqft || '',
    description: property?.description || '',
    propertyType: property?.propertyType || '',
    listingType: property?.listingType || '',
    yearBuilt: property?.yearBuilt || '',
    lotSize: property?.lotSize || '',
    features: property?.features || [],
    contactInfo: property?.contactInfo || {
      agent: '',
      phone: '',
      email: ''
    }
  });

  const [images, setImages] = useState<string[]>(property?.images || []);
  const [newFeature, setNewFeature] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.bedrooms) newErrors.bedrooms = 'Bedrooms is required';
    if (!formData.bathrooms) newErrors.bathrooms = 'Bathrooms is required';
    if (!formData.sqft) newErrors.sqft = 'Square footage is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
    if (!formData.listingType) newErrors.listingType = 'Listing type is required';
    if (!formData.contactInfo.agent.trim()) newErrors.agent = 'Agent name is required';
    if (!formData.contactInfo.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.contactInfo.email.trim()) newErrors.email = 'Email is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.contactInfo.email && !emailRegex.test(formData.contactInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (formData.contactInfo.phone && !phoneRegex.test(formData.contactInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (images.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive"
      });
      return;
    }

    const propertyData = {
      ...formData,
      images,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      sqft: Number(formData.sqft),
      yearBuilt: formData.yearBuilt ? Number(formData.yearBuilt) : undefined,
      lotSize: formData.lotSize ? Number(formData.lotSize) : undefined,
      propertyType: formData.propertyType as 'house' | 'apartment' | 'condo' | 'townhouse',
      listingType: formData.listingType as 'sale' | 'rent',
      id: property?.id || Date.now().toString(),
      createdAt: property?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSubmit(propertyData);
    
    toast({
      title: property ? "Property Updated" : "Property Created",
      description: `Property has been ${property ? 'updated' : 'created'} successfully`,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setIsUploading(true);
    
    // Simulate image upload to Cloudinary
    setTimeout(() => {
      const newImages = files.map((file, index) => 
        `https://images.unsplash.com/photo-${Date.now() + index}-640x480?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80`
      );
      setImages(prev => [...prev, ...newImages]);
      setIsUploading(false);
      setErrors(prev => ({ ...prev, images: '' }));
    }, 1000);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {property ? 'Edit Property' : 'Create New Property'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Beautiful Modern Home"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="450000"
                  className={errors.price ? 'border-red-500' : ''}
                />
                {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="San Francisco, CA"
                    className={`pl-10 ${errors.location ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.location && <span className="text-red-500 text-sm">{errors.location}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="123 Main Street, San Francisco, CA 94101"
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms *</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
                  placeholder="3"
                  className={errors.bedrooms ? 'border-red-500' : ''}
                />
                {errors.bedrooms && <span className="text-red-500 text-sm">{errors.bedrooms}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms *</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value }))}
                  placeholder="2.5"
                  className={errors.bathrooms ? 'border-red-500' : ''}
                />
                {errors.bathrooms && <span className="text-red-500 text-sm">{errors.bathrooms}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sqft">Square Feet *</Label>
                <Input
                  id="sqft"
                  type="number"
                  value={formData.sqft}
                  onChange={(e) => setFormData(prev => ({ ...prev, sqft: e.target.value }))}
                  placeholder="2000"
                  className={errors.sqft ? 'border-red-500' : ''}
                />
                {errors.sqft && <span className="text-red-500 text-sm">{errors.sqft}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearBuilt">Year Built</Label>
                <Input
                  id="yearBuilt"
                  type="number"
                  value={formData.yearBuilt}
                  onChange={(e) => setFormData(prev => ({ ...prev, yearBuilt: e.target.value }))}
                  placeholder="2020"
                />
              </div>
            </div>

            {/* Property Type & Listing Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type *</Label>
                <Select 
                  value={formData.propertyType} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}
                >
                  <SelectTrigger className={errors.propertyType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
                {errors.propertyType && <span className="text-red-500 text-sm">{errors.propertyType}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="listingType">Listing Type *</Label>
                <Select 
                  value={formData.listingType} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, listingType: value }))}
                >
                  <SelectTrigger className={errors.listingType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
                {errors.listingType && <span className="text-red-500 text-sm">{errors.listingType}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lotSize">Lot Size (sq ft)</Label>
                <Input
                  id="lotSize"
                  type="number"
                  value={formData.lotSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, lotSize: e.target.value }))}
                  placeholder="5000"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the property features, amenities, and highlights..."
                rows={4}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
            </div>

            {/* Images */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Property Images *</Label>
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm" disabled={isUploading}>
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploading ? 'Uploading...' : 'Upload Images'}
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </Label>
              </div>
              
              {errors.images && <span className="text-red-500 text-sm">{errors.images}</span>}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Property image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <Label>Property Features</Label>
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature (e.g., Swimming Pool)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <Button type="button" onClick={addFeature} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer">
                    {feature}
                    <X 
                      className="h-3 w-3 ml-1" 
                      onClick={() => removeFeature(feature)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agent">Agent Name *</Label>
                    <Input
                      id="agent"
                      value={formData.contactInfo.agent}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, agent: e.target.value }
                      }))}
                      placeholder="John Smith"
                      className={errors.agent ? 'border-red-500' : ''}
                    />
                    {errors.agent && <span className="text-red-500 text-sm">{errors.agent}</span>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={formData.contactInfo.phone}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, phone: e.target.value }
                      }))}
                      placeholder="(555) 123-4567"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.contactInfo.email}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, email: e.target.value }
                      }))}
                      placeholder="john@example.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {property ? 'Update Property' : 'Create Property'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyForm;