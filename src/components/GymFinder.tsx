
import { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mockGyms = [
  {
    id: 1,
    name: "FD Fitness Elite",
    address: "123 Main Street, Delhi",
    distance: "0.8 km",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "FD GYM Premium",
    address: "456 Park Avenue, Mumbai",
    distance: "1.2 km",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    name: "FD Powerhouse",
    address: "789 Gym Lane, Bangalore",
    distance: "2.5 km",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=400"
  }
];

const GymFinder = () => {
  const [searchLocation, setSearchLocation] = useState('');
  
  return (
    <div className="w-full">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGyms.map((gym) => (
          <div key={gym.id} className="glassmorphism rounded-xl overflow-hidden group">
            <div className="relative h-48">
              <img
                src={gym.image}
                alt={gym.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-orbitron text-lg font-bold text-white">{gym.name}</h3>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-fdgym-neon-red mr-1" />
                      <span className="text-fdgym-light-gray">{gym.distance}</span>
                    </div>
                  </div>
                  <div className="bg-fdgym-red px-2 py-1 rounded-md text-white text-sm font-bold">
                    {gym.rating}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-fdgym-light-gray text-sm mb-4">{gym.address}</p>
              <Button 
                variant="outline" 
                className="w-full border-fdgym-red text-fdgym-red hover:bg-fdgym-red hover:text-white group-hover:bg-fdgym-red group-hover:text-white transition-colors"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GymFinder;
