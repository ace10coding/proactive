import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator as CalculatorIcon } from "lucide-react";

const Calculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (weightNum > 0 && heightNum > 0) {
      const heightInMeters = heightNum / 100;
      const bmiValue = weightNum / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(1)));

      // Determine BMI category
      if (bmiValue < 18.5) {
        setCategory("Underweight");
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setCategory("Normal weight");
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setCategory("Overweight");
      } else {
        setCategory("Obese");
      }
    }
  };

  const getBMIColor = () => {
    if (!bmi) return "";
    if (bmi < 18.5) return "text-blue-600";
    if (bmi >= 18.5 && bmi < 25) return "text-primary";
    if (bmi >= 25 && bmi < 30) return "text-secondary";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
              BMI Calculator
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              Calculate your Body Mass Index and understand your health status
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalculatorIcon className="w-6 h-6 text-primary" />
                  Calculate Your BMI
                </CardTitle>
                <CardDescription>
                  Enter your weight and height to calculate your Body Mass Index
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="e.g., 70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="e.g., 175"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <Button
                    onClick={calculateBMI}
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                    size="lg"
                  >
                    Calculate BMI
                  </Button>
                </div>

                {bmi && (
                  <div className="mt-8 p-6 rounded-lg bg-muted/50 space-y-4 animate-in fade-in-50 slide-in-from-bottom-3">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Your BMI is</p>
                      <p className={`text-5xl font-heading font-bold ${getBMIColor()}`}>
                        {bmi}
                      </p>
                      <p className="text-xl font-medium text-foreground mt-2">{category}</p>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <h3 className="font-semibold mb-3">BMI Categories:</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Underweight:</span>
                          <span className="font-medium">BMI &lt; 18.5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Normal weight:</span>
                          <span className="font-medium">BMI 18.5 - 24.9</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Overweight:</span>
                          <span className="font-medium">BMI 25 - 29.9</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Obese:</span>
                          <span className="font-medium">BMI ≥ 30</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculator;
