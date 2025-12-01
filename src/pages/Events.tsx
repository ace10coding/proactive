import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const Events = () => {
  const { t } = useLanguage();
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  
  const events = [
    {
      id: 1,
      title: "City Bicycle Marathon",
      date: "December 12, 2026",
      location: "No 85, R. Ngungunhane, Maputo",
      category: "Cycling",
      description: "The ride starts and finishes at Maputo Shopping Centre, following the route to Circular Tchumene and back. Entry is free for everyone who brings their own bicycle and helmet. If you don't have a bicycle, you can rent a road bicycle + helmet for only 200 Meticals.",
      registrationLink: "https://forms.gle/example",
      gallery: [
        "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        "https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=800",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
              {t('events.hero.title')}
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              {t('events.hero.subtitle')}
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
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(event.registrationLink, '_blank')}
                    >
                      {t('events.register')}
                    </Button>
                    <Dialog open={selectedEvent === event.id} onOpenChange={(open) => setSelectedEvent(open ? event.id : null)}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          {t('events.viewGallery')}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{event.title}</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          {event.gallery.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt={`${event.title} - Image ${idx + 1}`}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
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
