import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css'; // Make sure you have the necessary stylesheets
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Access the Google Client ID from the environment variables
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
