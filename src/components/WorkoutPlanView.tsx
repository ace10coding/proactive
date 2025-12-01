import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type WorkoutPlan = {
  nickname: string;
  goal: string;
  experience: string;
  frequency: string;
  equipment: string;
  plan: Array<{
    week: number;
    day: number;
    focusArea: string;
    exercises: Array<{
      name: string;
      sets: number;
      reps: string;
      rest: string;
    }>;
  }>;
};

const WorkoutPlanView = () => {
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [selectedWeek, setSelectedWeek] = useState(1);

  useEffect(() => {
    const savedPlan = localStorage.getItem("workoutPlan");
    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }
  }, []);

  const handleDeletePlan = () => {
    localStorage.removeItem("workoutPlan");
    window.location.href = "/workouts";
  };

  if (!plan) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg mb-4">No workout plan found.</p>
        <Button onClick={() => window.location.href = "/workouts"}>
          Create a Plan
        </Button>
      </div>
    );
  }

  const weekWorkouts = plan.plan.filter(w => w.week === selectedWeek);
  const goalText = plan.goal === "build" ? "Build Muscle" : plan.goal === "lose" ? "Lose Weight" : "Keep Fit";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Welcome back, {plan.nickname}! 💪</CardTitle>
          <CardDescription>
            Your personalized 1-month workout plan | Goal: {goalText} | {plan.frequency} times/week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">Experience: {plan.experience}</Badge>
            <Badge variant="secondary">Equipment: {plan.equipment}</Badge>
          </div>
          <Button
            variant="destructive"
            onClick={handleDeletePlan}
            className="mt-4"
          >
            Delete Plan & Start Over
          </Button>
        </CardContent>
      </Card>

      <Tabs value={selectedWeek.toString()} onValueChange={(v) => setSelectedWeek(parseInt(v))}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="1">Week 1</TabsTrigger>
          <TabsTrigger value="2">Week 2</TabsTrigger>
          <TabsTrigger value="3">Week 3</TabsTrigger>
          <TabsTrigger value="4">Week 4</TabsTrigger>
        </TabsList>

        {[1, 2, 3, 4].map((week) => (
          <TabsContent key={week} value={week.toString()} className="space-y-4">
            {weekWorkouts.map((workout, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>Day {workout.day} - {workout.focusArea}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workout.exercises.map((exercise, exerciseIdx) => (
                      <div
                        key={exerciseIdx}
                        className="flex justify-between items-center p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{exercise.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {exercise.sets} sets × {exercise.reps} reps | Rest: {exercise.rest}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      <Card className="bg-primary/5">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Tips for Success:</h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Always warm up for 5-10 minutes before starting</li>
            <li>Focus on proper form over heavy weights</li>
            <li>Stay hydrated throughout your workout</li>
            <li>Rest days are important for muscle recovery</li>
            <li>Track your progress and adjust as needed</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutPlanView;
