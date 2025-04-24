
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This component simply redirects to the HomePage component
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  
  return null;
};

export default Index;
