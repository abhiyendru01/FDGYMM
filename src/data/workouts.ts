
export interface Exercise {
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

export interface Workout {
  id: number;
  name: string;
  category: string;
  difficulty: string;
  duration: string;
  description: string;
  imageUrl: string;
  exercises: Exercise[];
}

const workouts: Workout[] = [
  {
    id: 1,
    name: "Full Body HIIT",
    category: "Cardio",
    difficulty: "Intermediate",
    duration: "30 min",
    description: "A high-intensity interval training workout that targets your entire body, designed to build strength and improve cardiovascular endurance.",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
    exercises: [
      {
        id: 101,
        name: "Burpees",
        description: "A full-body exercise that combines a squat, push-up, and jump, providing cardiovascular benefits and targeting multiple muscle groups simultaneously.",
        sets: 3,
        reps: "12 reps",
        restTime: "30 sec",
        imageUrl: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=2069&auto=format&fit=crop",
        tips: [
          "Keep your core tight throughout the movement",
          "Land softly on your toes when jumping",
          "Maintain a straight back during the push-up portion"
        ]
      },
      {
        id: 102,
        name: "Mountain Climbers",
        description: "A dynamic exercise that targets your core, shoulders, and legs while elevating your heart rate for cardiovascular conditioning.",
        sets: 3,
        reps: "30 sec",
        restTime: "20 sec",
        imageUrl: "https://images.unsplash.com/photo-1598971639058-a2eb800b373a?q=80&w=1638&auto=format&fit=crop",
        tips: [
          "Keep your hips low and aligned with your shoulders",
          "Move your knees toward your chest quickly but with control",
          "Keep your wrists directly under your shoulders"
        ]
      },
      {
        id: 103,
        name: "Jump Squats",
        description: "A plyometric exercise that builds lower body strength and power while increasing your heart rate for cardiovascular benefits.",
        sets: 3,
        reps: "15 reps",
        restTime: "30 sec",
        imageUrl: "https://images.unsplash.com/photo-1434608519344-49d77a124f9a?q=80&w=1734&auto=format&fit=crop",
        tips: [
          "Keep your weight in your heels during the squat",
          "Land softly with knees slightly bent",
          "Push through your entire foot when jumping up"
        ]
      },
      {
        id: 104,
        name: "Plank to Push-up",
        description: "This exercise transitions between a forearm plank and a high plank, engaging your core, shoulders, and chest muscles.",
        sets: 3,
        reps: "10 reps per side",
        restTime: "45 sec",
        imageUrl: "https://images.unsplash.com/photo-1566241142559-c1b4757626b9?q=80&w=1926&auto=format&fit=crop",
        tips: [
          "Keep your hips level throughout the movement",
          "Engage your core to prevent your lower back from sagging",
          "Move one arm at a time, alternating sides"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Upper Body Strength",
    category: "Strength",
    difficulty: "Advanced",
    duration: "45 min",
    description: "Focus on building upper body strength with targeted exercises for chest, back, shoulders, and arms. Perfect for increasing muscle mass and definition.",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1770&auto=format&fit=crop",
    exercises: [
      {
        id: 201,
        name: "Bench Press",
        description: "A compound exercise that primarily targets the chest muscles, along with the shoulders and triceps.",
        sets: 4,
        reps: "8-10 reps",
        restTime: "90 sec",
        imageUrl: "https://images.unsplash.com/photo-1534368959876-26bf04f2c947?q=80&w=1770&auto=format&fit=crop",
        tips: [
          "Keep your feet flat on the floor",
          "Maintain a slight arch in your lower back",
          "Lower the bar to your mid-chest and press up in a straight line"
        ]
      },
      {
        id: 202,
        name: "Pull-ups",
        description: "A compound upper body exercise that builds strength in the back, shoulders, and arms.",
        sets: 4,
        reps: "6-8 reps",
        restTime: "90 sec",
        imageUrl: "https://images.unsplash.com/photo-1598502608215-e0e0fdf90339?q=80&w=1807&auto=format&fit=crop",
        tips: [
          "Start from a dead hang with arms fully extended",
          "Pull yourself up until your chin is over the bar",
          "Lower yourself with control"
        ]
      },
      {
        id: 203,
        name: "Military Press",
        description: "An overhead press exercise that targets the shoulder muscles and triceps.",
        sets: 3,
        reps: "10 reps",
        restTime: "75 sec",
        imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1769&auto=format&fit=crop",
        tips: [
          "Keep your core engaged to protect your lower back",
          "Press the weight directly overhead, not in front of you",
          "Avoid arching your back during the movement"
        ]
      },
      {
        id: 204,
        name: "Barbell Rows",
        description: "A compound exercise that targets the muscles of the upper and middle back, as well as the biceps.",
        sets: 3,
        reps: "10-12 reps",
        restTime: "75 sec",
        imageUrl: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?q=80&w=1771&auto=format&fit=crop",
        tips: [
          "Hinge at your hips with a flat back",
          "Pull the bar to your lower ribcage",
          "Keep your elbows close to your body"
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Core Crusher",
    category: "Abs",
    difficulty: "Beginner",
    duration: "20 min",
    description: "A focused core workout to strengthen your abdominal muscles, improve stability, and enhance your overall fitness performance.",
    imageUrl: "https://images.unsplash.com/photo-1571019613591-2dd9d74e1f9d?q=80&w=1770&auto=format&fit=crop",
    exercises: [
      {
        id: 301,
        name: "Plank",
        description: "An isometric core exercise that engages multiple muscle groups to improve stability and strength.",
        sets: 3,
        reps: "30-60 sec",
        restTime: "30 sec",
        imageUrl: "https://images.unsplash.com/photo-1593164842264-854604db2260?q=80&w=1887&auto=format&fit=crop",
        tips: [
          "Keep your body in a straight line from head to heels",
          "Engage your core by pulling your belly button toward your spine",
          "Don't let your hips sag or pike up"
        ]
      },
      {
        id: 302,
        name: "Russian Twists",
        description: "A rotational exercise that targets the obliques and helps develop core stability.",
        sets: 3,
        reps: "20 reps (10 each side)",
        restTime: "30 sec",
        imageUrl: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=1771&auto=format&fit=crop",
        tips: [
          "Sit with your knees bent and feet slightly raised",
          "Lean back slightly to engage your core",
          "Rotate from your torso, not just your arms"
        ]
      },
      {
        id: 303,
        name: "Bicycle Crunches",
        description: "A dynamic exercise that engages both the rectus abdominis and oblique muscles.",
        sets: 3,
        reps: "20 reps (10 each side)",
        restTime: "30 sec",
        imageUrl: "https://images.unsplash.com/photo-1601986313624-28c11ac26334?q=80&w=1770&auto=format&fit=crop",
        tips: [
          "Keep your lower back pressed into the floor",
          "Touch your elbow to the opposite knee with each repetition",
          "Focus on the rotation and contraction, not speed"
        ]
      },
      {
        id: 304,
        name: "Leg Raises",
        description: "An exercise that targets the lower abdominal muscles and hip flexors.",
        sets: 3,
        reps: "15 reps",
        restTime: "45 sec",
        imageUrl: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?q=80&w=1887&auto=format&fit=crop",
        tips: [
          "Keep your lower back pressed into the floor",
          "Raise your legs slowly with control",
          "Lower your legs without touching the floor to maintain tension"
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Leg Day",
    category: "Strength",
    difficulty: "Intermediate",
    duration: "40 min",
    description: "A comprehensive lower body workout targeting all major muscle groups in your legs for improved strength, power, and endurance.",
    imageUrl: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=1769&auto=format&fit=crop",
    exercises: [
      {
        id: 401,
        name: "Barbell Squats",
        description: "A compound exercise that primarily targets the quadriceps, hamstrings, and glutes.",
        sets: 4,
        reps: "10-12 reps",
        restTime: "90 sec",
        imageUrl: "https://images.unsplash.com/photo-1567598508481-65a7a5553756?q=80&w=1770&auto=format&fit=crop",
        tips: [
          "Keep your chest up and back straight",
          "Push through your heels as you stand up",
          "Descend until your thighs are parallel to the ground or lower"
        ]
      },
      {
        id: 402,
        name: "Romanian Deadlifts",
        description: "A hip-hinge movement that targets the hamstrings, glutes, and lower back.",
        sets: 3,
        reps: "10-12 reps",
        restTime: "75 sec",
        imageUrl: "https://images.unsplash.com/photo-1579465196072-5a1a578b03d9?q=80&w=1818&auto=format&fit=crop",
        tips: [
          "Keep a slight bend in your knees throughout",
          "Hinge at the hips while maintaining a flat back",
          "Lower the weight until you feel a stretch in your hamstrings"
        ]
      },
      {
        id: 403,
        name: "Walking Lunges",
        description: "A dynamic lower body exercise that works the quadriceps, hamstrings, and glutes while improving balance and coordination.",
        sets: 3,
        reps: "10 steps each leg",
        restTime: "60 sec",
        imageUrl: "https://images.unsplash.com/photo-1556917455-d21a4b4be8ee?q=80&w=1887&auto=format&fit=crop",
        tips: [
          "Take a big step forward and lower your back knee toward the ground",
          "Keep your front knee aligned with your ankle",
          "Push through the heel of your front foot to step forward"
        ]
      },
      {
        id: 404,
        name: "Calf Raises",
        description: "An isolation exercise that targets the gastrocnemius and soleus muscles in your calves.",
        sets: 3,
        reps: "15-20 reps",
        restTime: "45 sec",
        imageUrl: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?q=80&w=1770&auto=format&fit=crop",
        tips: [
          "Rise up onto the balls of your feet as high as possible",
          "Lower your heels below the level of the step for a full stretch",
          "Perform the movement slowly and with control"
        ]
      }
    ]
  }
];

export default workouts;
