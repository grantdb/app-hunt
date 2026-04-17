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
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const [shuffledApps, setShuffledApps] = useState<AppInfo[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [status, setStatus] = useState<string>('Ready');

  const fetchLeaderboard = async () => {
    setStatus('Syncing...');
    try {
      const res = await fetch('/api/get-leaderboard');
      if (res.ok) {
         const data = await res.json();
         setLeaderboard(data.data || []);
         setStatus('Ready');
      } else {
         setStatus('Sync Error');
      }
    } catch (e) {
      console.error(e);
      setStatus('Offline');
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 8000); 
    
    return () => {
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
    setWrongTaps(0);
    setPhase('PLAYING');
  }, []);

  const startBonusRound = useCallback(() => {
    const count = 5; // 5 apps for bonus
    const shuffled = [...ALL_APPS].sort(() => Math.random() - 0.5);
    const targets = Array.from(new Set(shuffled.slice(0, count).map(a => a.id)));
    
    setTargetApps(targets);
    setFoundApps([]);
    setShuffledApps([...ALL_APPS].sort(() => Math.random() - 0.5));
    setWrongTaps(0);
    setBonusTimer(200); // 20s
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
         // Use function updater to get latest score
         setScore(prev => {
             submitScore(prev);
             return prev;
         });
     }
  }, [bonusTimer, phase, round]);

  const submitScore = async (finalScore: number) => {
    setStatus('Saving Score...');
    try {
      await fetch('/api/submit-score', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ score: finalScore })
      });
      fetchLeaderboard();
    } catch (e) {
      console.error(e);
      setStatus('Save Failed');
    }
  };

  const handleAppTap = (appId: string) => {
    if (phase !== 'PLAYING') return;

    if (targetApps.includes(appId) && !foundApps.includes(appId)) {
      const newFound = [...foundApps, appId];
      setFoundApps(newFound);
      setScore(prev => prev + 100);
      setLastFeedback('CORRECT');

      if (newFound.length === targetApps.length) {
        if (round === 4) {
            const timeBonus = bonusTimer * 10;
            const bonusTotal = 1500 + timeBonus;
            setScore(prev => prev + bonusTotal);
            setRoundStats(prev => [...prev, { round: 4, time: (200 - bonusTimer) / 10, score: `BONUS +${bonusTotal}` }]);
            
            setTimeout(() => {
                const finalScore = score + 100 + bonusTotal;
                setScore(finalScore);
                setPhase('RESULT');
                submitScore(finalScore);
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
                const finalScore = score + 100 + roundTotal;
                setScore(finalScore);
                setPhase('RESULT');
                submitScore(finalScore);
              }, 1000);
            }
        }
      }
    } else if (!foundApps.includes(appId)) {
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

  const accuracy = Math.floor((3 / (3 + Math.max(0, wrongTaps))) * 100);

  return (
    <div className={`phone-frame ${hardMode ? 'hard-mode' : ''}`}>
      <div className="phone-wallpaper" />
      <div className={`dynamic-island ${lastFeedback ? 'expanded' : ''}`} />

      <div className="status-bar">
        <span>{currentTime}</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {round === 4 ? (
             <span style={{ color: bonusTimer <= 50 ? '#ff3b30' : '#ffcc00', fontWeight: 'bold' }}>
               {formatTime(bonusTimer)}
             </span>
          ) : (
             <span style={{ color: timer <= 300 ? '#34c759' : 'white' }}>
               {formatTime(timer)}
             </span>
          )}
          <span>5G</span>
          <div style={{ width: 20, height: 10, border: '1px solid white', borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 1, background: '#34c759', width: '80%' }} />
          </div>
        </div>
      </div>

      {phase === 'START' && (
        <div className="screen start-screen">
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <h1 style={{ fontSize: '38px', margin: '0 0 10px 0', color: '#ffcc00' }}>APP HUNT</h1>
            <p style={{ opacity: 0.8, fontSize: '14px', marginBottom: '30px' }}>Global Search Challenge</p>
            
            <div className="toggle-group" style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '15px', marginBottom: '30px' }}>
              <span style={{ fontSize: '13px' }}>Hard Mode</span>
              <input 
                type="checkbox" 
                checked={hardMode} 
                onChange={e => setHardMode(e.target.checked)}
                style={{ width: 20, height: 20, cursor: 'pointer' }}
              />
            </div>

            <button className="btn" style={{ padding: '20px 60px', borderRadius: '25px' }} onClick={startGame}>
              PLAY v2.0-ST
            </button>
          </div>
        </div>
      )}

      {phase === 'PLAYING' && (
        <>
          <div className={`challenge-banner ${round === 4 ? 'bonus' : ''}`} style={round === 4 ? { background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)', color: '#1a1a2e', boxShadow: '0 4px 15px rgba(255, 154, 158, 0.4)' } : {}}>
            <div className="challenge-title">
               {round === 4 ? '🔥 BONUS ROUND 🔥' : `Challenge ${round} of 3`}
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>Find 5 in 20s:</div>
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
            <div style={{ alignSelf: 'flex-end', fontSize: '14px', fontWeight: 900, color: round === 4 ? '#1a1a2e' : '#ffcc00' }}>
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
                {!hardMode && <div className="app-label">{app.name}</div>}
              </div>
            ))}
          </div>
        </>
      )}

      {phase === 'RESULT' && (
        <div className="screen result-screen" style={{ padding: '15px' }}>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <div style={{ fontSize: '10px', color: '#4caf50', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '2px' }}>Mission Accomplished</div>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#ffcc00', margin: '5px 0' }}>{score}</div>
          </div>

          <div style={{ padding: '12px', marginBottom: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '6px', opacity: 0.6 }}>
                 <span>Efficiency: {accuracy}%</span>
                 <span>Total Time: {formatTime(timer)}</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
                 {roundStats.map(s => (
                     <div key={s.round} style={{ background: s.round === 4 ? 'rgba(255,154,158,0.2)' : 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '10px', fontSize: '10px', whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.05)', color: s.round === 4 ? '#ff9a9e' : 'white' }}>
                         R{s.round}: {typeof s.score === 'number' ? `+${s.score}` : s.score}
                     </div>
                 ))}
            </div>
          </div>

          <div style={{ flexGrow: 1, width: '100%', overflow: 'hidden' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, marginBottom: '8px' }}>
                 <span style={{ color: '#ffcc00', letterSpacing: '1px' }}>GLOBAL RANKINGS</span>
                 <span style={{ fontSize: '9px', opacity: 0.5 }}>{status}</span>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                 {leaderboard.length > 0 ? leaderboard.slice(0, 5).map((entry, i) => (
                     <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', padding: '8px 12px', background: i === 0 ? 'rgba(255,204,0,0.15)' : 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                         <span style={{ fontWeight: 600 }}>{i+1}. {entry.member}</span>
                         <span style={{ fontWeight: 900, color: i === 0 ? '#ffcc00' : 'white' }}>{entry.score}</span>
                     </div>
                 )) : (
                     <div style={{ textAlign: 'center', opacity: 0.3, marginTop: '20px', fontSize: '11px' }}>Syncing rankings...</div>
                 )}
             </div>
          </div>

          <button className="btn" style={{ marginTop: '15px', width: '100%', borderRadius: '15px', padding: '12px', fontSize: '14px' }} onClick={startGame}>
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
