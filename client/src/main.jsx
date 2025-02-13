import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { AuthContextProvider } from './components/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    

      {/* enables the routing in pages */}
      <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
      </BrowserRouter>

    
  </StrictMode>
);