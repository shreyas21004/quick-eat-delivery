
import React from 'react';
import { Clock, Star, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: <Clock className="w-6 h-6 text-brand" />,
      title: 'Fast Delivery',
      description: 'Get your food delivered in 30 minutes or less, guaranteed.'
    },
    {
      icon: <Star className="w-6 h-6 text-brand" />,
      title: 'Top-rated Restaurants',
      description: 'We partner with only the best restaurants in your area.'
    },
    {
      icon: <MapPin className="w-6 h-6 text-brand" />,
      title: 'Live Order Tracking',
      description: 'Follow your order in real-time from restaurant to your doorstep.'
    }
  ];
  
  const stats = [
    { value: '500+', label: 'Restaurant Partners' },
    { value: '50,000+', label: 'Happy Customers' },
    { value: '100+', label: 'Cities' },
    { value: '1M+', label: 'Orders Delivered' }
  ];
  
  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Sarah Johnson',
      role: 'COO',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://randomuser.me/api/portraits/men/46.jpg'
    }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-gray-900 md:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10 px-4 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">About QuickEat</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            We're on a mission to make food delivery fast, reliable, and delightful.
          </p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 md:py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
            <p className="mb-6 text-lg text-gray-600">
              QuickEat was founded in 2020 with a simple idea: make food delivery better. We noticed that existing food delivery services often left customers waiting too long for their food, with orders that were cold or incorrect.
            </p>
            <p className="text-lg text-gray-600">
              We set out to build a platform that prioritizes speed, quality, and customer satisfaction. Today, we partner with hundreds of restaurants to deliver thousands of meals daily, all while maintaining our commitment to excellence.
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50 md:py-20">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Why Choose QuickEat?</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-brand/10">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-brand md:py-20">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="mb-2 text-4xl font-bold text-white md:text-5xl">{stat.value}</p>
                <p className="text-white text-opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 md:py-20">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Our Values</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 border rounded-lg">
              <CheckCircle2 className="mb-4 text-brand" />
              <h3 className="mb-2 text-xl font-semibold">Quality First</h3>
              <p className="text-gray-600">
                We partner with restaurants that prioritize quality ingredients and excellent food.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <CheckCircle2 className="mb-4 text-brand" />
              <h3 className="mb-2 text-xl font-semibold">Customer Satisfaction</h3>
              <p className="text-gray-600">
                Our customers' happiness is our top priority, from order to delivery.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <CheckCircle2 className="mb-4 text-brand" />
              <h3 className="mb-2 text-xl font-semibold">Innovation</h3>
              <p className="text-gray-600">
                We constantly improve our technology to enhance the food delivery experience.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <CheckCircle2 className="mb-4 text-brand" />
              <h3 className="mb-2 text-xl font-semibold">Community Support</h3>
              <p className="text-gray-600">
                We help local restaurants thrive and grow their businesses.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <CheckCircle2 className="mb-4 text-brand" />
              <h3 className="mb-2 text-xl font-semibold">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to reducing our environmental impact through eco-friendly practices.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <CheckCircle2 className="mb-4 text-brand" />
              <h3 className="mb-2 text-xl font-semibold">Transparency</h3>
              <p className="text-gray-600">
                We're honest about prices, delivery times, and any issues that arise.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Leadership Team */}
      <section className="py-16 bg-gray-50 md:py-20">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Our Team</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {team.map((member, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="object-cover w-32 h-32 mb-4 rounded-full"
                />
                <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                <p className="mb-4 text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 md:py-20">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Get In Touch</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center p-6 text-center border rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-brand/10">
                <Phone className="text-brand" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
              <p className="text-gray-600">Mon-Fri, 9am-6pm</p>
            </div>
            <div className="flex flex-col items-center p-6 text-center border rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-brand/10">
                <Mail className="text-brand" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Email</h3>
              <p className="text-gray-600">support@quickeat.com</p>
              <p className="text-gray-600">info@quickeat.com</p>
            </div>
            <div className="flex flex-col items-center p-6 text-center border rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-brand/10">
                <MapPin className="text-brand" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Office</h3>
              <p className="text-gray-600">123 Delivery Street</p>
              <p className="text-gray-600">Food City, FC 12345</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
