import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import PropertyForm from '@/components/PropertyForm';
import { Property } from '@/types/property';
import { mockProperties } from '@/data/mockProperties';
import { 
  Users, 
  Home as HomeIcon, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Search,
  Filter,
  Eye,
  MessageSquare,
  Calendar,
  LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock users data
  const recentUsers = [
    { id: 1, name: 'John Smith', email: 'john@example.com', joined: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', joined: '2024-01-14', status: 'Active' },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', joined: '2024-01-13', status: 'Inactive' },
    { id: 4, name: 'Emma Davis', email: 'emma@example.com', joined: '2024-01-12', status: 'Active' },
  ];
  
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [users, setUsers] = useState(recentUsers);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | undefined>();

  // Mock data
  const stats = [
    { title: 'Total Properties', value: properties.length.toString(), change: '+12%', icon: HomeIcon, color: 'text-blue-600' },
    { title: 'Active Users', value: users.length.toString(), change: '+8%', icon: Users, color: 'text-green-600' },
    { title: 'Revenue', value: '$89,456', change: '+15%', icon: DollarSign, color: 'text-purple-600' },
    { title: 'Conversions', value: '234', change: '+23%', icon: TrendingUp, color: 'text-orange-600' },
  ];

  const handleCreateProperty = (propertyData: Partial<Property>) => {
    const newProperty = {
      ...propertyData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as Property;
    
    setProperties(prev => [newProperty, ...prev]);
    setShowPropertyForm(false);
    setEditingProperty(undefined);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowPropertyForm(true);
  };

  const handleUpdateProperty = (propertyData: Partial<Property>) => {
    setProperties(prev => prev.map(p => 
      p.id === editingProperty?.id 
        ? { ...p, ...propertyData, updatedAt: new Date().toISOString() } as Property
        : p
    ));
    setShowPropertyForm(false);
    setEditingProperty(undefined);
  };

  const handleDeleteProperty = (propertyId: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      setProperties(prev => prev.filter(p => p.id !== propertyId));
      toast({
        title: "Property Deleted",
        description: "Property has been successfully deleted",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <HomeIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-slate-900">RealtyHub Admin</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                localStorage.removeItem('userType');
                window.location.href = '/';
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Admin!</h1>
          <p className="text-slate-600">Here's what's happening with your real estate platform today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white p-1 h-12">
            <TabsTrigger value="overview" className="px-6 h-10">Overview</TabsTrigger>
            <TabsTrigger value="properties" className="px-6 h-10">Properties</TabsTrigger>
            <TabsTrigger value="users" className="px-6 h-10">Users</TabsTrigger>
            <TabsTrigger value="analytics" className="px-6 h-10">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Properties */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-lg font-semibold">Recent Properties</CardTitle>
                  <Button 
                    size="sm"
                    onClick={() => setShowPropertyForm(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {properties.slice(0, 4).map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900">{property.title}</h4>
                          <p className="text-sm text-slate-600">{property.location}</p>
                          <p className="text-sm font-semibold text-blue-600">${property.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Users */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-lg font-semibold">Recent Users</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        View All
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>All Users</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {users.map((user) => (
                          <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-900">{user.name}</h4>
                                <p className="text-sm text-slate-600">{user.email}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.slice(0, 4).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900">{user.name}</h4>
                            <p className="text-sm text-slate-600">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            {showPropertyForm ? (
              <PropertyForm
                property={editingProperty}
                onSubmit={editingProperty ? handleUpdateProperty : handleCreateProperty}
                onCancel={() => {
                  setShowPropertyForm(false);
                  setEditingProperty(undefined);
                }}
              />
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Property Management</CardTitle>
                    <Button onClick={() => setShowPropertyForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Property
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search properties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {properties
                      .filter(property => 
                        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        property.location.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">{property.title}</h4>
                          <p className="text-slate-600">{property.location}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="font-semibold text-blue-600">${property.price.toLocaleString()}</span>
                            <Badge className="bg-green-100 text-green-800">
                              Active
                            </Badge>
                            <span className="text-sm text-slate-500">
                              <Calendar className="h-4 w-4 inline mr-1" />
                              {new Date(property.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditProperty(property)}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteProperty(property.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-lg">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">{user.name}</h4>
                            <p className="text-slate-600">{user.email}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <Badge className={getStatusColor(user.status)}>
                                {user.status}
                              </Badge>
                              <span className="text-sm text-slate-500">
                                Joined {user.joined}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-slate-500">Chart placeholder - Property views over time</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-slate-500">Chart placeholder - User engagement metrics</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;