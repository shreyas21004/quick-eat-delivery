
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This component redirects to the OrdersPage component
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/orders');
  }, [navigate]);
  
  return null;
};

export default Index;
