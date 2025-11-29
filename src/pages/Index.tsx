import { ArrowRight, Heart, Target, Users, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-health.jpg";

const Index = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our health newsletter.",
      });
      setEmail("");
    }
  };

  const posts = [
    {
      id: 1,
      title: "Health Risks of Alcohol-Induced Dehydration",
      excerpt: "Alcohol acts as a diuretic by suppressing vasopressin, causing kidneys to release more water and electrolytes, leading to dehydration. This can result in kidney problems, electrolyte imbalances, organ stress, high blood pressure, impaired cognitive function, skin issues, and in severe cases, shock or brain damage. Stay hydrated with water, sparkling water, non-alcoholic beverages, infused water, herbal teas, coconut water, or kombucha instead.",
      icon: Heart,
      color: "text-primary",
    },
  ];

  const features = [
    {
      title: "Find Events",
      description: "Join health and fitness events in your community",
      link: "/events",
    },
    {
      title: "Calculate BMI",
      description: "Track your health metrics with our BMI calculator",
      link: "/calculator",
    },
    {
      title: "Get Workouts",
      description: "Access professional workout programs for all levels",
      link: "/workouts",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
              Be PROACTIVE About Your Health
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-white/90 animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-150">
              Join our community dedicated to promoting good health and wellbeing through fitness, nutrition, and mindful living.
            </p>
            <Link to="/events">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8 animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-300"
              >
                Explore Events <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Link key={idx} to={feature.link}>
                <Card className="h-full group hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Health Advocacy Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              Health & Wellbeing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering you with knowledge for a healthier lifestyle
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <post.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Email Subscription */}
          <div className="max-w-2xl mx-auto mt-12">
            <Card className="bg-gradient-subtle border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    Stay Updated
                  </h3>
                  <p className="text-muted-foreground">
                    Subscribe to receive health tips and wellness updates
                  </p>
                </div>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Subscribe
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Take the first step towards a healthier, more active lifestyle today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8"
              >
                Check Your BMI
              </Button>
            </Link>
            <Link to="/workouts">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8"
              >
                View Workouts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
