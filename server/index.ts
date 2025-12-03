import express from 'express';
import { db } from './db.js';
import { supportTopics, supportPosts } from '../shared/schema.js';
import { eq, desc, asc, sql } from 'drizzle-orm';

const app = express();
app.use(express.json());

const toSnakeCase = (obj: any) => {
  if (!obj) return obj;
  return {
    id: obj.id,
    title: obj.title,
    description: obj.description,
    category: obj.category,
    created_at: obj.createdAt,
    is_anonymous: obj.isAnonymous,
    view_count: obj.viewCount,
    topic_id: obj.topicId,
    content: obj.content,
    username: obj.username,
  };
};

app.get('/api/support/topics', async (req, res) => {
  try {
    const topics = await db
      .select()
      .from(supportTopics)
      .orderBy(desc(supportTopics.createdAt));
    res.json(topics.map(toSnakeCase));
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
});

app.post('/api/support/topics', async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const [newTopic] = await db
      .insert(supportTopics)
      .values({ title, description, category })
      .returning();
    res.json(toSnakeCase(newTopic));
  } catch (error) {
    console.error('Error creating topic:', error);
    res.status(500).json({ error: 'Failed to create topic' });
  }
});

app.put('/api/support/topics/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const [updatedTopic] = await db
      .update(supportTopics)
      .set({ title, description })
      .where(eq(supportTopics.id, id))
      .returning();
    res.json(toSnakeCase(updatedTopic));
  } catch (error) {
    console.error('Error updating topic:', error);
    res.status(500).json({ error: 'Failed to update topic' });
  }
});

app.delete('/api/support/topics/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(supportPosts).where(eq(supportPosts.topicId, id));
    await db.delete(supportTopics).where(eq(supportTopics.id, id));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting topic:', error);
    res.status(500).json({ error: 'Failed to delete topic' });
  }
});

app.post('/api/support/topics/:id/increment-views', async (req, res) => {
  try {
    const { id } = req.params;
    await db
      .update(supportTopics)
      .set({ viewCount: sql`${supportTopics.viewCount} + 1` })
      .where(eq(supportTopics.id, id));
    res.json({ success: true });
  } catch (error) {
    console.error('Error incrementing views:', error);
    res.status(500).json({ error: 'Failed to increment views' });
  }
});

app.get('/api/support/posts/:topicId', async (req, res) => {
  try {
    const { topicId } = req.params;
    const posts = await db
      .select()
      .from(supportPosts)
      .where(eq(supportPosts.topicId, topicId))
      .orderBy(asc(supportPosts.createdAt));
    res.json(posts.map(toSnakeCase));
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.post('/api/support/posts', async (req, res) => {
  try {
    const { topicId, content, username } = req.body;
    const [newPost] = await db
      .insert(supportPosts)
      .values({ topicId, content, username })
      .returning();
    res.json(toSnakeCase(newPost));
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.put('/api/support/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const [updatedPost] = await db
      .update(supportPosts)
      .set({ content })
      .where(eq(supportPosts.id, id))
      .returning();
    res.json(toSnakeCase(updatedPost));
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

app.delete('/api/support/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(supportPosts).where(eq(supportPosts.id, id));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
