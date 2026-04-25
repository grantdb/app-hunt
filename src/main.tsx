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

        const onMessage = async (msg: any) => {
            try {
                if (msg.type === 'GET_LEADERBOARD' || msg.type === 'SUBMIT_SCORE') {
                    let userRank = -1;
                    const user = await context.reddit.getCurrentUser();
                    const username = user?.username || 'Anonymous';

                    if (msg.type === 'SUBMIT_SCORE') {
                        await context.redis.zAdd('app_hunt_leaderboard', { member: username, score: msg.score });
                    }

                    // Fetch top scores
                    const topScores = await context.redis.zRange('app_hunt_leaderboard', 0, 9, { by: 'rank', reverse: true });
                    const leaderboardData = topScores.map(entry => ({
                        member: entry.member,
                        score: entry.score
                    }));

                    // Fetch user's rank
                    const rank = await context.redis.zRank('app_hunt_leaderboard', username);
                    if (rank !== undefined) {
                        const total = await context.redis.zCard('app_hunt_leaderboard');
                        userRank = total - rank;
                    }

                    // Send back to webview
                    context.ui.webView.postMessage('app-hunt-webview', {
                        type: 'LEADERBOARD_DATA',
                        data: leaderboardData,
                        userRank: userRank
                    });
                }
            } catch (error) {
                console.error('[App Hunt] onMessage error:', error);
                context.ui.webView.postMessage('app-hunt-webview', {
                    type: 'SYNC_ERROR',
                    message: 'Failed to sync with mission control'
                });
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
