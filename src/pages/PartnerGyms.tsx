
import { useState } from 'react';
import { MapPin, Navigation, Star, Search, GripVertical, LayoutGrid } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const mockGyms = [
  {
    id: 1,
    name: "FD Fitness Elite",
    address: "123 Main Street, Delhi",
    location: "Delhi",
    distance: "0.8 km",
    rating: 4.8,
    features: ["24/7 Access", "Personal Training", "Spa", "Cardio Zone"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "FD GYM Premium",
    address: "456 Park Avenue, Mumbai",
    location: "Mumbai",
    distance: "1.2 km",
    rating: 4.6,
    features: ["Group Classes", "Swimming Pool", "Sauna", "CrossFit"],
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "FD Powerhouse",
    address: "789 Gym Lane, Bangalore",
    location: "Bangalore",
    distance: "2.5 km",
    rating: 4.9,
    features: ["Strength Training", "Yoga Studio", "Protein Bar", "Massage"],
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "FD Elite Fitness",
    address: "321 Gym Road, Chennai",
    location: "Chennai",
    distance: "3.0 km",
    rating: 4.7,
    features: ["Boxing Ring", "Cardio Theater", "Nutrition Coaching", "Kids Area"],
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "FD GYM Hyderabad",
    address: "567 Fitness Street, Hyderabad",
    location: "Hyderabad",
    distance: "1.5 km",
    rating: 4.5,
    features: ["HIIT Studio", "Recovery Zone", "Personal Lockers", "Supplements"],
    image: "https://images.unsplash.com/photo-1570829460005-c840387bb1ca?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "FD Premium Kolkata",
    address: "789 Workout Avenue, Kolkata",
    location: "Kolkata",
    distance: "2.2 km",
    rating: 4.4,
    features: ["Basketball Court", "Running Track", "Steam Room", "Pilates"],
    image: "https://images.unsplash.com/photo-1598136490937-f77b0ce520fe?auto=format&fit=crop&q=80&w=800"
  },
];

const PartnerGyms = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-orbitron font-bold mb-4">Find Partner Gyms</h1>
            <p className="text-fdgym-light-gray max-w-2xl mx-auto">
              Discover our network of premium fitness centers across the country, all accessible with your FD GYM membership.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-fdgym-light-gray" />
                  <Input
                    type="text"
                    placeholder="Enter your location"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="bg-fdgym-dark-gray text-white border-fdgym-dark-gray focus:border-fdgym-red pl-10"
                  />
                </div>
                <Button className="bg-fdgym-red hover:bg-fdgym-neon-red text-white">
                  Find Gyms
                </Button>
              </div>
            </div>
          </div>
          
          <div className="glassmorphism rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-orbitron font-bold">Partner Gyms Near You</h2>
                <p className="text-fdgym-light-gray text-sm">
                  Showing {mockGyms.length} premium fitness centers
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  className={`${viewMode === 'grid' ? 'text-fdgym-red' : 'text-fdgym-light-gray'} hover:text-fdgym-neon-red hover:bg-transparent`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  className={`${viewMode === 'list' ? 'text-fdgym-red' : 'text-fdgym-light-gray'} hover:text-fdgym-neon-red hover:bg-transparent`}
                  onClick={() => setViewMode('list')}
                >
                  <GripVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockGyms.map((gym) => (
                <Card key={gym.id} className="glassmorphism border-fdgym-dark-gray overflow-hidden group h-full">
                  <div className="relative h-48">
                    <img
                      src={gym.image}
                      alt={gym.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="font-orbitron text-lg font-bold text-white">{gym.name}</h3>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-fdgym-neon-red mr-1" />
                            <span className="text-fdgym-light-gray">{gym.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center bg-fdgym-red px-2 py-1 rounded-md">
                          <Star className="h-3 w-3 text-white mr-1" />
                          <span className="text-white text-sm font-bold">{gym.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-fdgym-light-gray text-sm mb-4">{gym.address}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {gym.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="bg-fdgym-dark-gray/50 text-fdgym-light-gray text-xs px-2 py-1 rounded-md">
                          {feature}
                        </span>
                      ))}
                      {gym.features.length > 3 && (
                        <span className="bg-fdgym-dark-gray/50 text-fdgym-light-gray text-xs px-2 py-1 rounded-md">
                          +{gym.features.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-fdgym-light-gray text-sm">Distance: {gym.distance}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-fdgym-red text-fdgym-red hover:bg-fdgym-red hover:text-white"
                      >
                        <Navigation className="h-4 w-4 mr-1" />
                        Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {mockGyms.map((gym) => (
                <Card key={gym.id} className="glassmorphism border-fdgym-dark-gray overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative h-48 md:h-auto">
                      <img
                        src={gym.image}
                        alt={gym.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-orbitron text-xl font-bold">{gym.name}</h3>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-fdgym-red mr-1" />
                            <span className="text-fdgym-light-gray">{gym.address}</span>
                          </div>
                        </div>
                        <div className="flex items-center bg-fdgym-red px-2 py-1 rounded-md">
                          <Star className="h-3 w-3 text-white mr-1" />
                          <span className="text-white text-sm font-bold">{gym.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 my-4">
                        {gym.features.map((feature, index) => (
                          <span key={index} className="bg-fdgym-dark-gray/50 text-fdgym-light-gray text-xs px-2 py-1 rounded-md">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-fdgym-light-gray">Distance: {gym.distance}</span>
                        <div className="space-x-2">
                          <Button 
                            variant="outline" 
                            className="border-fdgym-red text-fdgym-red hover:bg-fdgym-red hover:text-white"
                          >
                            View Details
                          </Button>
                          <Button 
                            className="bg-fdgym-red hover:bg-fdgym-neon-red text-white"
                          >
                            <Navigation className="h-4 w-4 mr-2" />
                            Get Directions
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <p className="text-fdgym-light-gray mb-6">
              Can't find a partner gym near you? Contact us to suggest a new location.
            </p>
            <Button 
              variant="outline" 
              className="border-fdgym-red text-fdgym-red hover:bg-fdgym-red hover:text-white"
            >
              Suggest a Location
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PartnerGyms;
