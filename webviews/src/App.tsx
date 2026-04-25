import { useState, useEffect, useCallback, useMemo } from 'react';
import { AppIcons } from './Icons';
import { requestExpandedMode } from '@devvit/web/client';

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
  { id: 'twitter', name: 'Twitter', domain: 'x.com' },
  { id: 'pinterest', name: 'Pinterest', domain: 'pinterest.com' },
  { id: 'linkedin', name: 'LinkedIn', domain: 'linkedin.com' },
  { id: 'snapchat', name: 'Snapchat', domain: 'snapchat.com' },
  { id: 'slack', name: 'Slack', domain: 'slack.com' },
  { id: 'telegram', name: 'Telegram', domain: 'telegram.org' },
  { id: 'uber', name: 'Uber', domain: 'uber.com' },
  { id: 'amazon', name: 'Amazon', domain: 'amazon.com' },
];

function App() {
  const [phase, setPhase] = useState<GamePhase>('START');
  const [hardMode, setHardMode] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [targetApps, setTargetApps] = useState<string[]>([]);
  const [foundApps, setFoundApps] = useState<string[]>([]);
  const [timer, setTimer] = useState(0); 
  const [bonusTimer, setBonusTimer] = useState(200); 
  const [roundStats, setRoundStats] = useState<{ round: number; time: number; score: number | string }[]>([]);
  const [wrongTaps, setWrongTaps] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<'CORRECT' | 'WRONG' | null>(null);
  const [shuffledApps, setShuffledApps] = useState<AppInfo[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [status, setStatus] = useState<string>('Ready');
  const [totalTaps, setTotalTaps] = useState(0);
  const [totalTargets, setTotalTargets] = useState(0);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const msg = event.data;
      if (msg.type === 'LEADERBOARD_DATA') {
        setLeaderboard(msg.data || []);
        setUserRank(msg.userRank > 0 ? msg.userRank : null);
        setStatus('Ready');
      } else if (msg.type === 'SYNC_ERROR') {
        setStatus('Sync Error');
      }
    };
    window.addEventListener('message', handleMessage);
    
    // Initial fetch
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 10000); 

    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(interval);
    };
  }, []);

  const fetchLeaderboard = () => {
    setStatus('Syncing...');
    window.parent.postMessage({ type: 'GET_LEADERBOARD' }, '*');
  };

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
    setWrongTaps(0);
    setTotalTargets(prev => prev + targets.length);
    setPhase('PLAYING');
  }, []);

  const startBonusRound = useCallback(() => {
    const count = 5; 
    const shuffled = [...ALL_APPS].sort(() => Math.random() - 0.5);
    const targets = Array.from(new Set(shuffled.slice(0, count).map(a => a.id)));
    
    setTargetApps(targets);
    setFoundApps([]);
    setShuffledApps([...ALL_APPS].sort(() => Math.random() - 0.5));
    setWrongTaps(0);
    setBonusTimer(200); 
    setTotalTargets(prev => prev + targets.length);
  }, []);

  const startGame = (e: React.MouseEvent) => {
    try {
      requestExpandedMode(e.nativeEvent);
    } catch (err) {
      console.warn("Failed to expand:", err);
    }
    
    setScore(0);
    setRound(1);
    setTimer(0);
    setBonusTimer(200);
    setRoundStats([]);
    setTotalTaps(0);
    setTotalTargets(0);
    startNewChallenge();
  };

  useEffect(() => {
    let interval: any;
    if (phase === 'PLAYING') {
      if (round < 4) {
        interval = setInterval(() => {
          setTimer(prev => prev + 1);
        }, 100);
      } else {
        interval = setInterval(() => {
          setBonusTimer(prev => prev - 1);
        }, 100);
      }
    }
    return () => clearInterval(interval);
  }, [phase, round]);

  useEffect(() => {
     if (phase === 'PLAYING' && round === 4 && bonusTimer === 0) {
         setPhase('RESULT');
         setScore(prev => {
             submitScore(prev);
             return prev;
         });
     }
  }, [bonusTimer, phase, round]);

  const submitScore = (finalScore: number) => {
    setStatus('Saving...');
    window.parent.postMessage({ type: 'SUBMIT_SCORE', score: finalScore }, '*');
  };

  const handleAppTap = (appId: string) => {
    if (phase !== 'PLAYING') return;

    if (targetApps.includes(appId) && !foundApps.includes(appId)) {
      const newFound = [...foundApps, appId];
      setFoundApps(newFound);
      setScore(prev => prev + 100);
      setTotalTaps(prev => prev + 1);
      setLastFeedback('CORRECT');
      setTimeout(() => setLastFeedback(null), 800);

      if (newFound.length === targetApps.length) {
        if (round === 4) {
            const timeBonus = bonusTimer * 10;
            const bonusTotal = 1500 + timeBonus;
            setScore(prev => prev + bonusTotal);
            setRoundStats(prev => [...prev, { round: 4, time: (200 - bonusTimer) / 10, score: `BONUS +${bonusTotal}` }]);
            
            setTimeout(() => {
                setPhase('RESULT');
                setScore(current => {
                  submitScore(current);
                  return current;
                });
            }, 1000);
        } else {
            const roundBase = 500;
            const perfectBonus = wrongTaps === 0 ? 300 : 0;
            const roundTotal = Math.floor(roundBase + perfectBonus);
            
            setScore(prev => prev + roundTotal);
            setRoundStats(prev => [...prev, { round, time: timer / 10, score: roundTotal }]);
            
            if (round < 3) {
              setTimeout(() => {
                setRound(prev => prev + 1);
                startNewChallenge();
              }, 1000);
            } else if (round === 3 && timer <= 300) {
              setTimeout(() => {
                setRound(4);
                startBonusRound();
              }, 1000);
            } else {
              setTimeout(() => {
                setPhase('RESULT');
                setScore(current => {
                  submitScore(current);
                  return current;
                });
              }, 1000);
            }
        }
      }
    } else if (!foundApps.includes(appId)) {
      setWrongTaps(prev => prev + 1);
      setScore(prev => Math.max(0, prev - 50));
      setLastFeedback('WRONG');
      setTotalTaps(prev => prev + 1);
      setTimeout(() => setLastFeedback(null), 800);
    }
  };

  const currentTime = useMemo(() => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  }, []);

  const accuracy = Math.floor((totalTargets / (totalTargets + (totalTaps - foundApps.length))) * 100) || 100;
  // Note: totalTaps includes wrong taps and correct taps. 
  // Accuracy = totalTargets / totalTaps
  const realAccuracy = totalTaps > 0 ? Math.floor((totalTargets / totalTaps) * 100) : 100;
  
  // Actually, let's use a simpler one:
  const finalAccuracy = totalTaps > 0 ? Math.floor(((totalTaps - (totalTaps - totalTargets)) / totalTaps) * 100) : 100;
  // Let's just track it simply:
  const displayAccuracy = totalTaps > 0 ? Math.floor((totalTargets / totalTaps) * 100) : 100;

  return (
    <div className={`phone-frame ${hardMode ? 'hard-mode' : ''}`}>
      <div className="phone-wallpaper" />
      
      <div className={`dynamic-island ${lastFeedback ? 'expanded ' + lastFeedback.toLowerCase() : ''}`}>
        {lastFeedback === 'CORRECT' && 'MATCHED +100'}
        {lastFeedback === 'WRONG' && 'MISS -50'}
      </div>

      <div className="status-bar">
        <span>{currentTime}</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {round === 4 ? (
             <span style={{ color: bonusTimer <= 50 ? 'var(--error)' : 'var(--accent)', fontWeight: 'bold' }}>
               {formatTime(bonusTimer)}
             </span>
          ) : (
             <span style={{ color: timer <= 300 ? 'var(--success)' : 'white' }}>
               {formatTime(timer)}
             </span>
          )}
          <div style={{ width: 18, height: 9, border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 1, background: 'var(--success)', width: '70%' }} />
          </div>
        </div>
      </div>

      {phase === 'START' && (
        <div className="screen start-screen">
          <div className="logo-container">
            <h1 className="logo-text">APP HUNT</h1>
            <div className="logo-sub">OS v3.0 // EXPANDED</div>
          </div>
          
          <div style={{ width: '100%' }}>
            <div className="toggle-card">
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>Expert Mode</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Hide app labels for 2x focus</div>
              </div>
              <input 
                type="checkbox" 
                checked={hardMode} 
                onChange={e => setHardMode(e.target.checked)}
                style={{ width: 22, height: 22, accentColor: 'var(--primary)' }}
              />
            </div>

            <button className="btn" onClick={startGame}>
              START MISSION
            </button>
          </div>
        </div>
      )}

      {phase === 'PLAYING' && (
        <>
          <div className={`challenge-banner ${round === 4 ? 'bonus' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="challenge-title">
                 {round === 4 ? '🔥 BONUS WAVE 🔥' : `LEVEL ${round} / 3`}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent)' }}>
                {score}
              </div>
            </div>
            
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
          </div>

          <div className="app-drawer">
            {shuffledApps.map((app) => (
              <div 
                key={app.id} 
                className={`app-icon-container ${lastFeedback === 'WRONG' ? 'wrong-shake' : ''} ${lastFeedback === 'CORRECT' && foundApps.includes(app.id) ? 'correct-pulse' : ''}`}
                onClick={() => handleAppTap(app.id)}
              >
                <div className="app-icon">
                  {AppIcons[app.id]}
                </div>
                {!hardMode && <div className="app-label">{app.name}</div>}
              </div>
            ))}
          </div>
        </>
      )}

      {phase === 'RESULT' && (
        <div className="screen result-screen">
          <div className="result-header">
            <div style={{ fontSize: '12px', color: 'var(--success)', fontWeight: 800, letterSpacing: '3px' }}>MISSION COMPLETE</div>
            <div className="score-display">{score}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                {userRank ? `Ranked Global #${userRank}` : 'Ranked Global #1'}
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Accuracy</div>
              <div className="stat-value">{displayAccuracy}%</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Time</div>
              <div className="stat-value">{formatTime(timer)}</div>
            </div>
          </div>

          <div className="leaderboard-section">
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                 <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-secondary)' }}>GLOBAL RANKINGS</div>
                 <div style={{ fontSize: '10px', color: 'var(--primary)' }}>{status.toUpperCase()}</div>
             </div>
             <div style={{ overflowY: 'auto', paddingRight: '4px' }}>
                 {leaderboard.length > 0 ? leaderboard.slice(0, 6).map((entry, i) => (
                     <div key={i} className={`ranking-item ${i === 0 ? 'top' : ''}`}>
                         <span className="rank-number">{i+1}</span>
                         <span className="rank-name">{entry.member}</span>
                         <span className="rank-score">{entry.score}</span>
                     </div>
                 )) : (
                     <div style={{ textAlign: 'center', opacity: 0.3, marginTop: '40px', fontSize: '12px' }}>Updating live rankings...</div>
                 )}
             </div>
          </div>

          <button className="btn" style={{ marginTop: '20px' }} onClick={startGame}>
            RETRY MISSION
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
