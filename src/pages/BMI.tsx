
import { useState } from 'react';
import { Activity, Utensils, Info, BarChart } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { calculateBMI, BMIResult } from '@/lib/bmi';

const BMI = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);
  const { toast } = useToast();

  const handleCalculate = () => {
    if (!height || !weight) {
      toast({
        title: "Missing Information",
        description: "Please enter both height and weight.",
        variant: "destructive",
      });
      return;
    }

    const heightInCm = parseFloat(height);
    const weightInKg = parseFloat(weight);
    
    if (isNaN(heightInCm) || isNaN(weightInKg)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for height and weight.",
        variant: "destructive",
      });
      return;
    }

    const result = calculateBMI(weightInKg, heightInCm);
    setBmiResult(result);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-orbitron font-bold mb-4">AI-Powered BMI Calculator</h1>
            <p className="text-fdgym-light-gray max-w-2xl mx-auto">
              Our advanced BMI calculator provides personalized health insights, diet recommendations, and workout suggestions based on your unique body metrics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="glassmorphism border-fdgym-dark-gray h-full">
                <CardHeader>
                  <CardTitle className="text-xl font-orbitron">Calculate Your BMI</CardTitle>
                  <CardDescription className="text-fdgym-light-gray">
                    Enter your details to get personalized recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-fdgym-light-gray">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="Enter your height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="bg-fdgym-dark-gray text-white border-fdgym-dark-gray focus:border-fdgym-red"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-fdgym-light-gray">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Enter your weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="bg-fdgym-dark-gray text-white border-fdgym-dark-gray focus:border-fdgym-red"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-fdgym-light-gray">Age (optional)</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="bg-fdgym-dark-gray text-white border-fdgym-dark-gray focus:border-fdgym-red"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-fdgym-light-gray">Gender (optional)</Label>
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-fdgym-dark-gray text-white border-fdgym-dark-gray rounded-md h-10 px-3 focus:border-fdgym-red"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <Button 
                    onClick={handleCalculate}
                    className="w-full bg-fdgym-red hover:bg-fdgym-neon-red text-white mt-4"
                  >
                    Calculate BMI
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              {bmiResult ? (
                <div className="space-y-6">
                  <Card className="glassmorphism border-fdgym-dark-gray">
                    <CardHeader>
                      <CardTitle className="text-xl font-orbitron">Your BMI Results</CardTitle>
                      <CardDescription className="text-fdgym-light-gray">
                        Based on the information you provided
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center mb-6">
                        <div className="text-5xl font-bold mb-2">{bmiResult.bmi}</div>
                        <div className={`text-lg font-medium ${bmiResult.color}`}>
                          {bmiResult.category}
                        </div>
                      </div>
                      
                      <div className="w-full bg-fdgym-dark-gray/50 h-4 rounded-full mb-6 overflow-hidden relative">
                        <div className="absolute inset-0 flex">
                          <div className="w-1/4 bg-blue-500 h-full" />
                          <div className="w-1/4 bg-green-500 h-full" />
                          <div className="w-1/4 bg-yellow-500 h-full" />
                          <div className="w-1/4 bg-red-500 h-full" />
                        </div>
                        
                        <div 
                          className="absolute top-0 w-4 h-4 bg-white rounded-full transform -translate-x-1/2"
                          style={{ 
                            left: `${Math.min(
                              Math.max((bmiResult.bmi / 40) * 100, 0), 
                              100
                            )}%` 
                          }}
                        />
                      </div>
                      
                      <div className="flex justify-between text-xs text-fdgym-light-gray mb-8">
                        <div>Underweight<br />{'<18.5'}</div>
                        <div>Normal<br />18.5-25</div>
                        <div>Overweight<br />25-30</div>
                        <div>Obesity<br />{'>30'}</div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 bg-fdgym-dark-gray/30 rounded-lg">
                        <Info className="h-5 w-5 text-fdgym-light-gray flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-fdgym-light-gray text-sm">
                            BMI is a measure of body fat based on height and weight. It's a useful indicator but doesn't account for factors like muscle mass, bone density, and overall body composition. For a complete health assessment, consult with a healthcare professional.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glassmorphism border-fdgym-dark-gray">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <Utensils className="h-6 w-6 text-fdgym-red" />
                          <CardTitle className="text-lg font-orbitron">Diet Recommendations</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {bmiResult.dietSuggestion.map((suggestion, index) => (
                            <li key={index} className="flex items-start">
                              <div className="h-5 w-5 rounded-full bg-fdgym-red flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                                <span className="text-xs font-bold">{index + 1}</span>
                              </div>
                              <span className="text-fdgym-light-gray text-sm">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="glassmorphism border-fdgym-dark-gray">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <Activity className="h-6 w-6 text-fdgym-red" />
                          <CardTitle className="text-lg font-orbitron">Workout Suggestions</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {bmiResult.workoutSuggestion.map((suggestion, index) => (
                            <li key={index} className="flex items-start">
                              <div className="h-5 w-5 rounded-full bg-fdgym-red flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                                <span className="text-xs font-bold">{index + 1}</span>
                              </div>
                              <span className="text-fdgym-light-gray text-sm">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="glassmorphism border-fdgym-dark-gray">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <BarChart className="h-6 w-6 text-fdgym-red" />
                        <CardTitle className="text-lg font-orbitron">Health Insights</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-fdgym-light-gray mb-4">
                        Based on your BMI of <span className="font-bold">{bmiResult.bmi}</span>, which is classified as <span className={`font-bold ${bmiResult.color}`}>{bmiResult.category}</span>, here are some health insights:
                      </p>
                      
                      <div className="space-y-4">
                        {bmiResult.category === 'Underweight' && (
                          <>
                            <p className="text-fdgym-light-gray text-sm">
                              Being underweight might indicate nutritional deficiencies or underlying health conditions. Focus on gaining healthy weight through nutrient-dense foods and strength training.
                            </p>
                            <div className="p-3 bg-blue-500/10 rounded-lg">
                              <h4 className="font-medium text-blue-400 mb-1">Priority Health Focus:</h4>
                              <p className="text-fdgym-light-gray text-sm">
                                Work with a nutritionist to create a calorie-surplus meal plan. Consider a comprehensive health check to rule out any underlying conditions affecting weight.
                              </p>
                            </div>
                          </>
                        )}
                        
                        {bmiResult.category === 'Normal weight' && (
                          <>
                            <p className="text-fdgym-light-gray text-sm">
                              Your weight is within a healthy range. Focus on maintaining your current healthy habits while continuing to build strength and cardiovascular fitness.
                            </p>
                            <div className="p-3 bg-green-500/10 rounded-lg">
                              <h4 className="font-medium text-green-400 mb-1">Priority Health Focus:</h4>
                              <p className="text-fdgym-light-gray text-sm">
                                Maintain your current weight while focusing on overall fitness, flexibility, and strength. Consider regular health check-ups to monitor other important health metrics beyond BMI.
                              </p>
                            </div>
                          </>
                        )}
                        
                        {bmiResult.category === 'Overweight' && (
                          <>
                            <p className="text-fdgym-light-gray text-sm">
                              Being overweight may increase risk for certain health conditions. Focus on gradual weight loss through sustainable diet changes and regular exercise.
                            </p>
                            <div className="p-3 bg-yellow-500/10 rounded-lg">
                              <h4 className="font-medium text-yellow-400 mb-1">Priority Health Focus:</h4>
                              <p className="text-fdgym-light-gray text-sm">
                                Aim for a gradual weight loss of 0.5-1kg per week through a balanced diet and increased physical activity. Monitor blood pressure and cholesterol levels regularly.
                              </p>
                            </div>
                          </>
                        )}
                        
                        {bmiResult.category === 'Obesity' && (
                          <>
                            <p className="text-fdgym-light-gray text-sm">
                              Obesity is associated with increased risk of various health conditions including heart disease, diabetes, and joint problems. Consult with healthcare professionals for a comprehensive approach.
                            </p>
                            <div className="p-3 bg-red-500/10 rounded-lg">
                              <h4 className="font-medium text-red-400 mb-1">Priority Health Focus:</h4>
                              <p className="text-fdgym-light-gray text-sm">
                                Work with healthcare providers to create a comprehensive weight management plan. Focus on sustainable lifestyle changes rather than rapid weight loss. Consider regular screening for related health conditions.
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="glassmorphism border-fdgym-dark-gray h-full flex flex-col justify-center">
                  <CardContent className="text-center p-12">
                    <div className="glassmorphism inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto">
                      <BarChart className="h-8 w-8 text-fdgym-red" />
                    </div>
                    <h3 className="text-2xl font-orbitron font-bold mb-4">
                      Get Your Personalized Health Analysis
                    </h3>
                    <p className="text-fdgym-light-gray mb-6 max-w-md mx-auto">
                      Enter your details in the calculator to receive AI-generated diet suggestions, workout recommendations, and health insights based on your BMI.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500" />
                        <span className="text-fdgym-light-gray text-sm">Underweight</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                        <span className="text-fdgym-light-gray text-sm">Normal</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <span className="text-fdgym-light-gray text-sm">Overweight</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <span className="text-fdgym-light-gray text-sm">Obesity</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BMI;
