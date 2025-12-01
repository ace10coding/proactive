import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Events = () => {
  const events = [
    {
      id: 1,
      title: "City Bicycle Marathon",
      date: "December 12, 2026",
      location: "No 85, R. Ngungunhane, Maputo",
      category: "Cycling",
      description: "The ride starts and finishes at Maputo Shopping Centre, following the route to Circular Tchumene and back. Entry is free for everyone who brings their own bicycle and helmet. If you don't have a bike, you can rent a city road bicycle + helmet for only 200 Meticals.",
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
