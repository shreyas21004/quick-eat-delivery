
import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  MapPin, 
  Filter, 
  Search, 
  Clock, 
  ChevronDown, 
  MoreVertical,
  RefreshCw 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Mock shipment data
const mockShipments = [
  {
    id: 'SHP-123456',
    origin: 'Chicago, IL',
    destination: 'Detroit, MI',
    driver: 'John Smith',
    truck: 'TRK-789',
    status: 'In Transit',
    pickupTime: '2025-04-22T08:30:00',
    estimatedDelivery: '2025-04-22T16:30:00',
    customerName: 'AutoParts Inc.',
    priority: 'High',
  },
  {
    id: 'SHP-123457',
    origin: 'Milwaukee, WI',
    destination: 'Indianapolis, IN',
    driver: 'Sarah Johnson',
    truck: 'TRK-456',
    status: 'Delivered',
    pickupTime: '2025-04-21T09:00:00',
    estimatedDelivery: '2025-04-21T17:00:00',
    customerName: 'Tech Solutions',
    priority: 'Medium',
  },
  {
    id: 'SHP-123458',
    origin: 'Columbus, OH',
    destination: 'Cincinnati, OH',
    driver: 'Mark Williams',
    truck: 'TRK-123',
    status: 'Scheduled',
    pickupTime: '2025-04-23T10:00:00',
    estimatedDelivery: '2025-04-23T14:00:00',
    customerName: 'Retail Logistics',
    priority: 'Low',
  },
  {
    id: 'SHP-123459',
    origin: 'St. Louis, MO',
    destination: 'Nashville, TN',
    driver: 'Emily Davis',
    truck: 'TRK-321',
    status: 'Delayed',
    pickupTime: '2025-04-22T07:00:00',
    estimatedDelivery: '2025-04-22T19:00:00',
    customerName: 'Food Distribution Co.',
    priority: 'High',
  },
];

const OrdersPage: React.FC = () => {
  const [shipments, setShipments] = useState(mockShipments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in transit':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-50 text-red-600';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700';
      case 'low':
        return 'bg-green-50 text-green-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const refreshShipments = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Shipment data refreshed');
    }, 1000);
  };
  
  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Shipments</h1>
        <Button 
          onClick={refreshShipments}
          variant="outline"
          className="flex items-center"
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Shipment Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <div className="relative">
                <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search shipments..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Status
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All</DropdownMenuItem>
                  <DropdownMenuItem>In Transit</DropdownMenuItem>
                  <DropdownMenuItem>Delivered</DropdownMenuItem>
                  <DropdownMenuItem>Scheduled</DropdownMenuItem>
                  <DropdownMenuItem>Delayed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Time Frame
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Today</DropdownMenuItem>
                  <DropdownMenuItem>This Week</DropdownMenuItem>
                  <DropdownMenuItem>This Month</DropdownMenuItem>
                  <DropdownMenuItem>Custom Range</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Driver & Truck</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShipments.length > 0 ? (
              filteredShipments.map((shipment) => (
                <TableRow key={shipment.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center text-sm">
                          <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                          {shipment.origin}
                        </div>
                        <div className="flex items-center mt-1 text-sm">
                          <MapPin className="w-3 h-3 mr-1 text-brand" />
                          {shipment.destination}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center mb-1 text-sm">
                        <Truck className="w-3 h-3 mr-1 text-gray-500" />
                        {shipment.truck}
                      </div>
                      <div className="text-sm">{shipment.driver}</div>
                    </div>
                  </TableCell>
                  <TableCell>{shipment.customerName}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(shipment.status)}`}>
                      {shipment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(shipment.priority)}`}>
                      {shipment.priority}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">
                    <div>Pickup: {formatDate(shipment.pickupTime)}</div>
                    <div>ETA: {formatDate(shipment.estimatedDelivery)}</div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            console.log(`View details for ${shipment.id}`);
                          }}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            toast.success(`Tracking link copied for ${shipment.id}`);
                          }}
                        >
                          Share Tracking
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            console.log(`Update status for ${shipment.id}`);
                          }}
                        >
                          Update Status
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-gray-500">
                  No shipments found. Try adjusting your search filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersPage;
