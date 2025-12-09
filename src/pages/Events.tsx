import { Calendar, MapPin, Plus, X, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const ADMIN_PASSWORD = "Asdfghjkl96611!";
const GALLERY_STORAGE_KEY = "events_gallery_images";

const Events = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [showAddImage, setShowAddImage] = useState(false);
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (stored) {
      setGalleryImages(JSON.parse(stored));
    }
  }, []);

  const handleAddImage = () => {
    if (password !== ADMIN_PASSWORD) {
      toast({
        title: "Error",
        description: t('events.wrongPassword'),
        variant: "destructive",
      });
      return;
    }

    if (!imageUrl.trim()) return;

    const newImages = [...galleryImages, imageUrl];
    setGalleryImages(newImages);
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(newImages));
    setImageUrl("");
    setIsAuthenticated(true);
    toast({
      title: t('support.success'),
      description: t('events.imageAdded'),
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAuthenticated && password !== ADMIN_PASSWORD) {
      toast({
        title: "Error",
        description: t('events.wrongPassword'),
        variant: "destructive",
      });
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const newImages = [...galleryImages, base64String];
      setGalleryImages(newImages);
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(newImages));
      setIsAuthenticated(true);
      toast({
        title: t('support.success'),
        description: t('events.imageAdded'),
      });
    };
    reader.readAsDataURL(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    if (!isAuthenticated && password !== ADMIN_PASSWORD) {
      toast({
        title: "Error",
        description: t('events.wrongPassword'),
        variant: "destructive",
      });
      return;
    }
    
    const newImages = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(newImages);
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(newImages));
  };

  const events = [
    {
      id: 1,
      title: t('events.title'),
      date: t('events.date'),
      location: t('events.location'),
      category: t('events.notActive'),
      description: t('events.description'),
      registrationLink: "https://forms.gle/example",
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
                    <Badge className="bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">
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
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center justify-between">
                            {event.title}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowAddImage(!showAddImage)}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              {t('events.addImage')}
                            </Button>
                          </DialogTitle>
                        </DialogHeader>
                        
                        {showAddImage && (
                          <div className="space-y-4 p-4 bg-muted rounded-lg">
                            {!isAuthenticated && (
                              <Input
                                type="password"
                                placeholder={t('events.enterPassword')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            )}
                            
                            <div className="space-y-3">
                              <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">{t('events.uploadImage')}</label>
                                <div className="flex gap-2">
                                  <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="image-upload"
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => fileInputRef.current?.click()}
                                  >
                                    <Upload className="w-4 h-4 mr-2" />
                                    {t('events.uploadImage')}
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-px bg-border"></div>
                                <span className="text-xs text-muted-foreground">{t('events.orUpload')}</span>
                                <div className="flex-1 h-px bg-border"></div>
                              </div>
                              
                              <div className="flex gap-2">
                                <Input
                                  placeholder={t('events.imageUrl')}
                                  value={imageUrl}
                                  onChange={(e) => setImageUrl(e.target.value)}
                                  className="flex-1"
                                />
                                <Button onClick={handleAddImage} size="sm">
                                  {t('events.add')}
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          {galleryImages.length === 0 ? (
                            <p className="col-span-2 text-center text-muted-foreground py-8">
                              {t('events.noImages')}
                            </p>
                          ) : (
                            galleryImages.map((img, idx) => (
                              <div key={idx} className="relative group/img">
                                <img
                                  src={img}
                                  alt={`${event.title} - Image ${idx + 1}`}
                                  className="w-full h-64 object-cover rounded-lg cursor-pointer"
                                  onClick={() => setFullscreenImage(img)}
                                />
                                {isAuthenticated && (
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 opacity-0 group-hover/img:opacity-100 transition-opacity"
                                    onClick={() => handleRemoveImage(idx)}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            ))
                          )}
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

      {/* Fullscreen Image Modal */}
      <Dialog open={!!fullscreenImage} onOpenChange={() => setFullscreenImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-black/90">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 text-white hover:bg-white/20"
            onClick={() => setFullscreenImage(null)}
          >
            <X className="h-6 w-6" />
          </Button>
          <img
            src={fullscreenImage || ""}
            alt="Fullscreen"
            className="w-full h-auto max-h-[90vh] object-contain"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;
