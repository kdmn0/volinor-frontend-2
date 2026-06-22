import { useTranslation } from 'react-i18next';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const toggle = () => {
    const next = current === 'tr' ? 'en' : 'tr';
    localStorage.setItem('volinor_lang', next);
    i18n.changeLanguage(next);
    window.location.reload();
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-1 px-3 py-2 bg-[#07080d]/90 border border-[#00c4e8]/20 rounded-lg backdrop-blur-md shadow-[0_0_20px_rgba(0,196,232,0.08)] hover:border-[#00c4e8]/50 hover:shadow-[0_0_24px_rgba(0,196,232,0.18)] transition-all duration-300 font-mono text-xs tracking-[0.2em] select-none">
      <span className={current === 'tr' ? 'text-[#00c4e8]' : 'text-white/30'}>TR</span>
      <span className="text-white/15 mx-[2px]">|</span>
      <span className={current === 'en' ? 'text-[#00c4e8]' : 'text-white/30'}>EN</span>
    </button>
  );
};
