'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
      className="px-4 py-2 rounded-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium"
      aria-label="Switch Language"
    >
      <span className="text-lg">{language === 'zh' ? '🇨🇳' : '🇺🇸'}</span>
      <span className="text-white">{language === 'zh' ? '中文' : 'EN'}</span>
    </button>
  )
}

