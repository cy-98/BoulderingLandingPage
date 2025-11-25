'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'
import eventsData from '@/data/events.json'

interface CalendarEvent {
  id: number
  date: string
  type: 'routeSetting' | 'event'
  venue: string
  title: {
    zh: string
    en: string
  }
  time: string
}

export default function Calendar() {
  const { t, language } = useLanguage()
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [selectedVenue, setSelectedVenue] = useState<string>('all')

  const events = eventsData.events as CalendarEvent[]

  const filteredEvents = events.filter(event => {
    const typeMatch = selectedFilter === 'all' || event.type === selectedFilter
    const venueMatch = selectedVenue === 'all' || event.venue === selectedVenue
    return typeMatch && venueMatch
  })

  const venueNames: Record<string, { zh: string; en: string }> = {
    guomao: { zh: '嘿抱', en: 'Guomao' },
    sanlitun: { zh: '嘿抱2', en: 'Sanlitun' },
    wangjing: { zh: '粉抱', en: 'Wangjing' }
  }

  return (
    <section className="snap-start min-h-screen bg-brand-black flex items-start py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('calendar.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            {t('calendar.description')}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          {/* Type Filter */}
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-3 font-medium">{t('calendar.filter.all')}:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-300 ${
                  selectedFilter === 'all'
                    ? 'bg-brand-pink text-white shadow-lg'
                    : 'bg-brand-gray-dark text-gray-400 hover:bg-brand-gray-dark hover:text-brand-pink border-2 border-brand-gray-light/20'
                }`}
              >
                {t('calendar.filter.all')}
              </button>
              <button
                onClick={() => setSelectedFilter('routeSetting')}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-300 ${
                  selectedFilter === 'routeSetting'
                    ? 'bg-brand-pink text-white shadow-lg'
                    : 'bg-brand-gray-dark text-gray-400 hover:bg-brand-gray-dark hover:text-brand-pink border-2 border-brand-gray-light/20'
                }`}
              >
                🔧 {t('calendar.filter.routeSetting')}
              </button>
              <button
                onClick={() => setSelectedFilter('event')}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-300 ${
                  selectedFilter === 'event'
                    ? 'bg-brand-pink text-white shadow-lg'
                    : 'bg-brand-gray-dark text-gray-400 hover:bg-brand-gray-dark hover:text-brand-pink border-2 border-brand-gray-light/20'
                }`}
              >
                🎉 {t('calendar.filter.events')}
              </button>
            </div>
          </div>

          {/* Venue Filter */}
          <div>
            <p className="text-sm text-gray-400 mb-3 font-medium">{t('venues.title')}:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedVenue('all')}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-300 ${
                  selectedVenue === 'all'
                    ? 'bg-brand-pink text-white shadow-lg'
                    : 'bg-brand-gray-dark text-gray-400 hover:bg-brand-gray-dark hover:text-brand-pink border-2 border-brand-gray-light/20'
                }`}
              >
                {t('venues.filter.all')}
              </button>
              <button
                onClick={() => setSelectedVenue('guomao')}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-300 ${
                  selectedVenue === 'guomao'
                    ? 'bg-brand-pink text-white shadow-lg'
                    : 'bg-brand-gray-dark text-gray-400 hover:bg-brand-gray-dark hover:text-brand-pink border-2 border-brand-gray-light/20'
                }`}
              >
                {language === 'zh' ? '嘿抱' : 'Guomao'}
              </button>
              <button
                onClick={() => setSelectedVenue('sanlitun')}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-300 ${
                  selectedVenue === 'sanlitun'
                    ? 'bg-brand-pink text-white shadow-lg'
                    : 'bg-brand-gray-dark text-gray-400 hover:bg-brand-gray-dark hover:text-brand-pink border-2 border-brand-gray-light/20'
                }`}
              >
                {language === 'zh' ? '嘿抱2' : 'Sanlitun'}
              </button>
              <button
                onClick={() => setSelectedVenue('wangjing')}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-300 ${
                  selectedVenue === 'wangjing'
                    ? 'bg-brand-pink text-white shadow-lg'
                    : 'bg-brand-gray-dark text-gray-400 hover:bg-brand-gray-dark hover:text-brand-pink border-2 border-brand-gray-light/20'
                }`}
              >
                {language === 'zh' ? '粉抱' : 'Wangjing'}
              </button>
            </div>
          </div>
        </div>

        {/* Events List - Scrollable */}
        <div className="grid gap-4 sm:gap-6 max-w-4xl mx-auto max-h-[calc(100vh-28rem)] overflow-y-auto pr-2 custom-scrollbar">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-brand-gray-dark rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 p-5 sm:p-6 border-l-4 border-brand-pink"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-semibold ${
                      event.type === 'routeSetting'
                        ? 'bg-brand-pink/20 text-brand-pink border border-brand-pink/30'
                        : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    }`}>
                      {event.type === 'routeSetting' ? '🔧 ' : '🎉 '}
                      {t(`calendar.${event.type}`)}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-pink/20 text-brand-pink border border-brand-pink/30">
                      📍 {venueNames[event.venue]?.[language] || event.venue}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                    {event.title[language]}
                  </h3>
                  <p className="text-sm text-gray-400">
                    🕐 {event.time}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-2xl sm:text-3xl font-bold text-brand-pink">
                    {new Date(event.date).getDate()}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(event.date).toLocaleDateString('zh-CN', { month: 'short' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                {language === 'zh' ? '暂无活动' : 'No events found'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
