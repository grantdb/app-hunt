import React from 'react';

export const AppIcons: Record<string, React.ReactNode> = {
  reddit: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#FF4500"/>
      <path d="M17.5 12.5c0-1.1-.9-2-2-2-.6 0-1.1.2-1.5.6-.9-.6-2.1-1-3.4-1.1l.6-2.7 1.9.4c0 .6.4 1 1 1s1-.4 1-1-.4-1-1-1c-.5 0-.9.3-1 .8l-2.1-.5c-.1 0-.2.1-.2.2l-.7 3.1c-1.3.1-2.5.5-3.4 1.1-.4-.4-.9-.6-1.5-.6-1.1 0-2 .9-2 2 0 .8.5 1.4 1.1 1.8-.1.2-.1.4-.1.6 0 1.9 2.2 3.5 5 3.5s5-1.6 5-3.5c0-.2 0-.4-.1-.6.6-.4 1.1-1 1.1-1.8zm-8.8 1.5c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1zm5.1 2.3c-.7.7-1.9.8-1.9.8s-1.2-.1-1.9-.8c-.1-.1-.1-.2 0-.3.1-.1.2-.1.3 0 .5.5 1.5.6 1.6.6s1.1-.1 1.6-.6c.1-.1.2-.1.3 0 .1.1.1.2 0 .3zm.2-1.3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="white"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="url(#ig-grad)"/>
      <rect x="5" y="5" width="14" height="14" rx="4" stroke="white" strokeWidth="2"/>
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2"/>
      <circle cx="17" cy="7" r="1" fill="white"/>
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#405DE6"/><stop offset="0.25" stopColor="#833AB4"/><stop offset="0.5" stopColor="#C13584"/><stop offset="1" stopColor="#F56040"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  spotify: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#1DB954"/>
      <path d="M17.1 16.5c-.2.3-.6.4-.9.2-2.5-1.5-5.6-1.9-9.3-.9-.3.1-.7-.1-.8-.4s.1-.7.4-.8c4.1-1.1 7.5-.7 10.3 1 .4.2.5.6.3.9zm1.3-3.1c-.3.4-.8.5-1.2.2-2.9-1.8-7.3-2.3-10.7-1.3-.5.1-1-.2-1.1-.7s.2-1 .7-1.1c4-1.2 9-0.6 12.3 1.5.4.2.5.9.3 1.4zm.1-3.3c-3.5-2.1-9.2-2.3-12.6-1.2-.5.2-1.1-.1-1.2-.6-.2-.5.1-1.1.6-1.2 3.9-1.2 10.2-1 14.3 1.4.5.3.6.9.3 1.4-.4.5-1 .6-1.4.2z" fill="black"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#FF0000"/>
      <path d="M16 12L10 15.5V8.5L16 12Z" fill="white"/>
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
      <rect width="24" height="24" rx="6" fill="black"/>
      <path d="M8 6v12h2v-8l4 8h2V6h-2v8l-4-8H8z" fill="#E50914"/>
    </svg>
  ),
  chrome: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="white"/>
      <circle cx="12" cy="12" r="5" fill="#4285F4"/>
      <path d="M12 2C9.2 2 6.7 3.1 4.9 5l4.5 7.8" fill="#DB4437"/>
      <path d="M22 12c0 2.8-1.1 5.3-3 7.1l-4.5-7.8h9c.3.2.5.5.5.7z" fill="#0F9D58"/>
      <path d="M12 22a10 10 0 0 1-7.1-3l4.5-7.8h9" fill="#F4B400"/>
    </svg>
  ),
  maps: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#F8F9FA"/>
      <path d="M12 18s-4-4.5-4-7a4 4 0 1 1 8 0c0 2.5-4 7-4 7zm0-4.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" fill="#4B8BF5"/>
      <rect x="5" y="14" width="14" height="2" rx="1" fill="#34A853"/>
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#25D366"/>
      <path d="M12 6c-3.3 0-6 2.7-6 6 0 1 .3 2.1.8 3l-1 3.5 3.6-.9c.8.5 1.8.8 2.6.8 3.3 0 6-2.7 6-6s-2.7-6-6-6zm3.3 8.3c-.2.4-.9.8-1.2.8s-.6-.1-2.1-.7c-1.8-.8-3-2.6-3.1-2.7s-.8-1.1-.8-2 .4-1.4.6-1.6c.1-.2.4-.3.5-.3.2 0 .3 0 .4.1s.4.8.4 1-.2.4-.4.6c-.2.2-.3.3-.1.6.2.4.6.8.9 1 .4.3.7.4.9.2.2-.2.5-.6.6-.7s.3-.1.6 0c.3.1 1.7.8 1.8.9s.1.2.1.4c0 .3-.2.6-.4.7z" fill="white"/>
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
      <rect width="24" height="24" rx="6" fill="#F8F9FA"/>
      <path d="M5 8v8c0 1.1.9 2 2 2h2V10l3 2.5 3-2.5v8h2c1.1 0 2-.9 2-2V8l-7 6-7-6z" fill="#EA4335"/>
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
      <rect width="24" height="24" rx="6" fill="#9DA3A8"/>
      <path d="M12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm5.3 2.3l1-.8a.2.2 0 0 0 0-.3l-1-1.7a.2.2 0 0 0-.3 0l-1.2.5a4 4 0 0 0-.9-.5L14.7 9a.2.2 0 0 0-.2-.2h-2a.2.2 0 0 0-.2.2l-.2 1.3a4 4 0 0 0-.9.5l-1.2-.5a.2.2 0 0 0-.3 0l-1 1.7a.2.2 0 0 0 0 .3l1 .8a4 4 0 0 0 0 1l-1 .8a.2.2 0 0 0 0 .3l1 1.7a.2.2 0 0 0 .3 0l1.2-.5c.3.2.6.4.9.5l.2 1.3c0 .1.1.2.2.2h2c.1 0 .2-.1.2-.2l.2-1.3a4 4 0 0 0 .9-.5l1.2.5.3-.1 1-1.7a.2.2 0 0 0 0-.3l-1-.8a4 4 0 0 0 0-1z" fill="white"/>
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#333333"/>
      <rect x="6" y="8" width="12" height="9" rx="2" fill="white"/>
      <circle cx="12" cy="12.5" r="2.5" fill="#333333"/>
      <path d="M9 8l1-2h4l1 2H9z" fill="white"/>
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
      <circle cx="12" cy="12" r="12" fill="#1877F2"/>
      <path d="M14.5 12h-2v7h-3v-7h-2v-2.5h2v-1.5c0-2 1.2-3.1 3-3.1.9 0 1.6.1 1.6.1v2h-1c-.9 0-1.1.6-1.1 1.2V9.5h2.1l-.3 2.5z" fill="white"/>
    </svg>
  ),
};
