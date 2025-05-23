
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculator } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const { toast } = useToast();

  const calculateBMI = () => {
    if (!height || !weight) {
      toast({
        title: "Missing Information",
        description: "Please enter both height and weight.",
        variant: "destructive",
      });
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    
    if (isNaN(heightInMeters) || isNaN(weightInKg)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for height and weight.",
        variant: "destructive",
      });
      return;
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    setBmiResult(parseFloat(bmi.toFixed(1)));
    
    // Determine BMI category
    if (bmi < 18.5) {
      setBmiCategory('Underweight');
    } else if (bmi >= 18.5 && bmi < 25) {
      setBmiCategory('Normal weight');
    } else if (bmi >= 25 && bmi < 30) {
      setBmiCategory('Overweight');
    } else {
      setBmiCategory('Obesity');
    }
  };

  return (
    <div className="glassmorphism rounded-xl p-6 max-w-md mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="h-6 w-6 text-fdgym-red" />
        <h3 className="font-orbitron text-xl font-bold">BMI Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="height" className="block text-fdgym-light-gray mb-1">
            Height (cm)
          </label>
          <Input
            id="height"
            type="number"
            placeholder="Enter your height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="bg-fdgym-dark-gray text-white border-fdgym-dark-gray focus:border-fdgym-red"
          />
        </div>
        
        <div>
          <label htmlFor="weight" className="block text-fdgym-light-gray mb-1">
            Weight (kg)
          </label>
          <Input
            id="weight"
            type="number"
            placeholder="Enter your weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="bg-fdgym-dark-gray text-white border-fdgym-dark-gray focus:border-fdgym-red"
          />
        </div>
        
        <Button 
          onClick={calculateBMI}
          className="w-full bg-fdgym-red hover:bg-fdgym-neon-red text-white"
        >
          Calculate BMI
        </Button>
        
        {bmiResult !== null && (
          <div className="mt-6 p-4 bg-fdgym-dark-gray/50 rounded-lg">
            <p className="text-center">Your BMI:</p>
            <p className="text-3xl font-bold text-center mb-2">{bmiResult}</p>
            <p className={`text-center font-medium ${
              bmiCategory === 'Normal weight' 
                ? 'text-green-400' 
                : 'text-fdgym-neon-red'
            }`}>
              {bmiCategory}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
