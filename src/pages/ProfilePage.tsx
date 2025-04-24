
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { User, MapPin, Package, CreditCard, Settings, Loader2 } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock addresses 
  const addresses = user?.addresses || [];
  
  // Mock orders
  const orders = [
    {
      id: 'ORD123456',
      date: '2023-04-15',
      restaurant: 'Burger Palace',
      status: 'Delivered',
      total: 25.50,
    },
    {
      id: 'ORD123457',
      date: '2023-04-10',
      restaurant: 'Pizza Heaven',
      status: 'Delivered',
      total: 32.75,
    },
    {
      id: 'ORD123458',
      date: '2023-04-05',
      restaurant: 'Sushi World',
      status: 'Delivered',
      total: 45.20,
    },
  ];
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSaving(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast.success('Profile updated successfully');
      setIsSaving(false);
    }, 1000);
  };
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">My Account</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="addresses" className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Addresses
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center">
            <Package className="w-4 h-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-brand hover:bg-brand/90"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="addresses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Saved Addresses</CardTitle>
              <Button variant="outline">Add New Address</Button>
            </CardHeader>
            <CardContent>
              {addresses.length > 0 ? (
                <div className="space-y-4">
                  {addresses.map((address, index) => (
                    <div 
                      key={address.id} 
                      className="p-4 border rounded-lg bg-gray-50"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">
                            {address.isDefault && (
                              <span className="px-2 py-1 mr-2 text-xs rounded-full bg-brand/10 text-brand">Default</span>
                            )}
                            Address {index + 1}
                          </p>
                          <p className="mt-1 text-gray-600">
                            {address.street}, {address.city}, {address.state} {address.zipCode}
                          </p>
                        </div>
                        <div className="flex">
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="mb-1 text-lg font-medium">No addresses yet</h3>
                  <p className="mb-4 text-gray-500">Add an address to make ordering faster</p>
                  <Button>Add Address</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <div key={order.id} className="py-4">
                      <div className="flex flex-col justify-between md:flex-row">
                        <div>
                          <p className="font-medium">{order.restaurant}</p>
                          <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div className="mt-2 md:text-right md:mt-0">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                          <span 
                            className={`inline-block px-2 py-1 mt-1 text-xs font-medium rounded-full ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex mt-2 space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="mb-1 text-lg font-medium">No orders yet</h3>
                  <p className="mb-4 text-gray-500">When you place orders, they will appear here</p>
                  <Button>Browse Restaurants</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Payment Methods</CardTitle>
              <Button variant="outline">Add New Card</Button>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="mb-1 text-lg font-medium">No payment methods</h3>
                <p className="mb-4 text-gray-500">Add a payment method for faster checkout</p>
                <Button>Add Payment Method</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-medium">Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-2 text-lg font-medium">Account Security</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      Change Password
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="border-red-300 text-red-500 hover:bg-red-50"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
