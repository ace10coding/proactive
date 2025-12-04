import { ArrowRight, Mail, Share2, Droplets, Moon } from "lucide-react";
import { useState, useRef } from "react";
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      titleKey: "didyouknow.hydration.title",
      contentKey: "didyouknow.hydration.content",
      icon: Droplets,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      titleKey: "didyouknow.sleep.title",
      contentKey: "didyouknow.sleep.content",
      icon: Moon,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  const features = [
    {
      title: t('home.features.events.title'),
      description: t('home.features.events.desc'),
      link: "/events",
    },
    {
      title: t('home.features.bmi.title'),
      description: t('home.features.bmi.desc'),
      link: "/calculator",
    },
    {
      title: t('home.features.workouts.title'),
      description: t('home.features.workouts.desc'),
      link: "/workouts",
    },
  ];

  const generateShareImage = async (post: typeof posts[0]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for vertical social media (1080x1920 for Instagram stories)
    canvas.width = 1080;
    canvas.height = 1920;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f172a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // "Did you know?" header - centered
    ctx.font = 'bold 48px system-ui';
    ctx.fillStyle = '#94a3b8';
    const headerText = 'Did you know?';
    const headerWidth = ctx.measureText(headerText).width;
    ctx.fillText(headerText, (canvas.width - headerWidth) / 2, 700);

    // Title - centered
    ctx.font = 'bold 64px system-ui';
    ctx.fillStyle = '#ffffff';
    const titleText = t(post.titleKey);
    const titleWidth = ctx.measureText(titleText).width;
    ctx.fillText(titleText, (canvas.width - titleWidth) / 2, 800);

    // Content - word wrap, centered
    ctx.font = '36px system-ui';
    ctx.fillStyle = '#e2e8f0';
    const content = t(post.contentKey);
    const words = content.split(' ');
    let line = '';
    let y = 920;
    const maxWidth = canvas.width - 120;
    const lines: string[] = [];

    for (const word of words) {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth) {
        lines.push(line.trim());
        line = word + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());

    // Draw centered lines
    for (const l of lines) {
      const lineWidth = ctx.measureText(l).width;
      ctx.fillText(l, (canvas.width - lineWidth) / 2, y);
      y += 50;
    }

    // Bottom branding - Proactive logo with gradient
    ctx.font = 'bold 56px system-ui';
    const proactiveGradient = ctx.createLinearGradient(canvas.width / 2 - 200, 1700, canvas.width / 2 + 200, 1700);
    proactiveGradient.addColorStop(0, '#22c55e');
    proactiveGradient.addColorStop(1, '#3b82f6');
    ctx.fillStyle = proactiveGradient;
    const logoText = 'Proactive';
    const logoWidth = ctx.measureText(logoText).width;
    ctx.fillText(logoText, (canvas.width - logoWidth) / 2, 1800);

    // Download the image
    const link = document.createElement('a');
    link.download = `proactive-${post.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    toast({
      title: t('didyouknow.imageDownloaded'),
      description: t('didyouknow.shareDescription'),
    });
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hidden canvas for generating share images */}
      <canvas ref={canvasRef} className="hidden" />

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
            <div className="flex flex-col sm:flex-row gap-4">
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

      {/* Did You Know Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              {t('didyouknow.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('didyouknow.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {posts.map((post) => (
              <Card key={post.id} className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${post.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <post.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {t(post.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base leading-relaxed">
                    {t(post.contentKey)}
                  </CardDescription>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateShareImage(post)}
                    className="gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    {t('didyouknow.share')}
                  </Button>
                </CardContent>
              </Card>
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
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8"
              >
                {t('home.cta.bmi')}
              </Button>
            </Link>
            <Link to="/workouts">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8"
              >
                {t('home.cta.workouts')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
