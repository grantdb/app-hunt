import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

window.onerror = function(msg, url, line, col, error) {
  console.error("WEBVIEW_ERROR:", msg, "at", url, ":", line);
  window.parent.postMessage({ type: 'WEBVIEW_CRASH', msg, line }, '*');
  return false;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
