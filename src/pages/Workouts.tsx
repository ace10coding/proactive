import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import WorkoutPlanGenerator from "@/components/WorkoutPlanGenerator";
import WorkoutPlanView from "@/components/WorkoutPlanView";
import ExerciseAnimation from "@/components/ExerciseAnimation";

interface Exercise {
  id: number;
  nameKey: string;
  type: string;
  equipment: string;
  media?: string;
  image1?: string;
  image2?: string;
  howToKey: string;
}

const Workouts = () => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("all");
  const [view, setView] = useState<"exercises" | "generator" | "plan">("exercises");
  const [fullscreenExercise, setFullscreenExercise] = useState<{ exercise: Exercise; title: string } | null>(null);

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
      image1: "/images/exercises/arnold-press-1.png",
      image2: "/images/exercises/arnold-press-2.png",
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
    {
      id: 4,
      nameKey: "exercise.backExtension.name",
      type: "Strength",
      equipment: "StabilityBall",
      image1: "/images/exercises/back-extension-stability-ball-1.png",
      image2: "/images/exercises/back-extension-stability-ball-2.png",
      howToKey: "exercise.backExtension.howTo",
    },
    {
      id: 5,
      nameKey: "exercise.barbellShrugs.name",
      type: "Strength",
      equipment: "Barbell",
      image1: "/images/exercises/barbell-shrugs-1.png",
      image2: "/images/exercises/barbell-shrugs-2.png",
      howToKey: "exercise.barbellShrugs.howTo",
    },
    {
      id: 6,
      nameKey: "exercise.benchDips.name",
      type: "Strength",
      equipment: "Bench",
      image1: "/images/exercises/bench-dips-1.png",
      image2: "/images/exercises/bench-dips-2.png",
      howToKey: "exercise.benchDips.howTo",
    },
    {
      id: 7,
      nameKey: "exercise.benchPress.name",
      type: "Strength",
      equipment: "Barbell",
      image1: "/images/exercises/bench-press-1.png",
      image2: "/images/exercises/bench-press-2.png",
      howToKey: "exercise.benchPress.howTo",
    },
    {
      id: 8,
      nameKey: "exercise.bentArmPullover.name",
      type: "Strength",
      equipment: "Barbell",
      image1: "/images/exercises/bent-arm-pullover-1.png",
      image2: "/images/exercises/bent-arm-pullover-2.png",
      howToKey: "exercise.bentArmPullover.howTo",
    },
    {
      id: 9,
      nameKey: "exercise.bentKneeHipRaise.name",
      type: "Strength",
      equipment: "Bodyweight",
      image1: "/images/exercises/bent-knee-hip-raise-1.png",
      image2: "/images/exercises/bent-knee-hip-raise-2.png",
      howToKey: "exercise.bentKneeHipRaise.howTo",
    },
    {
      id: 10,
      nameKey: "exercise.bicepCurlsBarbell.name",
      type: "Strength",
      equipment: "Barbell",
      image1: "/images/exercises/bicep-curls-barbell-1.png",
      image2: "/images/exercises/bicep-curls-barbell-2.png",
      howToKey: "exercise.bicepCurlsBarbell.howTo",
    },
    {
      id: 11,
      nameKey: "exercise.hammerCurl.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/hammer-curl-1.png",
      image2: "/images/exercises/hammer-curl-2.png",
      howToKey: "exercise.hammerCurl.howTo",
    },
    {
      id: 12,
      nameKey: "exercise.bicepsCurlDumbbell.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/biceps-curl-dumbbell-1.png",
      image2: "/images/exercises/biceps-curl-dumbbell-2.png",
      howToKey: "exercise.bicepsCurlDumbbell.howTo",
    },
    {
      id: 13,
      nameKey: "exercise.dumbbellFlys.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/dumbbell-flys-1.png",
      image2: "/images/exercises/dumbbell-flys-2.png",
      howToKey: "exercise.dumbbellFlys.howTo",
    },
    {
      id: 14,
      nameKey: "exercise.dumbbellFrontRaises.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/dumbbell-front-raises-1.png",
      image2: "/images/exercises/dumbbell-front-raises-2.png",
      howToKey: "exercise.dumbbellFrontRaises.howTo",
    },
    {
      id: 15,
      nameKey: "exercise.bicepsCurlReverse.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/biceps-curl-reverse-1.png",
      image2: "/images/exercises/biceps-curl-reverse-2.png",
      howToKey: "exercise.bicepsCurlReverse.howTo",
    },
    {
      id: 16,
      nameKey: "exercise.bridge.name",
      type: "Strength",
      equipment: "Bodyweight",
      image1: "/images/exercises/bridge-1.png",
      image2: "/images/exercises/bridge-2.png",
      howToKey: "exercise.bridge.howTo",
    },
    {
      id: 17,
      nameKey: "exercise.concentrationCurls.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/concentration-curls-1.png",
      image2: "/images/exercises/concentration-curls-2.png",
      howToKey: "exercise.concentrationCurls.howTo",
    },
    {
      id: 18,
      nameKey: "exercise.crossBodyCrunch.name",
      type: "Strength",
      equipment: "Bodyweight",
      image1: "/images/exercises/cross-body-crunch-1.png",
      image2: "/images/exercises/cross-body-crunch-2.png",
      howToKey: "exercise.crossBodyCrunch.howTo",
    },
    {
      id: 19,
      nameKey: "exercise.crunches.name",
      type: "Strength",
      equipment: "Bodyweight",
      image1: "/images/exercises/crunches-1.png",
      image2: "/images/exercises/crunches-2.png",
      howToKey: "exercise.crunches.howTo",
    },
    {
      id: 20,
      nameKey: "exercise.crunchesWithStabilityBall.name",
      type: "Strength",
      equipment: "StabilityBall",
      image1: "/images/exercises/crunches-with-stability-ball-1.png",
      image2: "/images/exercises/crunches-with-stability-ball-2.png",
      howToKey: "exercise.crunchesWithStabilityBall.howTo",
    },
    {
      id: 21,
      nameKey: "exercise.declineCrunch.name",
      type: "Strength",
      equipment: "Bench",
      image1: "/images/exercises/decline-crunch-1.png",
      image2: "/images/exercises/decline-crunch-2.png",
      howToKey: "exercise.declineCrunch.howTo",
    },
    {
      id: 22,
      nameKey: "exercise.dumbbellDeclineFlys.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/dumbbell-decline-flys-1.png",
      image2: "/images/exercises/dumbbell-decline-flys-2.png",
      howToKey: "exercise.dumbbellDeclineFlys.howTo",
    },
    {
      id: 23,
      nameKey: "exercise.kneelingTricepsExtension.name",
      type: "Strength",
      equipment: "Cable",
      image1: "/images/exercises/kneeling-triceps-extension-1.png",
      image2: "/images/exercises/kneeling-triceps-extension-2.png",
      howToKey: "exercise.kneelingTricepsExtension.howTo",
    },
    {
      id: 24,
      nameKey: "exercise.dumbbellFrontRaisesAlt.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/dumbbell-front-raises-alt-1.png",
      image2: "/images/exercises/dumbbell-front-raises-alt-2.png",
      howToKey: "exercise.dumbbellFrontRaisesAlt.howTo",
    },
    {
      id: 25,
      nameKey: "exercise.dumbbellLateralRaises.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/dumbbell-lateral-raises-1.png",
      image2: "/images/exercises/dumbbell-lateral-raises-2.png",
      howToKey: "exercise.dumbbellLateralRaises.howTo",
    },
    {
      id: 26,
      nameKey: "exercise.exerciseBallPullIn.name",
      type: "Strength",
      equipment: "StabilityBall",
      image1: "/images/exercises/exercise-ball-pull-in-1.png",
      image2: "/images/exercises/exercise-ball-pull-in-2.png",
      howToKey: "exercise.exerciseBallPullIn.howTo",
    },
    {
      id: 27,
      nameKey: "exercise.girondaSternumChins.name",
      type: "Strength",
      equipment: "Bodyweight",
      image1: "/images/exercises/gironda-sternum-chins-1.png",
      image2: "/images/exercises/gironda-sternum-chins-2.png",
      howToKey: "exercise.girondaSternumChins.howTo",
    },
    {
      id: 28,
      nameKey: "exercise.hammerCurlsRope.name",
      type: "Strength",
      equipment: "Cable",
      image1: "/images/exercises/hammer-curls-rope-1.png",
      image2: "/images/exercises/hammer-curls-rope-2.png",
      howToKey: "exercise.hammerCurlsRope.howTo",
    },
    {
      id: 29,
      nameKey: "exercise.highCableCurls.name",
      type: "Strength",
      equipment: "Cable",
      image1: "/images/exercises/high-cable-curls-1.png",
      image2: "/images/exercises/high-cable-curls-2.png",
      howToKey: "exercise.highCableCurls.howTo",
    },
    {
      id: 30,
      nameKey: "exercise.hyperextensions.name",
      type: "Strength",
      equipment: "Bench",
      image1: "/images/exercises/hyperextensions-1.png",
      image2: "/images/exercises/hyperextensions-2.png",
      howToKey: "exercise.hyperextensions.howTo",
    },
    {
      id: 31,
      nameKey: "exercise.inclineTricepsExtensions.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/incline-triceps-extensions-1.png",
      image2: "/images/exercises/incline-triceps-extensions-2.png",
      howToKey: "exercise.inclineTricepsExtensions.howTo",
    },
    {
      id: 32,
      nameKey: "exercise.legPress.name",
      type: "Strength",
      equipment: "Machine",
      image1: "/images/exercises/leg-press-1.png",
      image2: "/images/exercises/leg-press-2.png",
      howToKey: "exercise.legPress.howTo",
    },
    {
      id: 33,
      nameKey: "exercise.legRaises.name",
      type: "Strength",
      equipment: "Bodyweight",
      image1: "/images/exercises/leg-raises-1.png",
      image2: "/images/exercises/leg-raises-2.png",
      howToKey: "exercise.legRaises.howTo",
    },
    {
      id: 34,
      nameKey: "exercise.lowTricepsExtension.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/low-triceps-extension-1.png",
      image2: "/images/exercises/low-triceps-extension-2.png",
      howToKey: "exercise.lowTricepsExtension.howTo",
    },
    {
      id: 35,
      nameKey: "exercise.lungesBarbell.name",
      type: "Strength",
      equipment: "Barbell",
      image1: "/images/exercises/lunges-barbell-1.png",
      image2: "/images/exercises/lunges-barbell-2.png",
      howToKey: "exercise.lungesBarbell.howTo",
    },
    {
      id: 36,
      nameKey: "exercise.lungesDumbbell.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/lunges-dumbbell-1.png",
      image2: "/images/exercises/lunges-dumbbell-2.png",
      howToKey: "exercise.lungesDumbbell.howTo",
    },
    {
      id: 37,
      nameKey: "exercise.lyingCloseGripTricepsPress.name",
      type: "Strength",
      equipment: "Barbell",
      image1: "/images/exercises/lying-close-grip-triceps-press-1.png",
      image2: "/images/exercises/lying-close-grip-triceps-press-2.png",
      howToKey: "exercise.lyingCloseGripTricepsPress.howTo",
    },
    {
      id: 38,
      nameKey: "exercise.lyingOneArmRearLateralRaise.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/lying-one-arm-rear-lateral-raise-1.png",
      image2: "/images/exercises/lying-one-arm-rear-lateral-raise-2.png",
      howToKey: "exercise.lyingOneArmRearLateralRaise.howTo",
    },
    {
      id: 39,
      nameKey: "exercise.lyingRearLateralRaise.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/lying-rear-lateral-raise-1.png",
      image2: "/images/exercises/lying-rear-lateral-raise-2.png",
      howToKey: "exercise.lyingRearLateralRaise.howTo",
    },
    {
      id: 40,
      nameKey: "exercise.oneArmShoulderPress.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/one-arm-shoulder-press-1.png",
      image2: "/images/exercises/one-arm-shoulder-press-2.png",
      howToKey: "exercise.oneArmShoulderPress.howTo",
    },
    {
      id: 41,
      nameKey: "exercise.oneArmTricepsExtension.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/one-arm-triceps-extension-1.png",
      image2: "/images/exercises/one-arm-triceps-extension-2.png",
      howToKey: "exercise.oneArmTricepsExtension.howTo",
    },
    {
      id: 42,
      nameKey: "exercise.oneArmUprightRow.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/one-arm-upright-row-1.png",
      image2: "/images/exercises/one-arm-upright-row-2.png",
      howToKey: "exercise.oneArmUprightRow.howTo",
    },
    {
      id: 43,
      nameKey: "exercise.lyingTricepsExtensionAcrossFace.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/lying-triceps-extension-across-face-1.png",
      image2: "/images/exercises/lying-triceps-extension-across-face-2.png",
      howToKey: "exercise.lyingTricepsExtensionAcrossFace.howTo",
    },
    {
      id: 44,
      nameKey: "exercise.medicineBallBicepsCurl.name",
      type: "Strength",
      equipment: "StabilityBall",
      image1: "/images/exercises/medicine-ball-biceps-curl-1.png",
      image2: "/images/exercises/medicine-ball-biceps-curl-2.png",
      howToKey: "exercise.medicineBallBicepsCurl.howTo",
    },
    {
      id: 45,
      nameKey: "exercise.narrowGripBenchPress.name",
      type: "Strength",
      equipment: "Barbell",
      image1: "/images/exercises/narrow-grip-bench-press-1.png",
      image2: "/images/exercises/narrow-grip-bench-press-2.png",
      howToKey: "exercise.narrowGripBenchPress.howTo",
    },
    {
      id: 46,
      nameKey: "exercise.oneArmBenchPress.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/one-arm-bench-press-1.png",
      image2: "/images/exercises/one-arm-bench-press-2.png",
      howToKey: "exercise.oneArmBenchPress.howTo",
    },
    {
      id: 47,
      nameKey: "exercise.oneArmBicepConcentrationStabilityBall.name",
      type: "Strength",
      equipment: "StabilityBall",
      image1: "/images/exercises/one-arm-bicep-concentration-stability-ball-1.png",
      image2: "/images/exercises/one-arm-bicep-concentration-stability-ball-2.png",
      howToKey: "exercise.oneArmBicepConcentrationStabilityBall.howTo",
    },
    {
      id: 48,
      nameKey: "exercise.oneArmPreacherCurl.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/one-arm-preacher-curl-1.png",
      image2: "/images/exercises/one-arm-preacher-curl-2.png",
      howToKey: "exercise.oneArmPreacherCurl.howTo",
    },
    {
      id: 49,
      nameKey: "exercise.spiderCurl.name",
      type: "Strength",
      equipment: "Barbell",
      image1: "/images/exercises/spider-curl-1.png",
      image2: "/images/exercises/spider-curl-2.png",
      howToKey: "exercise.spiderCurl.howTo",
    },
    {
      id: 50,
      nameKey: "exercise.preacherCurlBarbell.name",
      type: "Strength",
      equipment: "Barbell",
      image1: "/images/exercises/preacher-curl-barbell-1.png",
      image2: "/images/exercises/preacher-curl-barbell-2.png",
      howToKey: "exercise.preacherCurlBarbell.howTo",
    },
    {
      id: 51,
      nameKey: "exercise.pulloverStabilityBall.name",
      type: "Strength",
      equipment: "StabilityBall",
      image1: "/images/exercises/pullover-stability-ball-1.png",
      image2: "/images/exercises/pullover-stability-ball-2.png",
      howToKey: "exercise.pulloverStabilityBall.howTo",
    },
    {
      id: 52,
      nameKey: "exercise.pushUpFeetOnBall.name",
      type: "Strength",
      equipment: "StabilityBall",
      image1: "/images/exercises/push-up-feet-on-ball-1.png",
      image2: "/images/exercises/push-up-feet-on-ball-2.png",
      howToKey: "exercise.pushUpFeetOnBall.howTo",
    },
    {
      id: 53,
      nameKey: "exercise.rearDeltoidRow.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/rear-deltoid-row-1.png",
      image2: "/images/exercises/rear-deltoid-row-2.png",
      howToKey: "exercise.rearDeltoidRow.howTo",
    },
    {
      id: 54,
      nameKey: "exercise.reversePlateCurls.name",
      type: "Strength",
      equipment: "Barbell",
      image1: "/images/exercises/reverse-plate-curls-1.png",
      image2: "/images/exercises/reverse-plate-curls-2.png",
      howToKey: "exercise.reversePlateCurls.howTo",
    },
    {
      id: 55,
      nameKey: "exercise.seatedTricepsPress.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/seated-triceps-press-1.png",
      image2: "/images/exercises/seated-triceps-press-2.png",
      howToKey: "exercise.seatedTricepsPress.howTo",
    },
    {
      id: 56,
      nameKey: "exercise.tricepDips.name",
      type: "Strength",
      equipment: "Bench",
      image1: "/images/exercises/tricep-dips-1.png",
      image2: "/images/exercises/tricep-dips-2.png",
      howToKey: "exercise.tricepDips.howTo",
    },
    {
      id: 57,
      nameKey: "exercise.parallelBarDips.name",
      type: "Strength",
      equipment: "Bodyweight",
      image1: "/images/exercises/parallel-bar-dips-1.png",
      image2: "/images/exercises/parallel-bar-dips-2.png",
      howToKey: "exercise.parallelBarDips.howTo",
    },
    {
      id: 58,
      nameKey: "exercise.barbellSquat.name",
      type: "Strength",
      equipment: "Barbell",
      image1: "/images/exercises/barbell-squat-1.png",
      image2: "/images/exercises/barbell-squat-2.png",
      howToKey: "exercise.barbellSquat.howTo",
    },
    {
      id: 59,
      nameKey: "exercise.smithMachineSquat.name",
      type: "Strength",
      equipment: "Machine",
      image1: "/images/exercises/smith-machine-squat-1.png",
      image2: "/images/exercises/smith-machine-squat-2.png",
      howToKey: "exercise.smithMachineSquat.howTo",
    },
    {
      id: 60,
      nameKey: "exercise.dumbbellSquat.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/dumbbell-squat-1.png",
      image2: "/images/exercises/dumbbell-squat-2.png",
      howToKey: "exercise.dumbbellSquat.howTo",
    },
    {
      id: 61,
      nameKey: "exercise.bandSquat.name",
      type: "Strength",
      equipment: "Cable",
      image1: "/images/exercises/band-squat-1.png",
      image2: "/images/exercises/band-squat-2.png",
      howToKey: "exercise.bandSquat.howTo",
    },
    {
      id: 62,
      nameKey: "exercise.stabilityBallCrunch.name",
      type: "Strength",
      equipment: "StabilityBall",
      image1: "/images/exercises/stability-ball-crunch-1.png",
      image2: "/images/exercises/stability-ball-crunch-2.png",
      howToKey: "exercise.stabilityBallCrunch.howTo",
    },
    {
      id: 63,
      nameKey: "exercise.standingBandCurl.name",
      type: "Strength",
      equipment: "Cable",
      image1: "/images/exercises/standing-band-curl-1.png",
      image2: "/images/exercises/standing-band-curl-2.png",
      howToKey: "exercise.standingBandCurl.howTo",
    },
    {
      id: 64,
      nameKey: "exercise.tBarRow.name",
      type: "Strength",
      equipment: "Machine",
      image1: "/images/exercises/t-bar-row-1.png",
      image2: "/images/exercises/t-bar-row-2.png",
      howToKey: "exercise.tBarRow.howTo",
    },
    {
      id: 65,
      nameKey: "exercise.tricepsKickback.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/triceps-kickback-1.png",
      image2: "/images/exercises/triceps-kickback-2.png",
      howToKey: "exercise.tricepsKickback.howTo",
    },
    {
      id: 66,
      nameKey: "exercise.lyingCloseGripBicepsCurls.name",
      type: "Strength",
      equipment: "Barbell",
      media: "/images/exercises/lying-close-grip-biceps-curls.gif",
      howToKey: "exercise.lyingCloseGripBicepsCurls.howTo",
    },
    {
      id: 67,
      nameKey: "exercise.frontRaiseAndPullover.name",
      type: "Strength",
      equipment: "Barbell",
      media: "/images/exercises/front-raise-and-pullover.gif",
      howToKey: "exercise.frontRaiseAndPullover.howTo",
    },
    {
      id: 68,
      nameKey: "exercise.hackSquats.name",
      type: "Strength",
      equipment: "Machine",
      media: "/images/exercises/hack-squats.gif",
      howToKey: "exercise.hackSquats.howTo",
    },
    {
      id: 69,
      nameKey: "exercise.inclineBicepsCurl.name",
      type: "Strength",
      equipment: "Dumbbells",
      media: "/images/exercises/incline-biceps-curl.gif",
      howToKey: "exercise.inclineBicepsCurl.howTo",
    },
    {
      id: 70,
      nameKey: "exercise.inclinePushdown.name",
      type: "Strength",
      equipment: "Cable",
      media: "/images/exercises/incline-pushdown.gif",
      howToKey: "exercise.inclinePushdown.howTo",
    },
    {
      id: 71,
      nameKey: "exercise.inclineTricepsExtensionCable.name",
      type: "Strength",
      equipment: "Cable",
      media: "/images/exercises/incline-triceps-extension.gif",
      howToKey: "exercise.inclineTricepsExtensionCable.howTo",
    },
    {
      id: 72,
      nameKey: "exercise.inclineTricepsExtensionBarbell.name",
      type: "Strength",
      equipment: "Barbell",
      media: "/images/exercises/incline-triceps-extension-barbell.gif",
      howToKey: "exercise.inclineTricepsExtensionBarbell.howTo",
    },
    {
      id: 73,
      nameKey: "exercise.jmPress.name",
      type: "Strength",
      equipment: "Barbell",
      media: "/images/exercises/jm-press.gif",
      howToKey: "exercise.jmPress.howTo",
    },
    {
      id: 74,
      nameKey: "exercise.oneArmBicepCurlOlympicBar.name",
      type: "Strength",
      equipment: "Barbell",
      media: "/images/exercises/one-arm-bicep-curl-olympic-bar.gif",
      howToKey: "exercise.oneArmBicepCurlOlympicBar.howTo",
    },
    {
      id: 75,
      nameKey: "exercise.lyingCloseGripTricepsExtensionBehindHead.name",
      type: "Strength",
      equipment: "Barbell",
      media: "/images/exercises/lying-close-grip-triceps-extension-behind-head.gif",
      howToKey: "exercise.lyingCloseGripTricepsExtensionBehindHead.howTo",
    },
    {
      id: 76,
      nameKey: "exercise.lyingHighBenchBicepsCurl.name",
      type: "Strength",
      equipment: "Barbell",
      media: "/images/exercises/lying-high-bench-biceps-curl.gif",
      howToKey: "exercise.lyingHighBenchBicepsCurl.howTo",
    },
    {
      id: 77,
      nameKey: "exercise.lyingInclineCurl.name",
      type: "Strength",
      equipment: "Barbell",
      media: "/images/exercises/lying-incline-curl.gif",
      howToKey: "exercise.lyingInclineCurl.howTo",
    },
    {
      id: 78,
      nameKey: "exercise.lyingSupineBicepsCurl.name",
      type: "Strength",
      equipment: "Dumbbells",
      media: "/images/exercises/lying-supine-biceps-curl.gif",
      howToKey: "exercise.lyingSupineBicepsCurl.howTo",
    },
    {
      id: 79,
      nameKey: "exercise.lyingSupineTwoArmTricepsExtension.name",
      type: "Strength",
      equipment: "Dumbbells",
      media: "/images/exercises/lying-supine-two-arm-triceps-extension.gif",
      howToKey: "exercise.lyingSupineTwoArmTricepsExtension.howTo",
    },
    {
      id: 80,
      nameKey: "exercise.lyingTricepsExtensionCable.name",
      type: "Strength",
      equipment: "Cable",
      media: "/images/exercises/lying-triceps-extension-cable.gif",
      howToKey: "exercise.lyingTricepsExtensionCable.howTo",
    },
    {
      id: 81,
      nameKey: "exercise.lyingTricepsExtensionDumbbell.name",
      type: "Strength",
      equipment: "Dumbbells",
      media: "/images/exercises/lying-triceps-extension-dumbbell.gif",
      howToKey: "exercise.lyingTricepsExtensionDumbbell.howTo",
    },
    {
      id: 82,
      nameKey: "exercise.lyingTricepsPress.name",
      type: "Strength",
      equipment: "Barbell",
      media: "/images/exercises/lying-triceps-press.gif",
      howToKey: "exercise.lyingTricepsPress.howTo",
    },
    {
      id: 83,
      nameKey: "exercise.weightedSissySquat.name",
      type: "Strength",
      equipment: "Machine",
      image1: "/images/exercises/weighted-sissy-squat-2.png",
      image2: "/images/exercises/weighted-sissy-squat-1.png",
      howToKey: "exercise.weightedSissySquat.howTo",
    },
    {
      id: 84,
      nameKey: "exercise.thighAdductor.name",
      type: "Strength",
      equipment: "Machine",
      image1: "/images/exercises/thigh-adductor-2.png",
      image2: "/images/exercises/thigh-adductor-1.png",
      howToKey: "exercise.thighAdductor.howTo",
    },
    {
      id: 85,
      nameKey: "exercise.standingTricepsExtension.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/standing-triceps-extension-2.png",
      image2: "/images/exercises/standing-triceps-extension-1.png",
      howToKey: "exercise.standingTricepsExtension.howTo",
    },
    {
      id: 86,
      nameKey: "exercise.smithMachineRearDeltoidRow.name",
      type: "Strength",
      equipment: "Machine",
      image1: "/images/exercises/smith-machine-rear-deltoid-row-2.png",
      image2: "/images/exercises/smith-machine-rear-deltoid-row-1.png",
      howToKey: "exercise.smithMachineRearDeltoidRow.howTo",
    },
    {
      id: 87,
      nameKey: "exercise.seatedOverheadTricepsExtension.name",
      type: "Strength",
      equipment: "Barbell",
      image1: "/images/exercises/seated-overhead-triceps-extension-2.png",
      image2: "/images/exercises/seated-overhead-triceps-extension-1.png",
      howToKey: "exercise.seatedOverheadTricepsExtension.howTo",
    },
    {
      id: 88,
      nameKey: "exercise.wideGripLatPullDown.name",
      type: "Strength",
      equipment: "Cable",
      image1: "/images/exercises/wide-grip-lat-pull-down-2.png",
      image2: "/images/exercises/wide-grip-lat-pull-down-1.png",
      howToKey: "exercise.wideGripLatPullDown.howTo",
    },
    {
      id: 89,
      nameKey: "exercise.walkingLunges.name",
      type: "Strength",
      equipment: "Dumbbells",
      image1: "/images/exercises/walking-lunges-2.png",
      image2: "/images/exercises/walking-lunges-1.png",
      howToKey: "exercise.walkingLunges.howTo",
    },
    {
      id: 90,
      nameKey: "exercise.aerobics.name",
      type: "Cardio",
      equipment: "Bodyweight",
      image1: "/images/exercises/aerobics-2.png",
      image2: "/images/exercises/aerobics-1.png",
      howToKey: "exercise.aerobics.howTo",
    },
    {
      id: 91,
      nameKey: "exercise.mountainBiking.name",
      type: "Cardio",
      equipment: "Machine",
      image1: "/images/exercises/mountain-biking-2.png",
      image2: "/images/exercises/mountain-biking-1.png",
      howToKey: "exercise.mountainBiking.howTo",
    },
    {
      id: 92,
      nameKey: "exercise.pilates.name",
      type: "Cardio",
      equipment: "Bodyweight",
      image1: "/images/exercises/pilates-2.png",
      image2: "/images/exercises/pilates-1.png",
      howToKey: "exercise.pilates.howTo",
    },
    {
      id: 93,
      nameKey: "exercise.recumbentBiking.name",
      type: "Cardio",
      equipment: "Machine",
      image1: "/images/exercises/recumbent-biking-2.png",
      image2: "/images/exercises/recumbent-biking-1.png",
      howToKey: "exercise.recumbentBiking.howTo",
    },
    {
      id: 94,
      nameKey: "exercise.roadCycling.name",
      type: "Cardio",
      equipment: "Machine",
      image1: "/images/exercises/road-cycling-2.png",
      image2: "/images/exercises/road-cycling-1.png",
      howToKey: "exercise.roadCycling.howTo",
    },
    {
      id: 95,
      nameKey: "exercise.rowing.name",
      type: "Cardio",
      equipment: "Machine",
      image1: "/images/exercises/rowing-2.png",
      image2: "/images/exercises/rowing-1.png",
      howToKey: "exercise.rowing.howTo",
    },
    {
      id: 96,
      nameKey: "exercise.running.name",
      type: "Cardio",
      equipment: "Bodyweight",
      image1: "/images/exercises/running-2.png",
      image2: "/images/exercises/running-1.png",
      howToKey: "exercise.running.howTo",
    },
    {
      id: 97,
      nameKey: "exercise.spinning.name",
      type: "Cardio",
      equipment: "Machine",
      image1: "/images/exercises/spinning-2.png",
      image2: "/images/exercises/spinning-1.png",
      howToKey: "exercise.spinning.howTo",
    },
    {
      id: 98,
      nameKey: "exercise.stepMachine.name",
      type: "Cardio",
      equipment: "Machine",
      image1: "/images/exercises/step-machine-2.png",
      image2: "/images/exercises/step-machine-1.png",
      howToKey: "exercise.stepMachine.howTo",
    },
    {
      id: 99,
      nameKey: "exercise.swimming.name",
      type: "Cardio",
      equipment: "Bodyweight",
      image1: "/images/exercises/swimming-2.png",
      image2: "/images/exercises/swimming-1.png",
      howToKey: "exercise.swimming.howTo",
    },
    {
      id: 100,
      nameKey: "exercise.treadmillRunning.name",
      type: "Cardio",
      equipment: "Machine",
      image1: "/images/exercises/treadmill-running-2.png",
      image2: "/images/exercises/treadmill-running-1.png",
      howToKey: "exercise.treadmillRunning.howTo",
    },
    {
      id: 101,
      nameKey: "exercise.walking.name",
      type: "Cardio",
      equipment: "Bodyweight",
      image1: "/images/exercises/walking-2.png",
      image2: "/images/exercises/walking-1.png",
      howToKey: "exercise.walking.howTo",
    },
    {
      id: 102,
      nameKey: "exercise.yoga.name",
      type: "Cardio",
      equipment: "Bodyweight",
      image1: "/images/exercises/yoga-2.png",
      image2: "/images/exercises/yoga-1.png",
      howToKey: "exercise.yoga.howTo",
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
            <TabsList className="flex flex-col sm:flex-row w-full h-auto sm:h-10 mb-8 gap-1 sm:gap-0">
              <TabsTrigger value="exercises" className="flex-1 text-xs sm:text-sm py-2 sm:py-1.5">{t('workouts.tabs.library')}</TabsTrigger>
              <TabsTrigger value="generator" className="flex-1 text-xs sm:text-sm py-2 sm:py-1.5">{t('workouts.tabs.generator')}</TabsTrigger>
              <TabsTrigger value="plan" className="flex-1 text-xs sm:text-sm py-2 sm:py-1.5">{t('workouts.tabs.plan')}</TabsTrigger>
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
                    <SelectContent className="max-h-[300px] overflow-y-auto">
                      <SelectItem value="all">{t('workouts.filters.allTypes')}</SelectItem>
                      <SelectItem value="Strength">{t('workouts.types.strength')}</SelectItem>
                      <SelectItem value="Cardio">{t('workouts.types.cardio')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('workouts.filters.equipment')}</label>
                  <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('workouts.filters.equipment')} />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] overflow-y-auto">
                      <SelectItem value="all">{t('workouts.filters.allEquipment')}</SelectItem>
                      <SelectItem value="Barbell">{t('workouts.equipment.barbell')}</SelectItem>
                      <SelectItem value="Dumbbells">{t('workouts.equipment.dumbbells')}</SelectItem>
                      <SelectItem value="Bodyweight">{t('workouts.equipment.bodyweight')}</SelectItem>
                      <SelectItem value="Bench">{t('workouts.equipment.bench')}</SelectItem>
                      <SelectItem value="StabilityBall">{t('workouts.equipment.stabilityball')}</SelectItem>
                      <SelectItem value="Cable">{t('workouts.equipment.cable')}</SelectItem>
                      <SelectItem value="Machine">{t('workouts.equipment.machine')}</SelectItem>
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
                      onClick={() => setFullscreenExercise({ exercise, title: t(exercise.nameKey) })}
                    >
                      {exercise.media ? (
                        <img
                          src={exercise.media}
                          alt={t(exercise.nameKey)}
                          className="w-full h-full object-contain bg-white"
                        />
                      ) : exercise.image1 && exercise.image2 ? (
                        <ExerciseAnimation
                          image1={exercise.image1}
                          image2={exercise.image2}
                          alt={t(exercise.nameKey)}
                          className="w-full h-full"
                        />
                      ) : null}
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
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                          {exercise.type === "Strength" ? t('workouts.types.strength') : exercise.type}
                        </span>
                        <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-md">
                          {exercise.equipment === "Barbell" ? t('workouts.equipment.barbell') : 
                           exercise.equipment === "Dumbbells" ? t('workouts.equipment.dumbbells') :
                           exercise.equipment === "Bodyweight" ? t('workouts.equipment.bodyweight') :
                           exercise.equipment === "Bench" ? t('workouts.equipment.bench') :
                           exercise.equipment === "StabilityBall" ? t('workouts.equipment.stabilityball') :
                           exercise.equipment === "Machine" ? t('workouts.equipment.machine') : exercise.equipment}
                        </span>
                      </div>
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
      <Dialog open={!!fullscreenExercise} onOpenChange={() => setFullscreenExercise(null)}>
        <DialogContent className="max-w-full w-screen h-screen p-0 bg-black flex flex-col" style={{ maxHeight: '100vh' }}>
          <div className="relative flex flex-col h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full"
              onClick={() => setFullscreenExercise(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="bg-black p-6 flex-1 flex flex-col overflow-hidden">
              <h3 className="text-2xl font-semibold mb-6 text-white">{fullscreenExercise?.title}</h3>
              <div className="flex-1 w-full bg-white flex items-center justify-center overflow-hidden rounded-lg">
                {fullscreenExercise?.exercise.media ? (
                  <img
                    src={fullscreenExercise.exercise.media}
                    alt={fullscreenExercise.title}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : fullscreenExercise?.exercise.image1 && fullscreenExercise?.exercise.image2 ? (
                  <ExerciseAnimation
                    image1={fullscreenExercise.exercise.image1}
                    image2={fullscreenExercise.exercise.image2}
                    alt={fullscreenExercise.title}
                    className="max-w-full max-h-full"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Workouts;
