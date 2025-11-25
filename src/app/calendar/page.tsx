'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import eventsData from '@/data/events.json'
import venuesData from '@/data/venues.json'

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

export default function CalendarPage() {
  const { t, language } = useLanguage()
  const venues = venuesData.venues
  const [currentVenueIndex, setCurrentVenueIndex] = useState(0)
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [selectedVenueFilter, setSelectedVenueFilter] = useState<string>('all')

  const events = eventsData.events as CalendarEvent[]

  // 根据场馆索引映射到venue ID
  const venueIds = ['venue1', 'venue2', 'venue3']

  const filteredEvents = events.filter(event => {
    const typeMatch = selectedFilter === 'all' || event.type === selectedFilter
    const venueMatch = selectedVenueFilter === 'all' || event.venue === selectedVenueFilter
    return typeMatch && venueMatch
  })

  const venueNames: Record<string, { zh: string; en: string }> = {
    venue1: { zh: '嘿抱', en: 'Guomao' },
    venue2: { zh: '嘿抱2', en: 'Sanlitun' },
    venue3: { zh: '粉抱', en: 'Wangjing' }
  }

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Navigation */}
      <Navigation 
        venues={venues}
        currentVenueIndex={currentVenueIndex}
        setCurrentVenueIndex={setCurrentVenueIndex}
      />
      
      {/* Calendar Content */}
      <main className="pt-24 sm:pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('calendar.title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              {t('calendar.description')}
            </p>
          </div>

          {/* Events List */}
          <div className="grid gap-6 max-w-5xl mx-auto">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-brand-gray-dark rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 border-l-4 border-brand-pink"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`inline-flex items-center px-4 py-2 rounded-sm text-sm font-semibold ${
                        event.type === 'routeSetting'
                          ? 'bg-brand-pink/20 text-brand-pink border border-brand-pink/30'
                          : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      }`}>
                        {event.type === 'routeSetting' ? '🔧 ' : '🎉 '}
                        {t(`calendar.${event.type}`)}
                      </span>
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-brand-pink/20 text-brand-pink border border-brand-pink/30">
                        📍 {venueNames[event.venue]?.[language] || event.venue}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                      {event.title[language]}
                    </h3>
                    <p className="text-base text-gray-400">
                      🕐 {event.time}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-4xl sm:text-5xl font-bold text-brand-pink">
                      {new Date(event.date).getDate()}
                    </p>
                    <p className="text-base text-gray-400 mt-1">
                      {new Date(event.date).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {filteredEvents.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-xl">
                  {language === 'zh' ? '暂无活动' : 'No events found'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  )
}

