
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Clock, Award, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import RestaurantCard, { Restaurant } from '@/components/RestaurantCard';

const featuredRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Palace',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500',
    cuisine: ['American', 'Burgers'],
    rating: 4.7,
    estimatedDeliveryTime: '20-30 min',
    distance: '1.2 mi',
    priceRange: '$$'
  },
  {
    id: '2',
    name: 'Pizza Heaven',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500',
    cuisine: ['Italian', 'Pizza'],
    rating: 4.5,
    estimatedDeliveryTime: '25-40 min',
    distance: '0.8 mi',
    priceRange: '$$'
  },
  {
    id: '3',
    name: 'Sushi World',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500',
    cuisine: ['Japanese', 'Sushi'],
    rating: 4.8,
    estimatedDeliveryTime: '30-45 min',
    distance: '1.5 mi',
    priceRange: '$$$'
  },
];

const cuisineTypes = [
  { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200' },
  { name: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200' },
  { name: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=200' },
  { name: 'Pasta', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=200' },
  { name: 'Dessert', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=200' },
  { name: 'Healthy', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200' },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand to-brand-secondary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">Delicious Food, Delivered Fast</h1>
            <p className="mb-8 text-xl">Order from your favorite restaurants and track your order in real-time.</p>
            
            <div className="relative max-w-lg mx-auto">
              <Input
                placeholder="Search for food or restaurants..."
                className="w-full px-4 py-3 pr-12 bg-white border-none rounded-full h-14 text-gray-800"
              />
              <Button 
                className="absolute right-1 top-1 rounded-full" 
                size="icon"
                onClick={() => navigate('/restaurants')}
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cuisine Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-center md:text-3xl">Explore By Category</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {cuisineTypes.map((cuisine, index) => (
              <Card key={index} className="overflow-hidden card-hover">
                <div className="overflow-hidden cursor-pointer" onClick={() => navigate(`/restaurants?cuisine=${cuisine.name}`)}>
                  <div className="relative h-24">
                    <img 
                      src={cuisine.image} 
                      alt={cuisine.name} 
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-lg font-semibold text-white">{cuisine.name}</h3>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Restaurants */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold md:text-3xl">Featured Restaurants</h2>
            <Button 
              variant="link" 
              className="flex items-center text-brand"
              onClick={() => navigate('/restaurants')}
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-10 text-3xl font-bold text-center">Why Choose QuickEat?</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border-none shadow-lg">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Fast Delivery</h3>
                <p className="text-gray-600">
                  We deliver your food as quickly as possible, with real-time order tracking.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Quality Food</h3>
                <p className="text-gray-600">
                  We partner with the best restaurants in your area to ensure quality.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
                  <ThumbsUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Best Experience</h3>
                <p className="text-gray-600">
                  Our user-friendly app makes ordering food simple and enjoyable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 text-white bg-brand">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to order?</h2>
          <p className="mb-8 text-lg">Find your favorite food and get it delivered in minutes.</p>
          <Button 
            size="lg" 
            className="text-brand bg-white hover:bg-gray-100"
            onClick={() => navigate('/restaurants')}
          >
            Browse Restaurants
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
