import { Devvit, useState } from '@devvit/public-api';

Devvit.configure({
    redditAPI: true,
    redis: true,
});

Devvit.addCustomPostType({
    name: 'app-hunt',
    height: 'tall',
    render: (context) => {
        const [playing, setPlaying] = useState(false);

        const onMessage = async (msg: any) => {
            if (msg.type === 'GAME_OVER') {
                const user = await context.reddit.getCurrentUser();
                await context.redis.zAdd('app_hunt_leaderboard', { member: user?.username || 'Anonymous', score: msg.score });
            }
        };

        if (playing) {
            return (
                <vstack height="100%" width="100%">
                    <webview
                        id="app-hunt-webview"
                        url="index.html"
                        height="100%"
                        width="100%"
                        onMessage={onMessage}
                    />
                </vstack>
            );
        }

        return (
            <vstack height="100%" width="100%" alignment="middle center" backgroundColor="#000000">
                <text size="xxlarge" weight="bold" color="white">APP HUNT</text>
                <spacer size="medium" />
                <button onPress={() => setPlaying(true)}>PLAY v1.3.0</button>
            </vstack>
        );
    }
});

Devvit.addMenuItem({
    label: 'Post app-hunt',
    location: 'subreddit',
    onPress: async (_event, context) => {
        const subreddit = await context.reddit.getCurrentSubreddit();
        await context.reddit.submitPost({
            title: 'App Hunt: Search Challenge',
            subredditName: subreddit.name,
            preview: (
                <vstack height="100%" width="100%" alignment="middle center" backgroundColor="#000000">
                    <text size="xlarge" weight="bold" color="white">APP HUNT</text>
                    <text color="lightgray">Initializing...</text>
                </vstack>
            )
        });
        context.ui.showToast('Post created!');
    }
});

export default Devvit;
