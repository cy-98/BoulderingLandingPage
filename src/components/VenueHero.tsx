'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface Venue {
  id: string
  name: { zh: string; en: string }
  location: { zh: string; en: string } | null
  address: { zh: string; en: string }
  hours: { zh: string; en: string }
  phone: string
  imagePlaceholder: string
  image: string
  photos?: string[]
  facilities: string[]
}

interface VenueHeroProps {
  venues: Venue[]
  currentVenueIndex: number
  setCurrentVenueIndex: (index: number) => void
}

export default function VenueHero({ venues, currentVenueIndex, setCurrentVenueIndex }: VenueHeroProps) {
  const { language, t } = useLanguage()
  const currentVenue = venues[currentVenueIndex]
  
  // 只显示第一张图片
  const heroImage = currentVenue.photos && currentVenue.photos.length > 0 
    ? currentVenue.photos[0] 
    : currentVenue.image

  return (
    <section className="snap-start bg-brand-black pt-16 sm:pt-20">
      {/* Hero Image - 2/3 of screen height */}
      <div 
        className="relative h-[60vh] sm:h-[65vh] md:h-[70vh] bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%'
        }}
      >
        {/* Dark gradient overlay - lighter for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
        
        {/* Venue Name - Left-Center, Vertically Centered */}
        <div className="absolute left-8 sm:left-16 md:left-24 lg:left-32 top-1/2 -translate-y-1/2 z-20 max-w-2xl">
          {/* Location - Secondary Header (only if location exists) */}
          {currentVenue.location && (
            <p className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-pink uppercase mb-4 tracking-[0.1em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {currentVenue.location[language]}
            </p>
          )}
          
          {/* Venue Name */}
          <h1 className="font-hero text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] font-black text-white uppercase leading-none tracking-[0.05em] drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            {currentVenue.name[language]}
          </h1>
        </div>
      </div>
    </section>
  )
}
