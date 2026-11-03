import { useLanguage } from '../../context/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher" aria-label="Language switcher">
      <button
        className={language === 'en' ? 'active' : ''}
        onClick={() => setLanguage('en')}
        aria-label="Switch to English"
      >
        English
      </button>
      <span>/</span>
      <button
        className={language === 'ar' ? 'active' : ''}
        onClick={() => setLanguage('ar')}
        aria-label="التبديل إلى العربية"
        lang="ar"
      >
        العربية
      </button>
    </div>
  );
}
