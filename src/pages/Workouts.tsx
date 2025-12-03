import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Workouts = () => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("all");
  const [selectedMuscle, setSelectedMuscle] = useState<string>("all");

  const exercises = [
    {
      id: 1,
      name: "Push Up",
      type: "Strength",
      equipment: "Body Weight",
      muscle: "Chest, Triceps, Shoulders",
      media: "/videos/push-up.mp4",
      mediaType: "video",
      howTo: "Start in a high plank position with hands slightly wider than shoulder-width. Lower your body until your chest nearly touches the floor, keeping your elbows at a 45-degree angle. Push back up to the starting position. Keep your core engaged and body in a straight line throughout the movement.",
    },
    {
      id: 2,
      name: "Diamond Push Up",
      type: "Strength",
      equipment: "Body Weight",
      muscle: "Triceps, Chest, Shoulders",
      media: "/videos/diamond-push-up.mp4",
      mediaType: "video",
      howTo: "Start in a high plank position with your hands close together, forming a diamond shape with your index fingers and thumbs. Lower your body while keeping your elbows close to your sides. Push back up to the starting position. This variation puts more emphasis on the triceps.",
    },
    {
      id: 3,
      name: "Plank",
      type: "Strength",
      equipment: "Body Weight",
      muscle: "Core, Abs",
      media: "/images/plank.jpeg",
      mediaType: "image",
      howTo: "Start in a forearm plank position with your elbows directly under your shoulders and forearms parallel to each other. Keep your body in a straight line from head to heels, engaging your core muscles. Hold this position without letting your hips sag or pike up. Focus on breathing steadily while maintaining proper form.",
    },
  ];

  const filteredExercises = exercises.filter((exercise) => {
    const typeMatch = selectedType === "all" || exercise.type === selectedType;
    const equipmentMatch = selectedEquipment === "all" || exercise.equipment === selectedEquipment;
    const muscleMatch = selectedMuscle === "all" || exercise.muscle.toLowerCase().includes(selectedMuscle.toLowerCase());
    return typeMatch && equipmentMatch && muscleMatch;
  });

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
              Workouts
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              Transform your fitness with our designed workouts
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Strength">Strength</SelectItem>
                  <SelectItem value="Cardio">Cardio</SelectItem>
                  <SelectItem value="Stretching">Stretching</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Equipment</label>
              <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select equipment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Equipment</SelectItem>
                  <SelectItem value="Body Weight">Body Weight</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Muscle</label>
              <Select value={selectedMuscle} onValueChange={setSelectedMuscle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select muscle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Muscles</SelectItem>
                  <SelectItem value="Chest">Chest</SelectItem>
                  <SelectItem value="Triceps">Triceps</SelectItem>
                  <SelectItem value="Shoulders">Shoulders</SelectItem>
                  <SelectItem value="Core">Core</SelectItem>
                  <SelectItem value="Abs">Abs</SelectItem>
                  <SelectItem value="Back">Back</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Exercises Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise) => (
              <Card
                key={exercise.id}
                className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  {exercise.mediaType === "video" ? (
                    <video
                      src={exercise.media}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain bg-black"
                    />
                  ) : (
                    <img
                      src={exercise.media}
                      alt={exercise.name}
                      className="w-full h-full object-contain bg-black"
                    />
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {exercise.name}
                  </CardTitle>
                  <CardDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                        {exercise.type}
                      </span>
                      <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-md">
                        {exercise.equipment}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Target Muscles:</span>
                    <p className="text-sm mt-1">{exercise.muscle}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">How to do it:</span>
                    <p className="text-sm mt-1 leading-relaxed">{exercise.howTo}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredExercises.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No exercises found matching your filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Workouts;
