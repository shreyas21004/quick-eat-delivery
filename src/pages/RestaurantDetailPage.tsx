
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, MapPin, Info, ShoppingCart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import MenuItem from '@/components/MenuItem';
import { useCart, MenuItem as MenuItemType } from '@/contexts/CartContext';
import { Restaurant } from '@/components/RestaurantCard';

// Mock data
const restaurants: { [key: string]: Restaurant & { about: string } } = {
  '1': {
    id: '1',
    name: 'Burger Palace',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200',
    cuisine: ['American', 'Burgers'],
    rating: 4.7,
    estimatedDeliveryTime: '20-30 min',
    distance: '1.2 mi',
    priceRange: '$$',
    about: 'Burger Palace serves juicy, handcrafted burgers made from premium ingredients. Our patties are 100% Angus beef, locally sourced and grilled to perfection. Family-owned since 1998.'
  },
  '2': {
    id: '2',
    name: 'Pizza Heaven',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200',
    cuisine: ['Italian', 'Pizza'],
    rating: 4.5,
    estimatedDeliveryTime: '25-40 min',
    distance: '0.8 mi',
    priceRange: '$$',
    about: 'Pizza Heaven offers authentic Italian pizzas with homemade dough prepared fresh daily. Our wood-fired ovens give our pizzas that perfect crispy crust and amazing flavor. We use only the finest imported and local ingredients.'
  },
  '3': {
    id: '3',
    name: 'Sushi World',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200',
    cuisine: ['Japanese', 'Sushi'],
    rating: 4.8,
    estimatedDeliveryTime: '30-45 min',
    distance: '1.5 mi',
    priceRange: '$$$',
    about: 'Sushi World brings the taste of Japan to your doorstep. Our master chefs have over 20 years of experience crafting the perfect sushi rolls. We import the freshest fish daily to ensure premium quality and taste.'
  }
};

// Mock menu categories and items
const menuData: { [key: string]: { categories: string[], items: MenuItemType[] } } = {
  '1': {
    categories: ['Popular', 'Burgers', 'Sides', 'Drinks', 'Desserts'],
    items: [
      {
        id: '101',
        name: 'Classic Burger',
        description: 'Beef patty, lettuce, tomato, onion, pickles, and our special sauce',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500',
        category: 'Burgers',
        restaurantId: '1',
        restaurantName: 'Burger Palace'
      },
      {
        id: '102',
        name: 'Cheese Burger',
        description: 'Classic burger with American cheese',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?q=80&w=500',
        category: 'Burgers',
        restaurantId: '1',
        restaurantName: 'Burger Palace'
      },
      {
        id: '103',
        name: 'Bacon Burger',
        description: 'Classic burger with crispy bacon strips',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=500',
        category: 'Burgers',
        restaurantId: '1',
        restaurantName: 'Burger Palace'
      },
      {
        id: '104',
        name: 'French Fries',
        description: 'Crispy golden fries with our seasoned salt',
        price: 3.99,
        image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=500',
        category: 'Sides',
        restaurantId: '1',
        restaurantName: 'Burger Palace'
      },
      {
        id: '105',
        name: 'Onion Rings',
        description: 'Thick-cut onions, battered and fried to golden perfection',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=500',
        category: 'Sides',
        restaurantId: '1',
        restaurantName: 'Burger Palace'
      },
      {
        id: '106',
        name: 'Soft Drink',
        description: 'Your choice of soda',
        price: 2.49,
        image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?q=80&w=500',
        category: 'Drinks',
        restaurantId: '1',
        restaurantName: 'Burger Palace'
      },
      {
        id: '107',
        name: 'Chocolate Shake',
        description: 'Rich and creamy chocolate milkshake',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=500',
        category: 'Drinks',
        restaurantId: '1',
        restaurantName: 'Burger Palace'
      },
      {
        id: '108',
        name: 'Chocolate Chip Cookie',
        description: 'Freshly baked chocolate chip cookie',
        price: 1.99,
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=500',
        category: 'Desserts',
        restaurantId: '1',
        restaurantName: 'Burger Palace'
      }
    ]
  },
  '2': {
    categories: ['Popular', 'Pizza', 'Pasta', 'Salads', 'Drinks', 'Desserts'],
    items: [
      {
        id: '201',
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomato sauce, and basil',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500',
        category: 'Pizza',
        restaurantId: '2',
        restaurantName: 'Pizza Heaven'
      },
      {
        id: '202',
        name: 'Pepperoni Pizza',
        description: 'Tomato sauce, mozzarella, and pepperoni',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=500',
        category: 'Pizza',
        restaurantId: '2',
        restaurantName: 'Pizza Heaven'
      },
      {
        id: '203',
        name: 'Spaghetti Bolognese',
        description: 'Spaghetti with our homemade meat sauce',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?q=80&w=500',
        category: 'Pasta',
        restaurantId: '2',
        restaurantName: 'Pizza Heaven'
      }
    ]
  },
  '3': {
    categories: ['Popular', 'Rolls', 'Sashimi', 'Tempura', 'Drinks', 'Desserts'],
    items: [
      {
        id: '301',
        name: 'California Roll',
        description: 'Crab, avocado, cucumber, and tobiko',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500',
        category: 'Rolls',
        restaurantId: '3',
        restaurantName: 'Sushi World'
      },
      {
        id: '302',
        name: 'Salmon Nigiri',
        description: 'Fresh salmon over pressed vinegar rice',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=500',
        category: 'Sashimi',
        restaurantId: '3',
        restaurantName: 'Sushi World'
      },
      {
        id: '303',
        name: 'Shrimp Tempura',
        description: 'Lightly battered and fried shrimp',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1629208113515-04df621a421f?q=80&w=500',
        category: 'Tempura',
        restaurantId: '3',
        restaurantName: 'Sushi World'
      }
    ]
  }
};

const RestaurantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cart, getItemsCount } = useCart();
  const [activeTab, setActiveTab] = useState('Popular');
  const [restaurant, setRestaurant] = useState<(Restaurant & { about: string }) | null>(null);
  const [menu, setMenu] = useState<{ categories: string[], items: MenuItemType[] } | null>(null);
  
  const itemsCount = getItemsCount();
  
  useEffect(() => {
    if (id && restaurants[id]) {
      setRestaurant(restaurants[id]);
      setMenu(menuData[id]);
      
      // Set first category as active tab if 'Popular' doesn't exist
      if (menuData[id] && !menuData[id].categories.includes('Popular')) {
        setActiveTab(menuData[id].categories[0]);
      }
    }
  }, [id]);
  
  if (!restaurant || !menu) {
    return (
      <div className="container flex items-center justify-center h-screen px-4 mx-auto">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-semibold">Loading restaurant...</h2>
        </div>
      </div>
    );
  }
  
  // Get items for current tab/category
  const currentTabItems = activeTab === 'Popular' 
    ? menu.items.slice(0, 4) // Just show first few items as "Popular"
    : menu.items.filter(item => item.category === activeTab);
  
  return (
    <div className="min-h-screen pb-16 bg-gray-50">
      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${restaurant.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">{restaurant.name}</h1>
          <div className="flex flex-wrap items-center justify-center mb-4 space-x-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-1 text-yellow-400 fill-yellow-400" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-1" />
              <span>{restaurant.estimatedDeliveryTime}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-1" />
              <span>{restaurant.distance}</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {restaurant.cuisine.map((type, index) => (
              <span 
                key={index} 
                className="px-3 py-1 text-sm font-medium bg-white/20 rounded-full"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Restaurant Info and Menu */}
      <div className="container px-4 mx-auto">
        <div className="relative z-10 p-6 -mt-6 bg-white rounded-t-lg shadow-md">
          {/* Restaurant About */}
          <div className="flex items-start gap-4 p-4 mb-6 border rounded-lg border-gray-100 bg-gray-50">
            <Info className="flex-shrink-0 w-5 h-5 mt-1 text-gray-400" />
            <p className="text-gray-600">{restaurant.about}</p>
          </div>
          
          {/* Menu Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-6 overflow-x-auto">
              {menu.categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {menu.categories.map((category) => (
              <TabsContent key={category} value={category} className="space-y-0">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {currentTabItems.map((item) => (
                    <MenuItem key={item.id} item={item} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      
      {/* Cart Button - Fixed at bottom */}
      {itemsCount > 0 && (
        <div className="fixed inset-x-0 bottom-0 p-4 bg-white border-t">
          <div className="container mx-auto">
            <Button 
              className="w-full bg-brand hover:bg-brand/90"
              onClick={() => window.location.href = '/cart'}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              View Cart ({itemsCount} items)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
