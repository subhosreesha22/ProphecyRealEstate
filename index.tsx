import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Application Failed to Start:", error);
  // Fallback UI if React fails completely
  rootElement.innerHTML = `
    <div style="font-family: sans-serif; color: #ef4444; padding: 2rem; text-align: center;">
      <h1>Application Error</h1>
      <p>Failed to initialize the application.</p>
      <pre style="background: #fee2e2; padding: 1rem; border-radius: 0.5rem; text-align: left; overflow: auto;">${error}</pre>
    </div>
  `;
}