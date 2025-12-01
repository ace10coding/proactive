import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft } from "lucide-react";

type WorkoutPlan = {
  nickname: string;
  gender: string;
  height: number;
  heightUnit: string;
  weight: number;
  weightUnit: string;
  age: number;
  goal: string;
  focusAreas: string[];
  experience: string;
  frequency: string;
  equipment: string;
  plan: any[];
};

const WorkoutPlanGenerator = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    nickname: "",
    gender: "",
    height: "",
    heightUnit: "cm",
    weight: "",
    weightUnit: "kg",
    age: "",
    goal: "",
    focusAreas: [] as string[],
    experience: "",
    frequency: "",
    equipment: "",
  });
  const { toast } = useToast();

  const bodyParts = [
    "Chest", "Triceps", "Lats", "Biceps", "Shoulder", 
    "Abs", "Forearms", "Traps", "Glutes", "Quads", "Hamstring", "Calves"
  ];

  const handleFocusAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }));
  };

  const generatePlan = () => {
    const plan: any[] = [];
    const daysPerWeek = parseInt(formData.frequency);
    const weeksInMonth = 4;

    // Generate workout plan based on user inputs
    for (let week = 1; week <= weeksInMonth; week++) {
      for (let day = 1; day <= daysPerWeek; day++) {
        const focusArea = formData.focusAreas[day % formData.focusAreas.length] || "Full Body";
        const exercises = generateExercises(focusArea, formData.goal, formData.equipment, formData.experience);
        
        plan.push({
          week,
          day,
          focusArea,
          exercises,
        });
      }
    }

    const workoutPlan: WorkoutPlan = {
      ...formData,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      age: parseInt(formData.age),
      plan,
    };

    localStorage.setItem("workoutPlan", JSON.stringify(workoutPlan));
    
    toast({
      title: "Plan Generated!",
      description: "Your personalized 1-month workout plan is ready.",
    });

    window.location.href = "/workouts?view=plan";
  };

  const generateExercises = (focusArea: string, goal: string, equipment: string, experience: string) => {
    const exercises: any[] = [];
    
    // Base rep ranges based on goal and experience
    let reps = "10-12";
    let sets = 3;
    
    if (goal === "build") {
      reps = experience === "newbie" ? "8-10" : experience === "advanced" ? "6-8" : "8-12";
      sets = experience === "advanced" ? 4 : 3;
    } else if (goal === "lose") {
      reps = "12-15";
      sets = 3;
    } else {
      reps = "10-12";
      sets = 3;
    }

    // Sample exercise database based on equipment and focus area
    const exerciseDb: any = {
      none: {
        Chest: ["Push-ups", "Wide Push-ups", "Diamond Push-ups", "Decline Push-ups"],
        Triceps: ["Diamond Push-ups", "Tricep Dips", "Close Grip Push-ups"],
        Biceps: ["Chin-ups", "Inverted Rows"],
        Shoulder: ["Pike Push-ups", "Handstand Hold", "Plank to Down Dog"],
        Abs: ["Crunches", "Plank", "Bicycle Crunches", "Leg Raises"],
        Legs: ["Squats", "Lunges", "Jump Squats", "Wall Sit"],
      },
      dumbbells: {
        Chest: ["Dumbbell Press", "Dumbbell Flyes", "Incline Dumbbell Press"],
        Triceps: ["Overhead Tricep Extension", "Tricep Kickbacks"],
        Biceps: ["Bicep Curls", "Hammer Curls", "Concentration Curls"],
        Shoulder: ["Shoulder Press", "Lateral Raises", "Front Raises"],
        Abs: ["Russian Twists with Dumbbell", "Weighted Crunches"],
        Legs: ["Goblet Squats", "Dumbbell Lunges", "Romanian Deadlifts"],
      },
      full: {
        Chest: ["Barbell Bench Press", "Cable Flyes", "Incline Press", "Chest Press Machine"],
        Triceps: ["Cable Pushdowns", "Skull Crushers", "Close Grip Bench"],
        Biceps: ["Barbell Curls", "Preacher Curls", "Cable Curls"],
        Shoulder: ["Military Press", "Cable Lateral Raises", "Face Pulls"],
        Abs: ["Cable Crunches", "Hanging Leg Raises", "Ab Wheel"],
        Legs: ["Squats", "Leg Press", "Hamstring Curls", "Leg Extensions"],
      },
    };

    const equipmentKey = equipment === "none" ? "none" : equipment === "dumbbells" ? "dumbbells" : "full";
    const areaExercises = exerciseDb[equipmentKey][focusArea] || exerciseDb[equipmentKey].Chest;
    
    const numExercises = experience === "newbie" ? 3 : experience === "advanced" ? 5 : 4;
    
    for (let i = 0; i < numExercises && i < areaExercises.length; i++) {
      exercises.push({
        name: areaExercises[i],
        sets,
        reps,
        rest: goal === "lose" ? "30-45 sec" : "60-90 sec",
      });
    }

    return exercises;
  };

  const nextStep = () => {
    if (step === 0 && (!formData.nickname || !formData.gender || !formData.height || !formData.weight || !formData.age)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    if (step === 1 && (!formData.goal || formData.focusAreas.length === 0)) {
      toast({
        title: "Missing Information",
        description: "Please select your goal and at least one focus area.",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && (!formData.experience || !formData.frequency || !formData.equipment)) {
      toast({
        title: "Missing Information",
        description: "Please complete all selections.",
        variant: "destructive",
      });
      return;
    }
    
    if (step < 2) {
      setStep(step + 1);
    } else {
      generatePlan();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Create Your Workout Plan</CardTitle>
          <CardDescription>
            <strong>Privacy Note:</strong> No information is stored on our servers. Your plan is saved locally on your device.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex justify-between mb-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`flex-1 h-2 mx-1 rounded-full transition-colors ${
                  i <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Step 0: Basic Info */}
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  id="nickname"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  placeholder="Enter your nickname"
                />
              </div>

              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="height">Height</Label>
                <div className="flex gap-2">
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="Enter height"
                    className="flex-1"
                  />
                  <Select value={formData.heightUnit} onValueChange={(value) => setFormData({ ...formData, heightUnit: value })}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="ft">ft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="weight">Weight</Label>
                <div className="flex gap-2">
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="Enter weight"
                    className="flex-1"
                  />
                  <Select value={formData.weightUnit} onValueChange={(value) => setFormData({ ...formData, weightUnit: value })}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lb">lb</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Enter your age"
                />
              </div>
            </div>
          )}

          {/* Step 1: Goals and Focus Areas */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label>What is your main goal?</Label>
                <Select value={formData.goal} onValueChange={(value) => setFormData({ ...formData, goal: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="build">Build Muscle - Lower weight with higher reps, work on medium and small muscles</SelectItem>
                    <SelectItem value="keep">Keep Fit - Start with basic muscle workout plans, keep medium and small muscles</SelectItem>
                    <SelectItem value="lose">Lose Weight - Lower weight with higher reps, shorter rest times with cardio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Which parts do you want to focus on?</Label>
                <p className="text-sm text-muted-foreground mb-3">Select all that apply</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {bodyParts.map((part) => (
                    <div key={part} className="flex items-center space-x-2">
                      <Checkbox
                        id={part}
                        checked={formData.focusAreas.includes(part)}
                        onCheckedChange={() => handleFocusAreaToggle(part)}
                      />
                      <label htmlFor={part} className="text-sm cursor-pointer">
                        {part}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Experience and Equipment */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label>How experienced are you with Fitness?</Label>
                <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newbie">Totally newbie - I never worked out before</SelectItem>
                    <SelectItem value="beginner">Beginner - I worked out before but not seriously</SelectItem>
                    <SelectItem value="intermediate">Intermediate - I workout out before</SelectItem>
                    <SelectItem value="advanced">Advanced - I have been working out for years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>How often do you plan to workout?</Label>
                <Select value={formData.frequency} onValueChange={(value) => setFormData({ ...formData, frequency: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 time/week</SelectItem>
                    <SelectItem value="2">2 times/week</SelectItem>
                    <SelectItem value="3">3 times/week</SelectItem>
                    <SelectItem value="4">4 times/week</SelectItem>
                    <SelectItem value="5">5 times/week</SelectItem>
                    <SelectItem value="6">6 times/week</SelectItem>
                    <SelectItem value="7">7 times/week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>What equipment do you have?</Label>
                <Select value={formData.equipment} onValueChange={(value) => setFormData({ ...formData, equipment: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No equipment - Home workouts with bodyweight only</SelectItem>
                    <SelectItem value="dumbbells">Dumbbells - Only exercises with Dumbbells and bodyweight</SelectItem>
                    <SelectItem value="garage">Garage gym - Exercises with barbell, dumbbell and bodyweight</SelectItem>
                    <SelectItem value="full">Full gym - All exercises with machines, barbell and all</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button onClick={nextStep}>
              {step === 2 ? "Generate Plan" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutPlanGenerator;
