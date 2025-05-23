
export interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  dietSuggestion: string[];
  workoutSuggestion: string[];
}

export const calculateBMI = (weight: number, height: number): BMIResult => {
  // Height in meters, weight in kg
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const roundedBMI = Math.round(bmi * 10) / 10;
  
  let category: string;
  let color: string;
  let dietSuggestion: string[] = [];
  let workoutSuggestion: string[] = [];
  
  if (bmi < 18.5) {
    category = 'Underweight';
    color = 'text-blue-400';
    
    dietSuggestion = [
      'Increase calorie intake with nutrient-dense foods',
      'Consume more protein-rich foods like eggs, meat, and legumes',
      'Add healthy fats such as nuts, avocados, and olive oil',
      'Eat smaller meals more frequently throughout the day',
      'Include calorie-dense smoothies with fruits, milk, and protein powder'
    ];
    
    workoutSuggestion = [
      'Focus on strength training to build muscle mass',
      'Limit excessive cardio exercise',
      'Progressive overload with weights to stimulate muscle growth',
      'Compound exercises like squats, deadlifts, and bench press',
      'Allow adequate recovery time between workouts'
    ];
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal weight';
    color = 'text-green-400';
    
    dietSuggestion = [
      'Maintain balanced diet with plenty of fruits and vegetables',
      'Consume moderate amounts of protein, healthy fats, and complex carbs',
      'Stay hydrated with at least 8 glasses of water daily',
      'Practice portion control to maintain current weight',
      'Limit processed foods and added sugars'
    ];
    
    workoutSuggestion = [
      'Mix of cardio and strength training for overall fitness',
      'Aim for 150+ minutes of moderate exercise weekly',
      'Include flexibility and mobility training',
      'Try HIIT workouts for efficiency and metabolic health',
      'Stay active throughout the day with walking and movement breaks'
    ];
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    color = 'text-yellow-400';
    
    dietSuggestion = [
      'Create a moderate calorie deficit of 300-500 calories per day',
      'Increase protein intake to preserve muscle mass during weight loss',
      'Focus on high-fiber foods to increase satiety',
      'Reduce refined carbohydrates and processed foods',
      'Practice mindful eating and avoid emotional eating triggers'
    ];
    
    workoutSuggestion = [
      'Combine cardio exercise with strength training',
      'Start with low-impact activities like walking, swimming, or cycling',
      'Gradually increase workout intensity and duration',
      'Include metabolic resistance training circuits',
      'Aim for consistency with 4-5 workout sessions per week'
    ];
  } else {
    category = 'Obesity';
    color = 'text-fdgym-neon-red';
    
    dietSuggestion = [
      'Consult with a healthcare provider before starting any diet plan',
      'Focus on whole, unprocessed foods with high nutritional value',
      'Reduce portion sizes gradually to create sustainable habits',
      'Keep a food journal to track intake and identify patterns',
      'Stay consistent with meal timing to regulate hunger hormones'
    ];
    
    workoutSuggestion = [
      'Start with gentle, joint-friendly exercises like walking or water aerobics',
      'Focus on movement consistency rather than intensity initially',
      'Gradually build up exercise tolerance over time',
      'Include resistance training to build muscle and boost metabolism',
      'Consider working with a certified personal trainer for guidance'
    ];
  }
  
  return {
    bmi: roundedBMI,
    category,
    color,
    dietSuggestion,
    workoutSuggestion
  };
};
