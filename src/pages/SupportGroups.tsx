import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, MessageCircle, Eye, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Topic {
  id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
  view_count: number;
}

interface Post {
  id: string;
  topic_id: string;
  content: string;
  created_at: string;
  username: string;
}

const SupportGroups = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newTopicOpen, setNewTopicOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [username, setUsername] = useState('');

  const categories = [
    'Mental Health',
    'Nutrition & Diet',
    'Exercise & Fitness',
    'Chronic Conditions',
    'General Wellness',
    'Sleep & Rest',
  ];

  useEffect(() => {
    loadTopics();
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      loadPosts(selectedTopic.id);
      incrementViewCount(selectedTopic.id);
    }
  }, [selectedTopic]);

  const loadTopics = async () => {
    const { data, error } = await supabase
      .from('support_topics')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setTopics(data);
    }
  };

  const loadPosts = async (topicId: string) => {
    const { data, error } = await supabase
      .from('support_posts')
      .select('*')
      .eq('topic_id', topicId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setPosts(data);
    }
  };

  const incrementViewCount = async (topicId: string) => {
    await supabase.rpc('increment_topic_views', { topic_id: topicId });
  };

  const createTopic = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const { error } = await supabase.from('support_topics').insert({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
    });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: t('support.success'), description: t('support.topicCreated') });
      setNewTopicOpen(false);
      loadTopics();
    }
  };

  const createPost = async () => {
    if (!selectedTopic || !replyContent.trim()) return;

    const { error } = await supabase.from('support_posts').insert({
      topic_id: selectedTopic.id,
      content: replyContent,
      username: username.trim() || 'Anonymous',
    });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setReplyContent('');
      loadPosts(selectedTopic.id);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{t('support.title')}</h1>
          <p className="text-muted-foreground mb-6">{t('support.subtitle')}</p>
          <Dialog open={newTopicOpen} onOpenChange={setNewTopicOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                {t('support.createTopic')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('support.newTopic')}</DialogTitle>
              </DialogHeader>
              <form onSubmit={createTopic} className="space-y-4">
                <div>
                  <Label htmlFor="title">{t('support.topicTitle')}</Label>
                  <Input id="title" name="title" required />
                </div>
                <div>
                  <Label htmlFor="description">{t('support.description')}</Label>
                  <Textarea id="description" name="description" required />
                </div>
                <div>
                  <Label htmlFor="category">{t('support.category')}</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  {t('support.create')}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{t('support.topics')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-2">
                    {topics.map((topic) => (
                      <Card
                        key={topic.id}
                        className={`cursor-pointer hover:bg-accent transition ${
                          selectedTopic?.id === topic.id ? 'border-primary' : ''
                        }`}
                        onClick={() => setSelectedTopic(topic)}
                      >
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm">{topic.title}</CardTitle>
                          <CardDescription className="text-xs">
                            {topic.category}
                          </CardDescription>
                          <div className="flex gap-2 text-xs text-muted-foreground mt-2">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {topic.view_count}
                            </span>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            {selectedTopic ? (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedTopic.title}</CardTitle>
                  <CardDescription>{selectedTopic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] mb-4">
                    <div className="space-y-4">
                      {posts.map((post) => (
                        <Card key={post.id}>
                          <CardHeader className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="w-4 h-4" />
                              <span className="text-sm font-medium">{post.username}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(post.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm">{post.content}</p>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="space-y-4">
                    <Input
                      placeholder={t('support.username')}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <Textarea
                      placeholder={t('support.reply')}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <Button onClick={createPost} className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {t('support.post')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center text-muted-foreground">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>{t('support.selectTopic')}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportGroups;