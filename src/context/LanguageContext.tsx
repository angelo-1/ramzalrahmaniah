import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import en from '../locales/en.json';
import ar from '../locales/ar.json';
export type Language = 'en' | 'ar';
type Dictionary = typeof en;
type LanguageContextValue = { language: Language; isArabic: boolean; t: Dictionary; setLanguage: (language: Language) => void };
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => (localStorage.getItem('ramz-language') as Language) || 'en');
  const setLanguage = (value: Language) => { setLanguageState(value); localStorage.setItem('ramz-language', value); };
  useEffect(() => { document.documentElement.lang = language; document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'; }, [language]);
  const value = useMemo(() => ({ language, isArabic: language === 'ar', t: language === 'ar' ? ar : en, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useLanguage() { const context = useContext(LanguageContext); if (!context) throw new Error('useLanguage must be used within LanguageProvider'); return context; }
