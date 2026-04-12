import { Hono } from 'hono';

const app = new Hono();

// All server endpoints must start with /api/
const api = app.basePath('/api');

// Handle Score Submission
api.post('/score', async (c) => {
  try {
    const { score } = await c.req.json();
    const context = (c.env as any).context;
    
    const user = await context.reddit.getCurrentUser();
    const username = user?.username || 'Anonymous';
    
    // Save to Redis Leaderboard
    await context.redis.zAdd('app_hunt_leaderboard', {
      member: username,
      score: score,
    });
    
    return c.json({ success: true, username, score });
  } catch (error) {
    console.error('API Error:', error);
    return c.json({ success: false, error: 'Internal Server Error' }, 500);
  }
});

// Get Leaderboard
api.get('/leaderboard', async (c) => {
  try {
    const context = (c.env as any).context;
    const scores = await context.redis.zRange('app_hunt_leaderboard', 0, 9, { by: 'rank', reverse: true });
    
    // Convert Redis results to expected JSON format
    const leaderboard = scores.map(s => ({
      member: s.member,
      score: s.score
    }));
    
    return c.json(leaderboard);
  } catch (error) {
    console.error('API Error:', error);
    return c.json({ success: false, error: 'Internal Server Error' }, 500);
  }
});

export default app;
