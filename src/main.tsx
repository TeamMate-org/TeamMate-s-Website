import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Contactos from './Contactos';
import Auditoria from './Auditoria';
import Astrotek from './Astrotek';
import DonaBarba from './DonaBarba';
import Portfolio from './Portfolio';
import Sobre from './Sobre';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './index.css';

const path = window.location.pathname;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {path === '/contactos' ? <Contactos /> : path === '/auditoria' ? <Auditoria /> : path === '/astrotek' ? <Astrotek /> : path === '/donabarba' ? <DonaBarba /> : path === '/portfolio' ? <Portfolio /> : path === '/sobre' ? <Sobre /> : <App />}
    <Analytics />
    <SpeedInsights />
  </StrictMode>,
);
