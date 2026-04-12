import { useState, useEffect, useCallback, useMemo } from 'react';
import { AppIcons } from './Icons';

interface AppInfo {
  id: string;
  name: string;
  domain: string;
}

interface LeaderboardEntry {
  member: string;
  score: number;
}

type GamePhase = 'START' | 'PLAYING' | 'RESULT';

const ALL_APPS: AppInfo[] = [
  { id: 'reddit', name: 'Reddit', domain: 'reddit.com' },
  { id: 'instagram', name: 'Instagram', domain: 'instagram.com' },
  { id: 'spotify', name: 'Spotify', domain: 'spotify.com' },
  { id: 'youtube', name: 'YouTube', domain: 'youtube.com' },
  { id: 'tiktok', name: 'TikTok', domain: 'tiktok.com' },
  { id: 'netflix', name: 'Netflix', domain: 'netflix.com' },
  { id: 'chrome', name: 'Chrome', domain: 'google.com' },
  { id: 'maps', name: 'Maps', domain: 'google.com/maps' },
  { id: 'whatsapp', name: 'WhatsApp', domain: 'whatsapp.com' },
  { id: 'discord', name: 'Discord', domain: 'discord.com' },
  { id: 'gmail', name: 'Gmail', domain: 'mail.google.com' },
  { id: 'photos', name: 'Photos', domain: 'photos.google.com' },
  { id: 'settings', name: 'Settings', domain: 'apple.com' },
  { id: 'camera', name: 'Camera', domain: 'camera.info' },
  { id: 'twitch', name: 'Twitch', domain: 'twitch.tv' },
  { id: 'facebook', name: 'Facebook', domain: 'facebook.com' },
];

function App() {
  const [phase, setPhase] = useState<GamePhase>('START');
  const [hardMode, setHardMode] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [targetApps, setTargetApps] = useState<string[]>([]);
  const [foundApps, setFoundApps] = useState<string[]>([]);
  const [timer, setTimer] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const [shuffledApps, setShuffledApps] = useState<AppInfo[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Listen for messages from Devvit
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, data } = event.data;
      if (type === 'LEADERBOARD_UPDATE') {
        setLeaderboard(data || []);
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Initial request for leaderboard
    window.parent.postMessage({ type: 'GET_LEADERBOARD' }, '*');
    
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startNewChallenge = useCallback(() => {
    const count = Math.floor(Math.random() * 3) + 2; 
    const shuffled = [...ALL_APPS].sort(() => Math.random() - 0.5);
    const targets = shuffled.slice(0, count).map(a => a.id);
    
    setTargetApps(targets);
    setFoundApps([]);
    setShuffledApps([...ALL_APPS].sort(() => Math.random() - 0.5));
    setTimer(0);
    setPhase('PLAYING');
  }, []);

  const startGame = () => {
    setScore(0);
    setRound(1);
    startNewChallenge();
  };

  useEffect(() => {
    let interval: number;
    if (phase === 'PLAYING') {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase]);

  const handleAppTap = (appId: string) => {
    if (phase !== 'PLAYING') return;

    if (targetApps.includes(appId) && !foundApps.includes(appId)) {
      const newFound = [...foundApps, appId];
      setFoundApps(newFound);
      setScore(prev => prev + 100);
      setLastFeedback('CORRECT');

      if (newFound.length === targetApps.length) {
        const speedBonus = Math.max(0, (30 - timer) * 10);
        const roundBonus = 500;
        setScore(prev => prev + roundBonus + speedBonus);
        
        if (round < 3) {
          setTimeout(() => {
            setRound(prev => prev + 1);
            startNewChallenge();
          }, 1000);
        } else {
          setTimeout(() => {
            const finalScore = Math.floor(hardMode ? (score + roundBonus + speedBonus) * 1.5 : (score + roundBonus + speedBonus));
            setScore(finalScore);
            setPhase('RESULT');
            
            // Send score to Devvit
            window.parent.postMessage({ type: 'GAME_OVER', score: finalScore }, '*');
          }, 1000);
        }
      }
    } else {
      setScore(prev => Math.max(0, prev - 50));
      setLastFeedback('WRONG');
      setTimeout(() => setLastFeedback(null), 500);
    }
  };

  const currentTime = useMemo(() => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  }, []);

  return (
    <div className={`phone-frame ${hardMode ? 'hard-mode' : ''}`}>
      <div className="phone-wallpaper" />
      <div className={`dynamic-island ${lastFeedback ? 'expanded' : ''}`} />

      <div className="status-bar">
        <span>{currentTime}</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span>{formatTime(timer)}</span>
          <span>5G</span>
          <div style={{ width: 20, height: 10, border: '1px solid white', borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 1, background: '#34c759', width: '80%' }} />
          </div>
        </div>
      </div>

      {phase === 'START' && (
        <div className="screen">
          <h1 style={{ fontSize: '48px', margin: 0 }}>App Hunt</h1>
          <p style={{ opacity: 0.7, marginBottom: '40px' }}>Find the apps as fast as you can!</p>
          
          <div className="toggle-group">
            <span style={{ fontWeight: 600 }}>Hard Mode (No Labels)</span>
            <input 
              type="checkbox" 
              checked={hardMode} 
              onChange={e => setHardMode(e.target.checked)}
              style={{ width: 24, height: 24 }}
            />
          </div>

          <button className="btn" onClick={startGame}>Start Game</button>
        </div>
      )}

      {phase === 'PLAYING' && (
        <>
          <div className="challenge-banner">
            <div className="challenge-title">Challenge {round} of 3</div>
            <div style={{ fontSize: '18px', fontWeight: 700 }}>Find:</div>
            <div className="challenge-targets">
              {targetApps.map(appId => {
                const app = ALL_APPS.find(a => a.id === appId);
                return (
                  <div key={appId} className={`target-tag ${foundApps.includes(appId) ? 'found' : ''}`}>
                    {app?.name}
                  </div>
                );
              })}
            </div>
            <div style={{ alignSelf: 'flex-end', fontSize: '20px', fontWeight: 800, color: '#ffcc00' }}>
              Score: {score}
            </div>
          </div>

          <div className="app-drawer">
            {shuffledApps.map((app) => (
              <div 
                key={app.id} 
                className="app-icon-container"
                onClick={() => handleAppTap(app.id)}
              >
                <div className="app-icon">
                  {AppIcons[app.id]}
                </div>
                <div className="app-label">{app.name}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {phase === 'RESULT' && (
        <div className="screen">
          <h2 style={{ fontSize: '32px' }}>Game Over!</h2>
          <div style={{ fontSize: '64px', fontWeight: 800, margin: '20px 0', color: '#ffcc00' }}>
            {score}
          </div>
          <p>Total Points Collected</p>
          {hardMode && <p style={{ color: '#ffcc00', fontWeight: 700 }}>1.5x Hard Mode Multiplier Applied!</p>}
          
          <div style={{ margin: '20px 0', width: '100%', maxHeight: '150px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '18px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px' }}>Top Hunters</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {leaderboard.length > 0 ? leaderboard.map((entry, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', opacity: 0.8 }}>
                  <span>{i + 1}. {entry.member}</span>
                  <span>{Math.floor(entry.score)}</span>
                </div>
              )) : <p style={{ fontSize: '12px', opacity: 0.5 }}>No scores yet.</p>}
            </div>
          </div>

          <button className="btn" style={{ marginTop: '20px' }} onClick={() => setPhase('START')}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
