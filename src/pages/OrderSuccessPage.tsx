
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, MapPin, Clock, ChefHat, Truck, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Steps, Step } from "@/components/Steps";

const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock order details
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleDateString();
  const estimatedDelivery = "30-40 minutes";
  
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-green-50">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="mb-2 text-3xl font-bold">Order Placed!</h1>
          <p className="text-gray-600">
            Your order #{orderNumber} has been successfully placed.
          </p>
        </div>
        
        {/* Order Details Card */}
        <div className="p-6 mb-8 overflow-hidden bg-white rounded-lg shadow">
          <div className="flex flex-col justify-between p-4 mb-6 rounded-lg md:flex-row bg-gray-50">
            <div className="mb-4 md:mb-0">
              <h3 className="text-sm font-medium text-gray-500">ORDER NUMBER</h3>
              <p className="text-lg font-semibold">{orderNumber}</p>
            </div>
            <div className="mb-4 md:mb-0">
              <h3 className="text-sm font-medium text-gray-500">ORDER DATE</h3>
              <p className="font-semibold">{orderDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">ESTIMATED DELIVERY</h3>
              <p className="font-semibold">{estimatedDelivery}</p>
            </div>
          </div>
          
          {/* Order Status */}
          <h3 className="mb-4 text-lg font-semibold">Order Status</h3>
          <Steps currentStep={1}>
            <Step icon={<ChefHat className="w-6 h-6" />} title="Order Received" description="Restaurant has received your order" />
            <Step icon={<User className="w-6 h-6" />} title="Preparing" description="Your food is being prepared" />
            <Step icon={<Truck className="w-6 h-6" />} title="On the Way" description="Your order is on the way" />
            <Step icon={<MapPin className="w-6 h-6" />} title="Delivered" description="Enjoy your meal!" />
          </Steps>
          
          <div className="flex items-center p-4 mt-6 border rounded-lg border-brand/20 bg-brand/5">
            <Clock className="w-5 h-5 mr-2 text-brand" />
            <p className="text-sm">You can track the status of your order in real-time from the Orders page.</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button 
            className="flex-1 bg-brand hover:bg-brand/90"
            onClick={() => navigate('/orders')}
          >
            View Order Details
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate('/')}
          >
            Return to Home <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
