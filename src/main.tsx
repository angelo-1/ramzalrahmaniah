import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import './styles/global.css';
import './styles/home-alt.css';
import './styles/spacing.css';
import './styles/services-showcase.css';
import './styles/why-showcase.css';
import './styles/about-showcase.css';
import './styles/brand-logo.css';

window.setTimeout(() => {
  document.documentElement.style.setProperty('--hero-image-two', "linear-gradient(140deg,rgba(230,197,76,.2),transparent 35%,rgba(34,47,18,.28)),url('/assets/office-support.png')");
  document.documentElement.style.setProperty('--hero-image-three', "linear-gradient(140deg,rgba(230,197,76,.12),transparent 40%,rgba(34,47,18,.24)),url('/assets/documents-desk.png')");
  document.documentElement.classList.add('hero-images-ready');
}, 900);

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><HashRouter><LanguageProvider><App /></LanguageProvider></HashRouter></React.StrictMode>);
