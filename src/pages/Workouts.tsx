
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, BarChart, Dumbbell } from 'lucide-react';
import workouts from '@/data/workouts';

const Workouts = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const filteredWorkouts = filter === 'all' 
    ? workouts 
    : workouts.filter(workout => workout.category.toLowerCase() === filter.toLowerCase());
  
  const handleWorkoutClick = (id: number) => {
    navigate(`/workouts/${id}`);
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-fdgym-red rounded-full border-b-transparent animate-spin"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">Workout Library</h1>
          <p className="text-fdgym-light-gray max-w-2xl mx-auto">
            Explore our collection of professionally designed workouts for every fitness level.
            From beginners to advanced athletes, find the perfect routine to reach your goals.
          </p>
        </div>
        
        <Tabs 
          defaultValue="all" 
          className="w-full"
          onValueChange={setFilter}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-fdgym-dark-gray">
              <TabsTrigger value="all" className="data-[state=active]:bg-fdgym-red">All</TabsTrigger>
              <TabsTrigger value="cardio" className="data-[state=active]:bg-fdgym-red">Cardio</TabsTrigger>
              <TabsTrigger value="strength" className="data-[state=active]:bg-fdgym-red">Strength</TabsTrigger>
              <TabsTrigger value="abs" className="data-[state=active]:bg-fdgym-red">Abs</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkouts.map((workout) => (
                <Card 
                  key={workout.id}
                  className="glassmorphism border-fdgym-dark-gray overflow-hidden hover:border-fdgym-red transition-all duration-300 cursor-pointer"
                  onClick={() => handleWorkoutClick(workout.id)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={workout.imageUrl} 
                      alt={workout.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-orbitron font-bold mb-2">{workout.name}</h3>
                    <p className="text-fdgym-light-gray text-sm mb-4 line-clamp-2">
                      {workout.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-fdgym-light-gray">
                        <Dumbbell className="h-4 w-4 mr-1 text-fdgym-red" />
                        <span>{workout.category}</span>
                      </div>
                      
                      <div className="flex items-center text-fdgym-light-gray">
                        <BarChart className="h-4 w-4 mr-1 text-fdgym-red" />
                        <span>{workout.difficulty}</span>
                      </div>
                      
                      <div className="flex items-center text-fdgym-light-gray">
                        <Clock className="h-4 w-4 mr-1 text-fdgym-red" />
                        <span>{workout.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="cardio" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkouts.map((workout) => (
                <Card 
                  key={workout.id}
                  className="glassmorphism border-fdgym-dark-gray overflow-hidden hover:border-fdgym-red transition-all duration-300 cursor-pointer"
                  onClick={() => handleWorkoutClick(workout.id)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={workout.imageUrl} 
                      alt={workout.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-orbitron font-bold mb-2">{workout.name}</h3>
                    <p className="text-fdgym-light-gray text-sm mb-4 line-clamp-2">
                      {workout.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-fdgym-light-gray">
                        <Dumbbell className="h-4 w-4 mr-1 text-fdgym-red" />
                        <span>{workout.category}</span>
                      </div>
                      
                      <div className="flex items-center text-fdgym-light-gray">
                        <BarChart className="h-4 w-4 mr-1 text-fdgym-red" />
                        <span>{workout.difficulty}</span>
                      </div>
                      
                      <div className="flex items-center text-fdgym-light-gray">
                        <Clock className="h-4 w-4 mr-1 text-fdgym-red" />
                        <span>{workout.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="strength" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkouts.map((workout) => (
                <Card 
                  key={workout.id}
                  className="glassmorphism border-fdgym-dark-gray overflow-hidden hover:border-fdgym-red transition-all duration-300 cursor-pointer"
                  onClick={() => handleWorkoutClick(workout.id)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={workout.imageUrl} 
                      alt={workout.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-orbitron font-bold mb-2">{workout.name}</h3>
                    <p className="text-fdgym-light-gray text-sm mb-4 line-clamp-2">
                      {workout.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-fdgym-light-gray">
                        <Dumbbell className="h-4 w-4 mr-1 text-fdgym-red" />
                        <span>{workout.category}</span>
                      </div>
                      
                      <div className="flex items-center text-fdgym-light-gray">
                        <BarChart className="h-4 w-4 mr-1 text-fdgym-red" />
                        <span>{workout.difficulty}</span>
                      </div>
                      
                      <div className="flex items-center text-fdgym-light-gray">
                        <Clock className="h-4 w-4 mr-1 text-fdgym-red" />
                        <span>{workout.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="abs" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkouts.map((workout) => (
                <Card 
                  key={workout.id}
                  className="glassmorphism border-fdgym-dark-gray overflow-hidden hover:border-fdgym-red transition-all duration-300 cursor-pointer"
                  onClick={() => handleWorkoutClick(workout.id)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={workout.imageUrl} 
                      alt={workout.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-orbitron font-bold mb-2">{workout.name}</h3>
                    <p className="text-fdgym-light-gray text-sm mb-4 line-clamp-2">
                      {workout.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-fdgym-light-gray">
                        <Dumbbell className="h-4 w-4 mr-1 text-fdgym-red" />
                        <span>{workout.category}</span>
                      </div>
                      
                      <div className="flex items-center text-fdgym-light-gray">
                        <BarChart className="h-4 w-4 mr-1 text-fdgym-red" />
                        <span>{workout.difficulty}</span>
                      </div>
                      
                      <div className="flex items-center text-fdgym-light-gray">
                        <Clock className="h-4 w-4 mr-1 text-fdgym-red" />
                        <span>{workout.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Workouts;
