import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Workouts = () => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("all");

  const exercises = [
    {
      id: 1,
      name: "Arnold Press",
      type: "Strength",
      equipment: "Dumbbells",
      media: "/images/exercises/arnold-press.gif",
      mediaType: "gif",
      howTo: "Stand with feet shoulder-width apart, holding dumbbells at shoulder height with palms facing you. Press the dumbbells overhead while rotating your palms outward. Lower back to the starting position, rotating palms back to face you. This movement works shoulders, triceps, and chest.",
    },
    {
      id: 2,
      name: "Back Extension on Stability Ball",
      type: "Strength",
      equipment: "Stability Ball",
      media: "/images/exercises/back-extension-stability-ball.gif",
      mediaType: "gif",
      howTo: "Lie face down on a stability ball with your hips on the ball and feet anchored against a wall or floor. Place hands behind your head. Lower your upper body towards the floor, then lift up by engaging your lower back muscles. Keep movements controlled and avoid hyperextending.",
    },
    {
      id: 3,
      name: "Barbell Shrugs",
      type: "Strength",
      equipment: "Barbell",
      media: "/images/exercises/barbell-shrugs.gif",
      mediaType: "gif",
      howTo: "Stand with feet shoulder-width apart, holding a barbell with an overhand grip in front of your thighs. Keep arms straight and raise your shoulders up towards your ears as high as possible. Hold briefly at the top, then lower slowly. Keep your core tight and avoid rolling shoulders.",
    },
    {
      id: 4,
      name: "Bench Dips",
      type: "Strength",
      equipment: "Bench",
      media: "/images/exercises/bench-dips.gif",
      mediaType: "gif",
      howTo: "Place your hands on a bench behind you with fingers facing forward. Extend your legs out in front. Lower your body by bending your elbows until upper arms are parallel to the floor. Push back up to the starting position. Keep your back close to the bench throughout.",
    },
    {
      id: 5,
      name: "Bench Press",
      type: "Strength",
      equipment: "Barbell",
      media: "/images/exercises/bench-press.gif",
      mediaType: "gif",
      howTo: "Lie on a flat bench with feet flat on the floor. Grip the barbell slightly wider than shoulder-width. Lower the bar slowly to your mid-chest, pause briefly, then press back up to the starting position. Keep your core tight and maintain a slight arch in your lower back.",
    },
    {
      id: 6,
      name: "Bent Arm Pullover",
      type: "Strength",
      equipment: "Barbell",
      media: "/images/exercises/bent-arm-pullover.gif",
      mediaType: "gif",
      howTo: "Lie on a bench with only your upper back supported. Hold a barbell with arms bent at 90 degrees. Lower the weight behind your head in an arc, feeling a stretch in your lats. Pull the weight back to the starting position using your chest and lats.",
    },
    {
      id: 7,
      name: "Bent Knee Hip Raise",
      type: "Strength",
      equipment: "Body Weight",
      media: "/images/exercises/bent-knee-hip-raise.gif",
      mediaType: "gif",
      howTo: "Lie on your back with arms at your sides and knees bent at 90 degrees. Lift your hips off the ground by contracting your abs and bringing your knees towards your chest. Lower back down with control. Focus on using your lower abs, not momentum.",
    },
    {
      id: 8,
      name: "Bicep Curls (Barbell)",
      type: "Strength",
      equipment: "Barbell",
      media: "/images/exercises/bicep-curls-barbell.gif",
      mediaType: "gif",
      howTo: "Stand with feet shoulder-width apart, holding a barbell with an underhand grip. Keep elbows close to your sides. Curl the bar up towards your shoulders, squeezing your biceps at the top. Lower slowly back to the starting position. Avoid swinging or using momentum.",
    },
    {
      id: 9,
      name: "Hammer Curl",
      type: "Strength",
      equipment: "Dumbbells",
      media: "/images/exercises/hammer-curl.gif",
      mediaType: "gif",
      howTo: "Stand with feet hip-width apart, holding dumbbells at your sides with palms facing inward (neutral grip). Curl the weights up towards your shoulders, keeping the neutral grip throughout. Lower slowly and repeat. This targets both the biceps and forearms.",
    },
    {
      id: 10,
      name: "Biceps Curl (Dumbbell)",
      type: "Strength",
      equipment: "Dumbbells",
      media: "/images/exercises/biceps-curl-dumbbell.gif",
      mediaType: "gif",
      howTo: "Stand holding dumbbells at your sides with palms facing forward. Curl both weights up towards your shoulders while keeping elbows stationary. Squeeze at the top, then lower under control. You can alternate arms or curl both simultaneously.",
    },
  ];

  const filteredExercises = exercises.filter((exercise) => {
    const typeMatch = selectedType === "all" || exercise.type === selectedType;
    const equipmentMatch = selectedEquipment === "all" || exercise.equipment === selectedEquipment;
    return typeMatch && equipmentMatch;
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <SelectItem value="Dumbbells">Dumbbells</SelectItem>
                  <SelectItem value="Barbell">Barbell</SelectItem>
                  <SelectItem value="Bench">Bench</SelectItem>
                  <SelectItem value="Stability Ball">Stability Ball</SelectItem>
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
              <div className="aspect-video w-full overflow-hidden bg-white">
                {exercise.mediaType === "video" ? (
                  <video
                    src={exercise.media}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={exercise.media}
                    alt={exercise.name}
                    className="w-full h-full object-contain"
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
