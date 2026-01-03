import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel
mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN || "6701e84717b23e407d58866d53294b6a", {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
    autocapture: true,
    record_sessions_percent: 100,
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
