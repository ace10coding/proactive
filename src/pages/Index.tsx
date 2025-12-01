import { ArrowRight, Heart, Target, Users, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-health.jpg";

const Index = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: t('home.newsletter.success'),
        description: t('home.newsletter.success'),
      });
      setEmail("");
    }
  };

  const posts = [
    {
      id: 1,
      title: "Health Risks of Alcohol-Induced Dehydration",
      excerpt: "Drinking alcohol makes you pee a lot more because it blocks a hormone called vasopressin. When that hormone is suppressed, your kidneys stop retaining water, so you lose fluids and important electrolytes quickly. That's why you wake up after a night of drinking feeling like a dried-out sponge.\n\nThat kind of dehydration isn't just uncomfortable; it can actually be rough on your body. It puts extra strain on your kidneys, throws your electrolytes out of balance (which can make your heart and muscles act weird), raises blood pressure, fogs up your thinking, dries out your skin, and in really bad cases can even lead to dangerously low blood volume (shock) or swelling in the brain.",
      icon: Heart,
      color: "text-primary",
      link: "#subscribe",
    },
  ];

  const features = [
    {
      title: t('home.features.events.title'),
      description: t('home.features.events.desc'),
      link: "/events",
    },
    {
      title: "Calculate BMI",
      description: "Track your health metrics with our BMI calculator",
      link: "/calculator",
    },
    {
      title: t('home.features.workouts.title'),
      description: t('home.features.workouts.desc'),
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
              {t('home.hero.title')}
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-white/90 animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-150">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/workouts">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8 animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-300"
                >
                  {t('home.hero.viewWorkouts')} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/calculator">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8 animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-300"
                >
                  {t('home.hero.checkBMI')} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
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
              {t('home.blog.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.features.advocacy.desc')}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            {posts.map((post) => (
              <a key={post.id} href={post.link} className="block">
                <Card className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <post.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed whitespace-pre-line">
                      {post.excerpt}
                    </CardDescription>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
          
          {/* Email Subscription */}
          <div id="subscribe" className="max-w-2xl mx-auto mt-12">
            <Card className="bg-gradient-subtle border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    {t('home.newsletter.title')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('home.newsletter.desc')}
                  </p>
                </div>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder={t('home.newsletter.placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    {t('home.newsletter.button')}
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
