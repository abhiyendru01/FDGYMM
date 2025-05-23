
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, BarChart, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import workoutsData, { Workout } from '@/data/workouts';

// Define a local interface for the formatted workout to avoid type conflicts
interface FormattedWorkout {
  id: number;
  name: string;
  category: string;
  difficulty: string;
  duration: string;
  imageUrl: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
    imageUrl: string;
    description: string;
  }[];
}

const WorkoutDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [workout, setWorkout] = useState<FormattedWorkout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWorkout = async () => {
      setIsLoading(true);
      
      try {
        if (!id) {
          throw new Error("Workout ID is missing");
        }
        
        // Find workout from the local data
        const workoutId = parseInt(id, 10);
        const foundWorkout = workoutsData.find(w => w.id === workoutId);
        
        if (!foundWorkout) {
          throw new Error("Workout not found");
        }
        
        // Convert to the formatted workout structure
        const formattedWorkout: FormattedWorkout = {
          id: foundWorkout.id,
          name: foundWorkout.name,
          category: foundWorkout.category,
          difficulty: foundWorkout.difficulty,
          duration: foundWorkout.duration,
          imageUrl: foundWorkout.imageUrl,
          exercises: foundWorkout.exercises.map(exercise => ({
            name: exercise.name,
            sets: exercise.sets.toString(),
            reps: exercise.reps,
            imageUrl: exercise.imageUrl,
            description: exercise.description
          }))
        };
        
        setWorkout(formattedWorkout);
      } catch (error) {
        console.error('Error fetching workout:', error);
        toast({
          title: "Error",
          description: "Failed to load workout details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWorkout();
  }, [id, toast]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div>
            <div className="mb-6">
              <Skeleton className="h-12 w-64" />
            </div>
            <Card className="glassmorphism border-fdgym-dark-gray mb-6">
              <CardHeader>
                <div className="flex items-center gap-6">
                  <Skeleton className="h-40 w-40 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <div className="flex flex-wrap gap-3">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                
                <div className="mt-8">
                  <Skeleton className="h-6 w-40 mb-4" />
                  {Array(3).fill(0).map((_, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex gap-4 items-start">
                        <Skeleton className="h-24 w-24 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-6 w-40" />
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!workout) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Workout Not Found</h1>
            <p className="text-fdgym-light-gray">
              The workout you are looking for does not exist or has been removed.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-orbitron font-bold mb-6">{workout.name}</h1>
          
          <Card className="glassmorphism border-fdgym-dark-gray mb-6">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-auto">
                  <div className="w-full md:w-40 h-40 rounded-lg overflow-hidden">
                    <img 
                      src={workout.imageUrl || 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e'} 
                      alt={workout.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-orbitron mb-4">{workout.name}</CardTitle>
                  <div className="flex flex-wrap gap-3">
                    <div className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium bg-fdgym-dark-gray text-white">
                      <Clock className="mr-1.5 h-4 w-4 text-fdgym-red" />
                      {workout.duration}
                    </div>
                    <div className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium bg-fdgym-dark-gray text-white capitalize">
                      <BarChart className="mr-1.5 h-4 w-4 text-fdgym-red" />
                      {workout.difficulty}
                    </div>
                    <div className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium bg-fdgym-dark-gray text-white capitalize">
                      <User className="mr-1.5 h-4 w-4 text-fdgym-red" />
                      {workout.category}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-fdgym-light-gray mb-8">
                <p>This {workout.category} workout is designed to challenge your {workout.category === 'strength' ? 'muscles' : workout.category === 'cardio' ? 'cardiovascular system' : 'body'} through a series of {workout.difficulty} level exercises. Perfect for a {workout.duration} session.</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Exercises</h2>
                
                {workout.exercises && workout.exercises.length > 0 ? (
                  <div className="space-y-6">
                    {workout.exercises.map((exercise, index) => (
                      <div key={index} className="glassmorphism p-4 rounded-lg border-fdgym-dark-gray">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full md:w-24 h-24 rounded-lg overflow-hidden">
                            <img 
                              src={exercise.imageUrl || `https://i.ytimg.com/vi/J_mlZ-n0IG8/maxresdefault.jpg=${index}`} 
                              alt={exercise.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-1">{exercise.name}</h3>
                            <div className="text-fdgym-light-gray text-sm mb-2">{exercise.sets} sets • {exercise.reps}</div>
                            <p className="text-sm">
                              {exercise.description || `Perform this exercise with proper form and control to maximize results and minimize risk of injury.`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-fdgym-light-gray">
                    <p>No exercises found for this workout.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default WorkoutDetail;
