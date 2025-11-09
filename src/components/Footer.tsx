'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'

export default function Footer() {
  const { t } = useLanguage()
  const [showWeChatModal, setShowWeChatModal] = useState(false)

  return (
    <>
      <footer className="bg-brand-black text-white py-12 sm:py-16 border-t border-brand-gray-light/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.followUs')}</h4>
              <div className="flex gap-4">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/heybouldering?igsh=amg0MzJ2c2oydjly&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-sm flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                  aria-label="Instagram"
                >
                  <span className="text-2xl">📷</span>
                </a>

                {/* WeChat */}
                <button
                  onClick={() => setShowWeChatModal(true)}
                  className="w-12 h-12 bg-green-600 rounded-sm flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                  aria-label="WeChat"
                >
                  <span className="text-2xl">💬</span>
                </button>
              </div>
              <p className="text-gray-400 text-xs mt-3">
                {t('footer.wechat')}: HeyBouldering嘿抱
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* WeChat QR Code Modal */}
      {showWeChatModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowWeChatModal(false)}
        >
          <div
            className="bg-brand-gray-dark rounded-sm p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-brand-orange/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {t('footer.wechat')}
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                {t('footer.wechat.scan')}
              </p>

              {/* QR Code Placeholder */}
              <div className="bg-gradient-to-br from-brand-gray-medium to-brand-black aspect-square rounded-sm flex items-center justify-center mb-6 shadow-inner border border-brand-orange/20">
                <span className="text-8xl">📱</span>
              </div>

              <p className="text-sm text-gray-400 mb-4">
                微信号: <span className="font-semibold text-brand-orange">HeyBouldering嘿抱</span>
              </p>

              <button
                onClick={() => setShowWeChatModal(false)}
                className="w-full py-3 bg-brand-orange text-white rounded-sm hover:bg-brand-orange-light transition-colors font-medium"
              >
                {t('footer.wechat.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
