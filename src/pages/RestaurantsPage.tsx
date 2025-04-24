
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from '@/components/ui/checkbox';
import RestaurantCard, { Restaurant } from '@/components/RestaurantCard';

// Mock data
const allRestaurants: Restaurant[] = [
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
  {
    id: '4',
    name: 'Taco Town',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=500',
    cuisine: ['Mexican', 'Tacos'],
    rating: 4.3,
    estimatedDeliveryTime: '15-25 min',
    distance: '0.7 mi',
    priceRange: '$'
  },
  {
    id: '5',
    name: 'Pasta Palace',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=500',
    cuisine: ['Italian', 'Pasta'],
    rating: 4.6,
    estimatedDeliveryTime: '25-35 min',
    distance: '1.3 mi',
    priceRange: '$$'
  },
  {
    id: '6',
    name: 'Bangkok Kitchen',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=500',
    cuisine: ['Thai', 'Asian'],
    rating: 4.4,
    estimatedDeliveryTime: '30-40 min',
    distance: '1.7 mi',
    priceRange: '$$'
  },
  {
    id: '7',
    name: 'Falafel House',
    image: 'https://images.unsplash.com/photo-1644300121909-0cede36ffdce?q=80&w=500',
    cuisine: ['Mediterranean', 'Middle Eastern'],
    rating: 4.2,
    estimatedDeliveryTime: '20-35 min',
    distance: '1.1 mi',
    priceRange: '$'
  },
  {
    id: '8',
    name: 'Green Garden',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500',
    cuisine: ['Vegan', 'Healthy'],
    rating: 4.5,
    estimatedDeliveryTime: '20-30 min',
    distance: '0.9 mi',
    priceRange: '$$'
  },
  {
    id: '9',
    name: 'Sweet Tooth',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=500',
    cuisine: ['Dessert', 'Bakery'],
    rating: 4.9,
    estimatedDeliveryTime: '15-25 min',
    distance: '0.6 mi',
    priceRange: '$$'
  },
];

// Get unique cuisines from all restaurants
const allCuisines = Array.from(
  new Set(
    allRestaurants.flatMap(restaurant => restaurant.cuisine)
  )
).sort();

const RestaurantsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCuisine = searchParams.get('cuisine') || '';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(
    initialCuisine ? [initialCuisine] : []
  );
  const [sortBy, setSortBy] = useState('rating');
  const [maxDeliveryTime, setMaxDeliveryTime] = useState(60);
  const [priceRange, setPriceRange] = useState<string[]>(['$', '$$', '$$$']);
  
  // Filter restaurants based on search and filters
  const filteredRestaurants = allRestaurants.filter(restaurant => {
    // Search filter
    const matchesSearch = !searchQuery || 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Cuisine filter
    const matchesCuisine = selectedCuisines.length === 0 || 
      restaurant.cuisine.some(c => selectedCuisines.includes(c));
    
    // Price range filter
    const matchesPrice = priceRange.includes(restaurant.priceRange);
    
    // Delivery time filter (parse "20-30 min" format)
    const maxTime = parseInt(restaurant.estimatedDeliveryTime.split('-')[1]);
    const matchesDeliveryTime = maxTime <= maxDeliveryTime;
    
    return matchesSearch && matchesCuisine && matchesPrice && matchesDeliveryTime;
  });
  
  // Sort restaurants
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'deliveryTime':
        const aTime = parseInt(a.estimatedDeliveryTime.split('-')[0]);
        const bTime = parseInt(b.estimatedDeliveryTime.split('-')[0]);
        return aTime - bTime;
      case 'distance':
        const aDist = parseFloat(a.distance.replace(' mi', ''));
        const bDist = parseFloat(b.distance.replace(' mi', ''));
        return aDist - bDist;
      default:
        return 0;
    }
  });
  
  const resetFilters = () => {
    setSelectedCuisines([]);
    setSortBy('rating');
    setMaxDeliveryTime(60);
    setPriceRange(['$', '$$', '$$$']);
    setSearchParams({});
  };
  
  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines(prev => {
      if (prev.includes(cuisine)) {
        return prev.filter(c => c !== cuisine);
      } else {
        return [...prev, cuisine];
      }
    });
  };
  
  const handlePriceToggle = (price: string) => {
    setPriceRange(prev => {
      if (prev.includes(price)) {
        return prev.filter(p => p !== price);
      } else {
        return [...prev, price];
      }
    });
  };
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Restaurants</h1>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col items-center gap-4 mb-8 md:flex-row">
        <div className="relative flex-grow">
          <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <Input
            type="search"
            placeholder="Search restaurants or cuisines..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Top Rated</SelectItem>
            <SelectItem value="deliveryTime">Delivery Time</SelectItem>
            <SelectItem value="distance">Distance</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Options</SheetTitle>
              <SheetDescription>
                Filter restaurants by cuisine, price, and delivery time.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <div className="mb-6">
                <h4 className="mb-2 text-sm font-medium">Cuisines</h4>
                <div className="grid grid-cols-2 gap-2">
                  {allCuisines.map((cuisine) => (
                    <div key={cuisine} className="flex items-center">
                      <Checkbox 
                        id={`cuisine-${cuisine}`}
                        checked={selectedCuisines.includes(cuisine)}
                        onCheckedChange={() => handleCuisineToggle(cuisine)}
                      />
                      <label 
                        htmlFor={`cuisine-${cuisine}`}
                        className="ml-2 text-sm"
                      >
                        {cuisine}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="mb-2 text-sm font-medium">Price Range</h4>
                <div className="flex gap-2">
                  {['$', '$$', '$$$'].map((price) => (
                    <Button
                      key={price}
                      variant={priceRange.includes(price) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePriceToggle(price)}
                    >
                      {price}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="mb-2 text-sm font-medium">
                  Max Delivery Time: {maxDeliveryTime} minutes
                </h4>
                <Slider
                  value={[maxDeliveryTime]}
                  min={10}
                  max={60}
                  step={5}
                  onValueChange={(val) => setMaxDeliveryTime(val[0])}
                />
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Active Filters */}
      {(selectedCuisines.length > 0 || priceRange.length < 3 || maxDeliveryTime < 60) && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm font-medium text-gray-500">Active Filters:</span>
          
          {selectedCuisines.map(cuisine => (
            <div key={cuisine} className="flex items-center px-2 py-1 text-sm rounded-full bg-gray-100">
              {cuisine}
              <button 
                onClick={() => handleCuisineToggle(cuisine)}
                className="ml-1"
                aria-label={`Remove ${cuisine} filter`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          
          {priceRange.length < 3 && (
            <div className="flex items-center px-2 py-1 text-sm rounded-full bg-gray-100">
              Price: {priceRange.join(', ')}
              <button 
                onClick={() => setPriceRange(['$', '$$', '$$$'])}
                className="ml-1"
                aria-label="Reset price filter"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          
          {maxDeliveryTime < 60 && (
            <div className="flex items-center px-2 py-1 text-sm rounded-full bg-gray-100">
              Delivery: ≤ {maxDeliveryTime} min
              <button 
                onClick={() => setMaxDeliveryTime(60)}
                className="ml-1"
                aria-label="Reset delivery time filter"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={resetFilters}
            className="text-sm text-gray-500"
          >
            Clear All
          </Button>
        </div>
      )}
      
      {/* Results Count */}
      <p className="mb-6 text-sm text-gray-500">
        {sortedRestaurants.length} restaurants found
      </p>
      
      {/* Restaurant Grid */}
      {sortedRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-gray-50 rounded-lg">
          <h3 className="mb-2 text-xl font-semibold">No restaurants found</h3>
          <p className="text-gray-500">Try changing your filters or search term</p>
          <Button onClick={resetFilters} className="mt-4">
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;
