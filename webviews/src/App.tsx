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
  const [timer, setTimer] = useState(0); // in deciseconds (1/10th of a second)
  const [wrongTaps, setWrongTaps] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const [shuffledApps, setShuffledApps] = useState<AppInfo[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const [status, setStatus] = useState<string>('Ready');

  // Listen for messages from Devvit
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('Webview: Received message', event.data);
      const { type, data } = event.data;
      if (type === 'LEADERBOARD_UPDATE') {
        setLeaderboard(data || []);
        setStatus('Ready');
      }
    };

    window.addEventListener('message', handleMessage);
    
    const fetchLeaderboard = () => {
      window.parent.postMessage({ type: 'GET_LEADERBOARD' }, '*');
    };

    setTimeout(fetchLeaderboard, 500);
    const interval = setInterval(fetchLeaderboard, 8000); 
    
    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(interval);
    };
  }, []);

  const formatTime = (deciseconds: number) => {
    const totalSeconds = deciseconds / 10;
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    const deci = deciseconds % 10;
    return `${mins}:${secs.toString().padStart(2, '0')}.${deci}`;
  };

  const startNewChallenge = useCallback(() => {
    const count = Math.floor(Math.random() * 3) + 2; 
    const shuffled = [...ALL_APPS].sort(() => Math.random() - 0.5);
    const targets = Array.from(new Set(shuffled.slice(0, count).map(a => a.id)));
    
    setTargetApps(targets);
    setFoundApps([]);
    setShuffledApps([...ALL_APPS].sort(() => Math.random() - 0.5));
    setTimer(0);
    setWrongTaps(0);
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
      }, 100);
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
        // High-stakes speed bonus: reward sub-15-second completions heavily
        const totalSeconds = timer / 10;
        const speedBonus = Math.max(0, Math.floor((15 - totalSeconds) * 150));
        const perfectBonus = wrongTaps === 0 ? 300 : 0;
        const roundBonus = 500;
        
        setScore(prev => prev + roundBonus + speedBonus + perfectBonus);
        
        if (round < 3) {
          setTimeout(() => {
            setRound(prev => prev + 1);
            startNewChallenge();
          }, 1000);
        } else {
          setTimeout(() => {
            const currentTotal = score + roundBonus + speedBonus + perfectBonus;
            const finalScore = Math.floor(hardMode ? currentTotal * 1.5 : currentTotal);
            setScore(finalScore);
            setPhase('RESULT');
            
            // Send score to Devvit
            window.parent.postMessage({ type: 'GAME_OVER', score: finalScore }, '*');
            setStatus('Saving Score...');
          }, 1000);
        }
      }
    } else if (!foundApps.includes(appId)) {
      // Wrong Tap
      setWrongTaps(prev => prev + 1);
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
            <div style={{ fontSize: '14px', fontWeight: 700 }}>Find:</div>
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
            <div style={{ alignSelf: 'flex-end', fontSize: '16px', fontWeight: 800, color: '#ffcc00' }}>
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
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Hunt Complete!</h2>
          <div style={{ fontSize: '48px', fontWeight: 800, margin: '10px 0', color: '#ffcc00' }}>
            {score}
          </div>
          <p style={{ fontSize: '12px', opacity: 0.7, marginBottom: '20px' }}>Total Points Secured</p>
          
          <div className="leaderboard-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div className="leaderboard-title" style={{ margin: 0 }}>Top Hunters</div>
                <div style={{ fontSize: '10px', opacity: 0.5 }}>{status}</div>
            </div>
            {leaderboard.length > 0 ? leaderboard.map((entry, i) => (
              <div key={i} className={`leaderboard-card ${i < 3 ? `top-${i + 1}` : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="rank-badge">{i + 1}</div>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>{entry.member}</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#ffcc00' }}>{Math.floor(entry.score)}</span>
              </div>
            )) : <p style={{ fontSize: '12px', opacity: 0.5 }}>Syncing scores...</p>}
          </div>

          <button className="btn" style={{ marginTop: '15px', width: '100%' }} onClick={() => setPhase('START')}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
