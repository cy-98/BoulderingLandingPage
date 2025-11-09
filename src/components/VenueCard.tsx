'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface Venue {
  id: string
  name: { zh: string; en: string }
  address: { zh: string; en: string }
  hours: { zh: string; en: string }
  phone: string
  imagePlaceholder: string
  facilities: string[]
}

interface VenueCardProps {
  venue: Venue
}

export default function VenueCard({ venue }: VenueCardProps) {
  const { language } = useLanguage()

  const facilityIcons: Record<string, string> = {
    restroom: '🚻',
    shower: '🚿',
    training: '🏋️'
  }

  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl sm:text-7xl md:text-8xl group-hover:scale-110 transition-transform duration-300">
          {venue.imagePlaceholder}
        </div>
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-orange-600 text-white text-sm font-semibold rounded-full">
            {venue.name[language]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* Address */}
        <div className="mb-4">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-orange-600 mt-1 flex-shrink-0">📍</span>
            <div>
              <p className="text-xs text-gray-500 mb-1 font-medium">{t('venue.address')}</p>
              <p className="text-sm text-gray-700">{venue.address[language]}</p>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="mb-4">
          <div className="flex items-start gap-2">
            <span className="text-orange-600 mt-1 flex-shrink-0">🕐</span>
            <div>
              <p className="text-xs text-gray-500 mb-1 font-medium">{t('venue.hours')}</p>
              <p className="text-sm text-gray-700">{venue.hours[language]}</p>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <div className="flex items-start gap-2">
            <span className="text-orange-600 mt-1 flex-shrink-0">📞</span>
            <div>
              <p className="text-xs text-gray-500 mb-1 font-medium">{t('venue.phone')}</p>
              <a 
                href={`tel:${venue.phone}`}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium hover:underline"
              >
                {venue.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-3 font-medium">{t('venue.facilities')}</p>
          <div className="flex flex-wrap gap-2">
            {venue.facilities.map((facility) => (
              <span 
                key={facility}
                className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 text-xs rounded-full border border-orange-100"
              >
                {facilityIcons[facility]} {t(`venue.facility.${facility}`)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

