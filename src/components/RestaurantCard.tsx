
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string[];
  rating: number;
  estimatedDeliveryTime: string;
  distance: string;
  priceRange: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <Card className="overflow-hidden h-full card-hover">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          {restaurant.priceRange && (
            <span className="absolute px-2 py-1 text-xs font-medium rounded-full top-2 right-2 bg-white/90">
              {restaurant.priceRange}
            </span>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{restaurant.name}</h3>
            <div className="flex items-center px-2 py-1 rounded bg-yellow-50">
              <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">{restaurant.rating}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap mb-3 -mx-1">
            {restaurant.cuisine.map((type, index) => (
              <span 
                key={index} 
                className="px-2 py-0.5 m-1 text-xs bg-gray-100 rounded-full text-gray-700"
              >
                {type}
              </span>
            ))}
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <Clock className="w-4 h-4 mr-1" />
            <span className="mr-3">{restaurant.estimatedDeliveryTime}</span>
            <MapPin className="w-4 h-4 mr-1" />
            <span>{restaurant.distance}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
