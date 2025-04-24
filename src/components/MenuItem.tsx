
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart, MenuItem as MenuItemType } from '@/contexts/CartContext';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(item);
  };
  
  return (
    <Card className="h-full overflow-hidden card-hover">
      <div className="flex flex-col h-full">
        {item.image && (
          <div className="relative h-40 overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <CardContent className="flex flex-col justify-between flex-grow p-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">{item.name}</h3>
              <span className="font-semibold text-brand">${item.price.toFixed(2)}</span>
            </div>
            <p className="mb-4 text-sm text-gray-500 line-clamp-2">{item.description}</p>
          </div>
          
          <Button 
            className="w-full mt-auto bg-brand hover:bg-brand/90"
            onClick={handleAddToCart}
          >
            <Plus className="w-4 h-4 mr-2" /> Add to Cart
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};

export default MenuItem;
