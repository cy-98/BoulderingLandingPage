'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'

interface Venue {
  id: string
  name: { zh: string; en: string }
  location: { zh: string; en: string } | null
  address: { zh: string; en: string }
  mapLink?: string
  hours: { zh: string; en: string }
  phone: string
  mapImage?: string
}

interface VenueInfoProps {
  venue: Venue
}

export default function VenueInfo({ venue }: VenueInfoProps) {
  const { language, t } = useLanguage()

  return (
    <section className="bg-brand-black py-16 sm:py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Map */}
          <div className="w-full">
            {venue.mapImage ? (
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={venue.mapImage}
                  alt={`${venue.name[language]} Map`}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-[4/3] bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-lg">Map</span>
              </div>
            )}
          </div>

          {/* Right: Venue Information */}
          <div className="w-full">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black uppercase mb-8 text-brand-pink tracking-[0.05em]">
              {language === 'zh' ? '找到我们' : 'READY TO VISIT?'}
            </h2>

            {/* Address */}
            <div className="mb-8">
              <p className="text-lg text-gray-300">
                <span className="font-bold">{language === 'zh' ? '地址：' : 'Address: '}</span>
                {venue.mapLink ? (
                  <a
                    href={venue.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-pink transition-colors underline"
                  >
                    {venue.address[language]}
                  </a>
                ) : (
                  venue.address[language]
                )}
              </p>
            </div>

            {/* Hours */}
            <div className="mb-8">
              <p className="text-lg text-gray-300">
                <span className="font-bold">{language === 'zh' ? '营业时间：' : 'Hours: '}</span>
                {venue.hours[language]}
              </p>
            </div>

            {/* Contact Us Link */}
            <div>
              <a
                href={`tel:${venue.phone}`}
                className="inline-block text-lg font-bold text-white underline hover:text-brand-pink transition-colors"
              >
                {language === 'zh' ? '联系我们' : 'Contact Us'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

