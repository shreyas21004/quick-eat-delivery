
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurantId: string;
  restaurantName: string;
  category: string;
};

export type CartItem = {
  item: MenuItem;
  quantity: number;
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemsCount: () => number;
  cartRestaurantId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartRestaurantId, setCartRestaurantId] = useState<string | null>(null);
  
  useEffect(() => {
    // Load cart from localStorage on initial load
    const savedCart = localStorage.getItem('cart');
    const savedRestaurantId = localStorage.getItem('cartRestaurantId');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedRestaurantId) {
      setCartRestaurantId(savedRestaurantId);
    }
  }, []);
  
  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
    if (cartRestaurantId) {
      localStorage.setItem('cartRestaurantId', cartRestaurantId);
    } else {
      localStorage.removeItem('cartRestaurantId');
    }
  }, [cart, cartRestaurantId]);
  
  const addToCart = (item: MenuItem, quantity = 1) => {
    // Check if item is from a different restaurant
    if (cartRestaurantId && item.restaurantId !== cartRestaurantId && cart.length > 0) {
      if (!window.confirm('Adding items from a different restaurant will clear your current cart. Continue?')) {
        return;
      }
      clearCart();
    }
    
    setCartRestaurantId(item.restaurantId);
    
    setCart(prev => {
      const existingItemIndex = prev.findIndex(cartItem => cartItem.item.id === item.id);
      
      if (existingItemIndex !== -1) {
        // Item already in cart, update quantity
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity += quantity;
        toast.success(`Updated quantity for ${item.name}`);
        return updatedCart;
      } else {
        // Add new item to cart
        toast.success(`Added ${item.name} to cart`);
        return [...prev, { item, quantity }];
      }
    });
  };
  
  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const updatedCart = prev.filter(cartItem => cartItem.item.id !== itemId);
      if (updatedCart.length === 0) {
        setCartRestaurantId(null);
      }
      toast.info('Item removed from cart');
      return updatedCart;
    });
  };
  
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prev => {
      return prev.map(cartItem => {
        if (cartItem.item.id === itemId) {
          return { ...cartItem, quantity };
        }
        return cartItem;
      });
    });
  };
  
  const clearCart = () => {
    setCart([]);
    setCartRestaurantId(null);
  };
  
  const getCartTotal = () => {
    return cart.reduce((total, cartItem) => {
      return total + (cartItem.item.price * cartItem.quantity);
    }, 0);
  };
  
  const getItemsCount = () => {
    return cart.reduce((count, cartItem) => count + cartItem.quantity, 0);
  };
  
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getItemsCount,
    cartRestaurantId
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
