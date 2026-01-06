import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MobileApp from './MobileApp.jsx'

// Detect if user is on a mobile device
function isMobileDevice() {
  // Check for touch capability and screen width
  const hasTouchScreen = (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );

  // Check user agent for mobile devices
  const mobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  // Check screen width (typical mobile breakpoint)
  const isNarrowScreen = window.innerWidth <= 768;

  // Consider it mobile if it has touch AND (mobile UA OR narrow screen)
  return hasTouchScreen && (mobileUserAgent || isNarrowScreen);
}

// Choose which app to render based on device type
const AppComponent = isMobileDevice() ? MobileApp : App;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppComponent />
  </StrictMode>,
)
