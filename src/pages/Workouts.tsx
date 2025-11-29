import { Clock, Flame, Dumbbell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Workouts = () => {
  const workouts = [
    {
      id: 1,
      title: "Full Body HIIT",
      duration: "30 min",
      calories: 350,
      level: "Intermediate",
      description: "High-intensity interval training targeting all major muscle groups.",
      exercises: ["Burpees", "Mountain Climbers", "Jump Squats", "Push-ups", "Plank"],
    },
    {
      id: 2,
      title: "Upper Body Strength",
      duration: "45 min",
      calories: 280,
      level: "Advanced",
      description: "Build upper body strength with targeted resistance exercises.",
      exercises: ["Bench Press", "Pull-ups", "Shoulder Press", "Bicep Curls", "Tricep Dips"],
    },
    {
      id: 3,
      title: "Cardio Blast",
      duration: "25 min",
      calories: 320,
      level: "Beginner",
      description: "Get your heart pumping with this energetic cardio session.",
      exercises: ["Jumping Jacks", "High Knees", "Running in Place", "Jump Rope", "Butt Kicks"],
    },
    {
      id: 4,
      title: "Core Strength",
      duration: "20 min",
      calories: 180,
      level: "Intermediate",
      description: "Strengthen your core with these effective abdominal exercises.",
      exercises: ["Crunches", "Russian Twists", "Leg Raises", "Bicycle Crunches", "Plank Hold"],
    },
    {
      id: 5,
      title: "Lower Body Power",
      duration: "40 min",
      calories: 400,
      level: "Advanced",
      description: "Build leg strength and power with this challenging routine.",
      exercises: ["Squats", "Lunges", "Deadlifts", "Leg Press", "Calf Raises"],
    },
    {
      id: 6,
      title: "Flexibility & Stretch",
      duration: "30 min",
      calories: 120,
      level: "Beginner",
      description: "Improve flexibility and reduce muscle tension with gentle stretching.",
      exercises: ["Hamstring Stretch", "Quad Stretch", "Shoulder Rolls", "Neck Stretches", "Hip Openers"],
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-primary/10 text-primary hover:bg-primary/20";
      case "Intermediate":
        return "bg-secondary/10 text-secondary hover:bg-secondary/20";
      case "Advanced":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
              Workout Programs
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              Transform your fitness with our expertly designed workout routines
            </p>
          </div>
        </div>
      </section>

      {/* Workouts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <Card
                key={workout.id}
                className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getLevelColor(workout.level)}>
                      {workout.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {workout.title}
                  </CardTitle>
                  <CardDescription>{workout.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      {workout.duration}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Flame className="w-4 h-4 mr-2 text-secondary" />
                      {workout.calories} cal
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center mb-2">
                      <Dumbbell className="w-4 h-4 mr-2 text-primary" />
                      <span className="text-sm font-medium">Exercises:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {workout.exercises.map((exercise, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground"
                        >
                          {exercise}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Workouts;
