
import { useState } from 'react';
import { ChevronLeft, Clock, Dumbbell, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Define exercise types
interface Exercise {
  id: number;
  name: string;
  description: string;
  sets: number;
  reps: string;
  restTime: string;
  imageUrl: string;
  videoUrl?: string;
  tips: string[];
}

interface WorkoutDetailsProps {
  workout: {
    id: number;
    name: string;
    category: string;
    difficulty: string;
    duration: string;
    description: string;
    exercises: Exercise[];
  };
}

const ExerciseDetails: React.FC<WorkoutDetailsProps> = ({ workout }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/workouts');
  };
  
  const currentExercise = workout.exercises[currentExerciseIndex];
  
  const nextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };
  
  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 text-fdgym-light-gray hover:text-white"
        onClick={handleBack}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Workouts
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workout Information */}
        <div className="lg:col-span-1">
          <Card className="glassmorphism border-fdgym-red/30 h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-orbitron">{workout.name}</CardTitle>
              <div className="space-y-3 mt-4">
                <div className="flex items-center text-fdgym-light-gray">
                  <Dumbbell className="h-5 w-5 mr-2 text-fdgym-red" />
                  <span>{workout.category}</span>
                </div>
                <div className="flex items-center text-fdgym-light-gray">
                  <BarChart className="h-5 w-5 mr-2 text-fdgym-red" />
                  <span>{workout.difficulty}</span>
                </div>
                <div className="flex items-center text-fdgym-light-gray">
                  <Clock className="h-5 w-5 mr-2 text-fdgym-red" />
                  <span>{workout.duration}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-fdgym-light-gray">{workout.description}</p>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Workout Plan</h3>
                <ul className="space-y-2">
                  {workout.exercises.map((exercise, index) => (
                    <li 
                      key={exercise.id} 
                      className={`px-3 py-2 rounded-md cursor-pointer ${
                        currentExerciseIndex === index 
                          ? 'bg-fdgym-red text-white' 
                          : 'hover:bg-fdgym-dark-gray transition-colors'
                      }`}
                      onClick={() => setCurrentExerciseIndex(index)}
                    >
                      {exercise.name}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Exercise Details */}
        <div className="lg:col-span-2">
          <Card className="glassmorphism border-fdgym-dark-gray">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-orbitron">
                  {currentExercise.name}
                </CardTitle>
                <div className="text-fdgym-light-gray text-sm">
                  Exercise {currentExerciseIndex + 1} of {workout.exercises.length}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-fdgym-dark-gray/50 flex items-center justify-center">
                {currentExercise.videoUrl ? (
                  <iframe 
                    src={currentExercise.videoUrl} 
                    title={currentExercise.name}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img 
                    src={currentExercise.imageUrl || "https://i.ytimg.com/vi/J_mlZ-n0IG8/maxresdefault.jpg"} 
                    alt={currentExercise.name}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="glassmorphism rounded-lg p-4 border-fdgym-dark-gray">
                  <div className="text-fdgym-light-gray text-sm mb-1">Sets</div>
                  <div className="text-xl font-bold">{currentExercise.sets}</div>
                </div>
                <div className="glassmorphism rounded-lg p-4 border-fdgym-dark-gray">
                  <div className="text-fdgym-light-gray text-sm mb-1">Reps</div>
                  <div className="text-xl font-bold">{currentExercise.reps}</div>
                </div>
                <div className="glassmorphism rounded-lg p-4 border-fdgym-dark-gray">
                  <div className="text-fdgym-light-gray text-sm mb-1">Rest</div>
                  <div className="text-xl font-bold">{currentExercise.restTime}</div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-fdgym-light-gray">{currentExercise.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Tips</h3>
                <ul className="space-y-2 text-fdgym-light-gray">
                  {currentExercise.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block h-5 w-5 rounded-full bg-fdgym-red text-white text-xs flex items-center justify-center mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button 
                  onClick={prevExercise}
                  disabled={currentExerciseIndex === 0}
                  variant="outline"
                  className="border-fdgym-red text-fdgym-red hover:bg-fdgym-red hover:text-white disabled:opacity-50"
                >
                  Previous Exercise
                </Button>
                <Button 
                  onClick={nextExercise}
                  disabled={currentExerciseIndex === workout.exercises.length - 1}
                  className="bg-fdgym-red hover:bg-fdgym-neon-red text-white disabled:opacity-50"
                >
                  Next Exercise
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetails;
