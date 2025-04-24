
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, X, ChevronRight, CreditCard, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isOrderingDialog, setIsOrderingDialog] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  
  const subtotal = getCartTotal();
  const deliveryFee = 3.99;
  const serviceFee = subtotal * 0.05;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + serviceFee + tax;
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to continue with checkout");
      navigate('/login', { state: { returnUrl: '/cart' } });
      return;
    }
    
    setIsOrderingDialog(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsOrderPlaced(true);
      clearCart();
      
      // After showing success for a moment, redirect to orders page
      setTimeout(() => {
        navigate('/order-success');
      }, 2000);
    }, 2000);
  };
  
  if (cart.length === 0) {
    return (
      <div className="container px-4 py-16 mx-auto">
        <div className="max-w-md p-8 mx-auto text-center rounded-lg shadow-md bg-gray-50">
          <div className="w-24 h-24 p-4 mx-auto mb-6 rounded-full bg-gray-100">
            <X className="w-full h-full text-gray-400" />
          </div>
          <h2 className="mb-2 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mb-6 text-gray-500">Looks like you haven't added any items to your cart yet.</p>
          <Button 
            onClick={() => navigate('/restaurants')}
            className="bg-brand hover:bg-brand/90"
          >
            Browse Restaurants
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Your Cart</h1>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">
                Items from {cart[0]?.item.restaurantName}
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearCart}
                className="text-gray-500 hover:text-brand"
              >
                Clear Cart
              </Button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {cart.map((cartItem) => (
                <div key={cartItem.item.id} className="flex items-start py-4">
                  {cartItem.item.image && (
                    <img 
                      src={cartItem.item.image} 
                      alt={cartItem.item.name}
                      className="object-cover w-20 h-20 rounded"
                    />
                  )}
                  
                  <div className="flex-grow px-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{cartItem.item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">${cartItem.item.price.toFixed(2)}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(cartItem.item.id)}
                        aria-label="Remove item"
                        className="text-gray-400 hover:text-brand"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="w-8 h-8"
                      onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                      disabled={cartItem.quantity <= 1}
                    >
                      <Minus size={14} />
                    </Button>
                    <span className="w-8 text-center">{cartItem.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="w-8 h-8"
                      onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
            
            <div className="space-y-3 divide-y divide-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-600">Service Fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-6">
              {isAuthenticated ? (
                <div className="p-3 mb-4 border rounded-lg border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3 bg-gray-200 rounded-full"></div>
                      <div>
                        <p className="font-medium">Deliver to:</p>
                        {user?.addresses && user.addresses.length > 0 ? (
                          <p className="text-sm text-gray-500">
                            {user.addresses[0].street}, {user.addresses[0].city}
                          </p>
                        ) : (
                          <p className="text-sm text-brand">Add an address</p>
                        )}
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
              ) : null}
              
              <Button 
                className="w-full bg-brand hover:bg-brand/90"
                onClick={handleCheckout}
              >
                {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
              </Button>
              
              <div className="flex justify-center mt-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate(`/restaurant/${cart[0]?.item.restaurantId}`)}
                >
                  Add More Items
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Processing Dialog */}
      <Dialog open={isOrderingDialog} onOpenChange={setIsOrderingDialog}>
        <DialogContent className="text-center sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {isOrderPlaced ? 'Order Placed Successfully!' : 'Processing Your Order'}
            </DialogTitle>
            <DialogDescription>
              {isOrderPlaced ? (
                <div className="mt-4 text-green-600">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  Your order has been placed! You'll be redirected to the order confirmation page.
                </div>
              ) : (
                <div className="mt-4">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-brand/10">
                    <CreditCard className="w-8 h-8 text-brand animate-pulse" />
                  </div>
                  Processing your payment. This will only take a moment...
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          {!isOrderPlaced && (
            <div className="flex items-center justify-center mt-4 space-x-2">
              <Clock className="w-5 h-5 text-gray-400 animate-spin" />
              <span className="text-sm text-gray-500">Please wait...</span>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartPage;
