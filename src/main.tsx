import { Devvit, useState } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
  redis: true,
});

Devvit.addCustomPostType({
  name: 'App Hunt',
  height: 'tall',
  render: (context) => {
    const onMessage = async (msg: any) => {
      if (msg.type === 'GAME_OVER') {
        const { score } = msg;
        const user = await context.reddit.getCurrentUser();
        const username = user?.username || 'Anonymous';
        
        // Save score to Redis
        await context.redis.zAdd('app_hunt_leaderboard', {
          member: username,
          score: score,
        });

        context.ui.showToast(`High score saved: ${score}!`);

        // Update webview with latest leaderboard
        const scores = await context.redis.zRange('app_hunt_leaderboard', 0, 9, { by: 'rank', reverse: true });
        context.ui.webView.postMessage('app-hunt-webview', {
          type: 'LEADERBOARD_UPDATE',
          data: scores
        });
      }

      if (msg.type === 'GET_LEADERBOARD') {
        const scores = await context.redis.zRange('app_hunt_leaderboard', 0, 9, { by: 'rank', reverse: true });
        context.ui.webView.postMessage('app-hunt-webview', {
          type: 'LEADERBOARD_UPDATE',
          data: scores
        });
      }
    };

    return (
      <vstack height="100%" width="100%" alignment="middle center">
        <webview
          id="app-hunt-webview"
          url="index.html"
          onMessage={onMessage}
          height="100%"
          width="100%"
        />
      </vstack>
    );
  },
});

Devvit.addMenuItem({
  label: 'Post App Hunt Game',
  location: 'subreddit',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    
    await reddit.submitPost({
      title: 'App Hunt: Smartphone Search Challenge',
      subredditName: subreddit.name,
      preview: (
        <vstack alignment="middle center" height="100%" width="100%" gap="medium">
            <text size="xlarge" weight="bold" color="#ff4500">APP HUNT</text>
            <text>Loading Smartphone UI...</text>
        </vstack>
      ),
    });
    
    ui.showToast('App Hunt post created!');
  },
});

export default Devvit;
