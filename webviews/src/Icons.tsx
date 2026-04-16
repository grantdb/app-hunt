import React from 'react';

export const AppIcons: Record<string, React.ReactNode> = {
  reddit: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="reddit-grad" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#FF5700" />
          <stop offset="100%" stopColor="#FF4500" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#reddit-grad)"/>
      <path d="M17.5 12.5c0-1.1-.9-2-2-2-.6 0-1.1.2-1.5.6-.9-.6-2.1-1-3.4-1.1l.6-2.7 1.9.4c0 .6.4 1 1 1s1-.4 1-1-.4-1-1-1c-.5 0-.9.3-1 .8l-2.1-.5c-.1 0-.2.1-.2.2l-.7 3.1c-1.3.1-2.5.5-3.4 1.1-.4-.4-.9-.6-1.5-.6-1.1 0-2 .9-2 2 0 .8.5 1.4 1.1 1.8-.1.2-.1.4-.1.6 0 1.9 2.2 3.5 5 3.5s5-1.6 5-3.5c0-.2 0-.4-.1-.6.6-.4 1.1-1 1.1-1.8zm-8.8 1.5c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1zm5.1 2.3c-.7.7-1.9.8-1.9.8s-1.2-.1-1.9-.8c-.1-.1-.1-.2 0-.3.1-.1.2-.1.3 0 .5.5 1.5.6 1.6.6s1.1-.1 1.6-.6c.1-.1.2-.1.3 0 .1.1.1.2 0 .3zm.2-1.3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="white"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0">
          <stop offset="0%" stopColor="#f09433"/><stop offset="25%" stopColor="#e6683c"/><stop offset="50%" stopColor="#dc2743"/><stop offset="75%" stopColor="#cc2366"/><stop offset="100%" stopColor="#bc1888"/>
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad)"/>
      <rect x="5" y="5" width="14" height="14" rx="4" stroke="white" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5"/>
      <circle cx="17.2" cy="6.8" r="0.8" fill="white"/>
    </svg>
  ),
  spotify: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#1db954"/>
      <path d="M17.1 16.5c-.2.3-.6.4-.9.2-2.5-1.5-5.6-1.9-9.3-.9-.3.1-.7-.1-.8-.4s.1-.7.4-.8c4.1-1.1 7.5-.7 10.3 1 .4.2.5.6.3.9zm1.3-3.1c-.3.4-.8.5-1.2.2-2.9-1.8-7.3-2.3-10.7-1.3-.5.1-1-.2-1.1-.7s.2-1 .7-1.1c4-1.2 9-0.6 12.3 1.5.4.2.5.9.3 1.4zm.1-3.3c-3.5-2.1-9.2-2.3-12.6-1.2-.5.2-1.1-.1-1.2-.6-.2-.5.1-1.1.6-1.2 3.9-1.2 10.2-1 14.3 1.4.5.3.6.9.3 1.4-.4.5-1 .6-1.4.2z" fill="white"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="white"/>
      <path d="M21.6 7.2c-.2-.9-1-1.6-1.9-1.8-1.7-.5-8.5-.5-8.5-.5s-6.8 0-8.5.5c-.9.2-1.6 1-1.8 1.8-.5 1.7-.5 5.3-.5 5.3s0 3.6.5 5.3c.2.9 1 1.6 1.9 1.8 1.7.5 8.5.5 8.5.5s6.8 0 8.5-.5c.9-.2 1.6-1 1.8-1.8.5-1.7.5-5.3.5-5.3s0-3.6-.5-5.3z" fill="#FF0000"/>
      <path d="M9.6 15.6l5.6-3.2-5.6-3.2v6.4z" fill="white"/>
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="black"/>
      <path d="M17 9.5c-1.5 0-2.5-1-2.5-1.5V6h-2v9.5c0 1.5-1 2.5-2.5 2.5s-2.5-1-2.5-2.5c0-1.5 1.5-2.5 2.5-2.5.5 0 1 .1 1.5.3V11c-.5-.1-1-.2-1.5-.2-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5c2.4 0 4.3-1.8 4.5-4h.2c1.3 0 2.3-1 2.3-2.3V9.5h-1.5c.2.6.2.6.5.6V9.5z" fill="#25F4EE"/>
      <path d="M17 9.5c-1.5 0-2.5-1-2.5-1.5V6h-2v9.5c0 1.5-1 2.5-2.5 2.5s-2.5-1-2.5-2.5c0-1.5 1.5-2.5 2.5-2.5.5 0 1 .1 1.5.3V11c-.5-.1-1-.2-1.5-.2-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5c2.4 0 4.3-1.8 4.5-4h.2c1.3 0 2.3-1 2.3-2.3V9.5h-1.5c.2.6.2.6.5.6V9.5z" fill="#FE2C55" style={{ mixBlendMode: 'screen' }}/>
    </svg>
  ),
  netflix: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="nf-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E50914" />
          <stop offset="100%" stopColor="#B20710" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="black"/>
      <path d="M7 5v14h2.5v-8.5l5 8.5H17V5h-2.5v8.5l-5-8.5H7z" fill="url(#nf-grad)"/>
    </svg>
  ),
  chrome: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="white"/>
      <circle cx="12" cy="12" r="10.5" fill="white" stroke="#eee" strokeWidth="0.5"/>
      <path d="M12 6.3a5.7 5.7 0 0 0-4.9 2.8l2.9 5 4.4-7.5c-.8-.2-1.6-.3-2.4-.3z" fill="#ea4335"/>
      <path d="M16.9 9.1l-2.9 5 4.4 7.6c1.8-1.4 3.1-3.5 3.5-5.9a10.5 10.5 0 0 0-5-6.7z" fill="#34a853"/>
      <path d="M12 17.7c-2.4 0-4.5-1.2-5.7-3l2.8-5h-5.6a10.5 10.5 0 0 0 8.5 8z" fill="#fbbc05"/>
      <circle cx="12" cy="12" r="4.3" fill="#4285f4"/>
    </svg>
  ),
  maps: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="white"/>
      <path d="M12 3a7 7 0 0 0-7 7c0 5 7 11 7 11s7-6 7-11a7 7 0 0 0-7-7z" fill="#4285f4"/>
      <path d="M11 11h2v-2h-2v2zm0-4h2v-2h-2v2zm0 8h2v-2h-2v2z" fill="white"/>
      <path d="M4.5 14h15v3a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2v-3z" fill="#34a853"/>
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#25D366"/>
      <path d="M12 5a7 7 0 0 0-6.1 10.4L5 19l3.7-.9a7 7 0 1 0 3.3-13.1zM15.5 14c-.2.4-1.1.8-1.5.8s-1-.2-2.3-1c-2-.8-3-2.6-3.1-2.7s-.8-1.1-.8-2c0-.9.5-1.4.7-1.6.2-.2.4-.3.6-.3s.4 0 .5.1.4.8.4 1-.2.4-.4.6-.3.3-.1.6c.2.4.6.8.9 1 .4.3.7.4.9.2.2-.2.5-.6.6-.7s.3-.1.6 0 1.7.8 1.8.9.1.2.1.4c0 .3-.2.6-.4.7z" fill="white"/>
    </svg>
  ),
  discord: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#5865F2"/>
      <path d="M17.5 7c-1.2-.6-2.5-.9-3.9-.9-.2.3-.4.7-.6 1.1-1.5-.2-3-.2-4.5 0-.2-.4-.4-.8-.6-1.1-1.3 0-2.6.3-3.9.9C1.8 10.1 1 13.5 1.3 16.9c1.4.9 2.9 1.5 4.3 1.9.3-.4.6-.9.8-1.4-.5-.2-1-.4-1.4-.7.1-.1.2-.2.3-.3 2.8 1.3 5.9 1.3 8.7 0 .1.1.2.2.3.3-.4.3-.9.5-1.4.7.2.5.5 1 .8 1.4 1.4-.4 2.8-1 4.3-1.9.4-3.4-.4-6.8-1.2-9.9zm-8 7.3c-.8 0-1.5-.7-1.5-1.6s.7-1.6 1.5-1.6 1.5.7 1.5 1.6-.7 1.6-1.5 1.6zm5.3 0c-.8 0-1.5-.7-1.5-1.6s.7-1.6 1.5-1.6 1.5.7 1.5 1.6-.7 1.6-1.5 1.6z" fill="white"/>
    </svg>
  ),
  gmail: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="white"/>
      <path d="M5 7v10c0 1.1.9 2 2 2h1.5v-8.5L12 13l3.5-2.5V19H17c1.1 0 2-.9 2-2V7l-7 5-7-5z" fill="#ea4335"/>
    </svg>
  ),
  photos: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="white"/>
      <path d="M12 12c0-2.2 1.8-4 4-4v4h-4z" fill="#EA4335"/>
      <path d="M12 12c2.2 0 4 1.8 4 4h-4v-4z" fill="#FBBC05"/>
      <path d="M12 12c0 2.2-1.8 4-4 4v-4h4z" fill="#34A853"/>
      <path d="M12 12c-2.2 0-4-1.8-4-4h4v4z" fill="#4285F4"/>
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="set-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9DA3A8" />
          <stop offset="100%" stopColor="#7B8186" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#set-grad)"/>
      <path d="M12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm5.3 2.3l1-.8a.2.2 0 0 0 0-.3l-1-1.7a.2.2 0 0 0-.3 0l-1.2.5a4 4 0 0 0-.9-.5L14.7 9a.2.2 0 0 0-.2-.2h-2a.2.2 0 0 0-.2.2l-.2 1.3a4 4 0 0 0-.9.5l-1.2-.5a.2.2 0 0 0-.3 0l-1 1.7a.2.2 0 0 0 0 .3l1 .8a4 4 0 0 0 0 1l-1 .8a.2.2 0 0 0 0 .3l1 1.7a.2.2 0 0 0 .3 0l1.2-.5c.3.2.6.4.9.5l.2 1.3c0 .1.1.2.2.2h2c.1 0 .2-.1.2-.2l.2-1.3a4 4 0 0 0 .9-.5l1.2.5.3-.1 1-1.7a.2.2 0 0 0 0-.3l-1-.8a4 4 0 0 0 0-1z" fill="white"/>
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#333333"/>
      <circle cx="12" cy="12.5" r="5" fill="#555" stroke="white" strokeWidth="0.5"/>
      <circle cx="12" cy="12.5" r="3" fill="#000"/>
      <circle cx="13.5" cy="11" r="0.8" fill="rgba(255,255,255,0.3)"/>
      <rect x="17" y="7" width="2" height="1" fill="#FFD700" rx="0.3"/>
    </svg>
  ),
  twitch: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#9146FF"/>
      <path d="M6 5l-1 3v12h4v3l3-3h3l4-4V5H6zm11 10l-2 2h-3l-2 2v-2H7V7h10v8z" fill="white"/>
      <rect x="13" y="9" width="2" height="4" fill="white"/>
      <rect x="9" y="9" width="2" height="4" fill="white"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="#1877F2"/>
      <path d="M14.5 12h-2v7h-3v-7h-2v-2.5h2v-1.5c0-2 1.2-3.1 3-3.1.9 0 1.6.1 1.6.1v2h-1c-.9 0-1.1.6-1.1 1.2V9.5h2.1l-.3 2.5z" fill="white"/>
    </svg>
  ),
};
