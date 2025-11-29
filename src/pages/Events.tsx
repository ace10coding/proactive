import { Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Events = () => {
  const events = [
    {
      id: 1,
      title: "City Marathon 2024",
      date: "December 15, 2024",
      location: "Downtown City Center",
      participants: 2500,
      category: "Running",
      description: "Annual city marathon with 5K, 10K, and full marathon options.",
    },
    {
      id: 2,
      title: "Wellness Yoga Festival",
      date: "January 8, 2025",
      location: "Sunrise Park",
      participants: 500,
      category: "Yoga",
      description: "Day-long yoga and meditation retreat for all skill levels.",
    },
    {
      id: 3,
      title: "Community Fitness Challenge",
      date: "January 20, 2025",
      location: "Community Sports Complex",
      participants: 1200,
      category: "Fitness",
      description: "Team-based fitness competition with multiple workout stations.",
    },
    {
      id: 4,
      title: "Healthy Living Expo",
      date: "February 3, 2025",
      location: "Convention Center",
      participants: 3000,
      category: "Wellness",
      description: "Health and wellness expo featuring nutrition, fitness, and mental health resources.",
    },
    {
      id: 5,
      title: "Trail Running Adventure",
      date: "February 17, 2025",
      location: "Mountain Ridge Trail",
      participants: 800,
      category: "Running",
      description: "Scenic trail run through beautiful mountain landscapes.",
    },
    {
      id: 6,
      title: "Group Cycling Tour",
      date: "March 5, 2025",
      location: "Coastal Highway",
      participants: 600,
      category: "Cycling",
      description: "Guided cycling tour along the scenic coastal route.",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
              Health & Fitness Events
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              Join our community events and take your wellness journey to the next level
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card
                key={event.id}
                className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      {event.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {event.title}
                  </CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    {event.participants.toLocaleString()} participants expected
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

export default Events;
