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

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><HashRouter><LanguageProvider><App /></LanguageProvider></HashRouter></React.StrictMode>);
