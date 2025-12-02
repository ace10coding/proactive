-- Create support group topics table
CREATE TABLE IF NOT EXISTS public.support_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  is_anonymous BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0
);

-- Create support group posts/replies table
CREATE TABLE IF NOT EXISTS public.support_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES public.support_topics(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  is_anonymous BOOLEAN DEFAULT true,
  username TEXT
);

-- Create chat messages table for AI health assistant
CREATE TABLE IF NOT EXISTS public.health_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.support_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for support topics (public read, anyone can create)
CREATE POLICY "Anyone can view support topics"
  ON public.support_topics FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create support topics"
  ON public.support_topics FOR INSERT
  WITH CHECK (true);

-- RLS Policies for support posts (public read, anyone can create)
CREATE POLICY "Anyone can view support posts"
  ON public.support_posts FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create support posts"
  ON public.support_posts FOR INSERT
  WITH CHECK (true);

-- RLS Policies for chat messages (anyone can create and read their own session)
CREATE POLICY "Anyone can view their own chat messages"
  ON public.health_chat_messages FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create chat messages"
  ON public.health_chat_messages FOR INSERT
  WITH CHECK (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_support_posts_topic_id ON public.support_posts(topic_id);
CREATE INDEX IF NOT EXISTS idx_health_chat_session ON public.health_chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_support_topics_created ON public.support_topics(created_at DESC);

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_topic_views(topic_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.support_topics
  SET view_count = view_count + 1
  WHERE id = topic_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION increment_topic_views(UUID) TO anon, authenticated;