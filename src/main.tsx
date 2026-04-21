import { Devvit, useState } from '@devvit/public-api';

Devvit.configure({
    redditAPI: true,
    redis: true,
});

Devvit.addCustomPostType({
    name: 'app-hunt',
    height: 'tall',
    render: (context) => {
        console.log(`[App Hunt] Rendering post. User: ${context.userId}`);
        const [playing, setPlaying] = useState(false);

        const onMessage = (msg: any) => {
            if (msg.type === 'GAME_OVER') {
                const handleScore = async () => {
                    const user = await context.reddit.getCurrentUser();
                    await context.redis.zAdd('app_hunt_leaderboard', { member: user?.username || 'Anonymous', score: msg.score });
                };
                handleScore().catch(e => console.error('Score error:', e));
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
            <vstack height="100%" width="100%" alignment="middle center" backgroundColor="#09090b">
                <text size="xxlarge" weight="bold" color="white" tracking="tighter">APP HUNT</text>
                <text size="small" color="#5856d6" weight="bold">MISSION OS v3.0</text>
                <spacer size="large" />
                <button 
                    appearance="primary" 
                    onPress={() => setPlaying(true)}
                >
                    INITIALIZE MISSION
                </button>
            </vstack>
        );
    }
});

Devvit.addMenuItem({
    label: 'Post App Hunt',
    location: 'subreddit',
    onPress: async (_event, context) => {
        const subreddit = await context.reddit.getCurrentSubreddit();
        await context.reddit.submitPost({
            title: 'App Hunt: Search Challenge',
            subredditName: subreddit.name,
            type: 'app-hunt',
            preview: (
                <vstack height="100%" width="100%" alignment="middle center" backgroundColor="#09090b">
                    <text size="xlarge" weight="bold" color="white">APP HUNT</text>
                    <text color="#5856d6" size="small" weight="bold">LOADING OS...</text>
                </vstack>
            )
        });
        context.ui.showToast('App Hunt mission deployed!');
    }
});

export default Devvit;
