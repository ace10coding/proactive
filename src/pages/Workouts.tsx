import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import VideoModal from "@/components/VideoModal";
import WorkoutPlanGenerator from "@/components/WorkoutPlanGenerator";
import WorkoutPlanView from "@/components/WorkoutPlanView";

const Workouts = () => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("all");
  const [selectedMuscle, setSelectedMuscle] = useState<string>("all");
  const [view, setView] = useState<"exercises" | "generator" | "plan">("exercises");
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get("view");
    const hasPlan = localStorage.getItem("workoutPlan");
    
    if (viewParam === "plan" && hasPlan) {
      setView("plan");
    } else if (viewParam === "generator") {
      setView("generator");
    }
  }, []);

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
      media: "/videos/plank.mp4",
      mediaType: "video",
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
              {t('workouts.hero.title')}
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              {t('workouts.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* View Tabs */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="exercises">{t('workouts.tabs.library')}</TabsTrigger>
              <TabsTrigger value="generator">{t('workouts.tabs.generator')}</TabsTrigger>
              <TabsTrigger value="plan">{t('workouts.tabs.plan')}</TabsTrigger>
            </TabsList>

            <TabsContent value="exercises">
              {/* Filters Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('workouts.filters.type')}</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('workouts.filters.type')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('workouts.filters.allTypes')}</SelectItem>
                      <SelectItem value="Strength">{t('workouts.types.strength')}</SelectItem>
                      <SelectItem value="Cardio">{t('workouts.types.cardio')}</SelectItem>
                      <SelectItem value="Stretching">{t('workouts.types.stretching')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('workouts.filters.equipment')}</label>
                  <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('workouts.filters.equipment')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('workouts.filters.allEquipment')}</SelectItem>
                      <SelectItem value="Body Weight">{t('workouts.equipment.bodyweight')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('workouts.filters.muscle')}</label>
                  <Select value={selectedMuscle} onValueChange={setSelectedMuscle}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('workouts.filters.muscle')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('workouts.filters.allMuscles')}</SelectItem>
                      <SelectItem value="Chest">{t('workouts.muscles.chest')}</SelectItem>
                      <SelectItem value="Triceps">{t('workouts.muscles.triceps')}</SelectItem>
                      <SelectItem value="Shoulders">{t('workouts.muscles.shoulders')}</SelectItem>
                      <SelectItem value="Core">{t('workouts.muscles.core')}</SelectItem>
                      <SelectItem value="Abs">{t('workouts.muscles.abs')}</SelectItem>
                      <SelectItem value="Back">{t('workouts.muscles.back')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Exercises Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={exercise.media}
                      alt={exercise.name}
                      className="w-full h-full object-cover"
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
            </TabsContent>

            <TabsContent value="generator">
              <WorkoutPlanGenerator />
            </TabsContent>

            <TabsContent value="plan">
              <WorkoutPlanView />
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoSrc={selectedVideo?.src || ""}
        title={selectedVideo?.title || ""}
      />
    </div>
  );
};

export default Workouts;
