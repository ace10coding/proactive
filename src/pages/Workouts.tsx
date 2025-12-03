import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import WorkoutPlanGenerator from "@/components/WorkoutPlanGenerator";
import WorkoutPlanView from "@/components/WorkoutPlanView";

const Workouts = () => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("all");
  const [view, setView] = useState<"exercises" | "generator" | "plan">("exercises");
  const [fullscreenImage, setFullscreenImage] = useState<{ src: string; title: string } | null>(null);

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
      nameKey: "exercise.barbellFrontRaises.name",
      type: "Strength",
      equipment: "Barbell",
      media: "/images/barbell-front-raises.gif",
      howToKey: "exercise.barbellFrontRaises.howTo",
    },
    {
      id: 2,
      nameKey: "exercise.arnoldPress.name",
      type: "Strength",
      equipment: "Dumbbells",
      media: "/images/arnold-press.gif",
      howToKey: "exercise.arnoldPress.howTo",
    },
    {
      id: 3,
      nameKey: "exercise.barbellUprightRows.name",
      type: "Strength",
      equipment: "Barbell",
      media: "/images/barbell-upright-rows.gif",
      howToKey: "exercise.barbellUprightRows.howTo",
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <SelectItem value="Barbell">{t('workouts.equipment.barbell')}</SelectItem>
                      <SelectItem value="Dumbbells">{t('workouts.equipment.dumbbells')}</SelectItem>
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
                    <div 
                      className="aspect-video w-full overflow-hidden bg-muted cursor-pointer relative"
                      onClick={() => setFullscreenImage({ src: exercise.media, title: t(exercise.nameKey) })}
                    >
                      <img
                        src={exercise.media}
                        alt={t(exercise.nameKey)}
                        className="w-full h-full object-contain bg-white"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                          {t('workouts.clickFullscreen')}
                        </span>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {t(exercise.nameKey)}
                      </CardTitle>
                      <CardDescription>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                            {exercise.type === "Strength" ? t('workouts.types.strength') : exercise.type}
                          </span>
                          <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-md">
                            {exercise.equipment === "Barbell" ? t('workouts.equipment.barbell') : t('workouts.equipment.dumbbells')}
                          </span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">{t('workouts.howTo')}</span>
                        <p className="text-sm mt-1 leading-relaxed">{t(exercise.howToKey)}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {filteredExercises.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">{t('workouts.noResults')}</p>
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
      
      {/* Fullscreen Image Modal */}
      <Dialog open={!!fullscreenImage} onOpenChange={() => setFullscreenImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-white">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setFullscreenImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="bg-white p-4">
              <h3 className="text-xl font-semibold mb-4">{fullscreenImage?.title}</h3>
              <div className="aspect-video w-full bg-white flex items-center justify-center">
                <img
                  src={fullscreenImage?.src || ""}
                  alt={fullscreenImage?.title || ""}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Workouts;
