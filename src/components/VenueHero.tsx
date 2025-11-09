'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useRef, useEffect } from 'react'

interface Venue {
  id: string
  name: { zh: string; en: string }
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
  
  // 根据当前场馆获取对应的照片列表，首页最多显示4张
  const allPhotos = currentVenue.photos && currentVenue.photos.length > 0 
    ? currentVenue.photos 
    : [currentVenue.image] // 如果没有photos数组，使用默认image
  const heroImages = allPhotos.slice(0, 4) // 限制首页最多显示4张
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // 当切换场馆时，重置图片索引
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [currentVenueIndex])
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 最小滑动距离（px）
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      // 左滑，下一张
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }
    
    if (isRightSwipe) {
      // 右滑，上一张
      setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
    }
  }

  const facilityIcons: Record<string, string> = {
    restroom: '🚻',
    shower: '🚿',
    training: '🏋️'
  }

  return (
    <section className="snap-start min-h-screen bg-brand-black pt-16 sm:pt-20">
      {/* Full Screen Image Card with Swipe Support */}
      <div 
        ref={containerRef}
        className="relative h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out"
        style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Dark gradient overlay - stronger at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70"></div>
        
        {/* Venue Information - Bottom Left Corner - Compact */}
        <div className="absolute bottom-4 left-4 z-20 max-w-xs">
          <div className="space-y-1.5">
            {/* Venue Name */}
            <h2 className="text-xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] mb-2">
              {currentVenue.name[language]}
            </h2>
            
            {/* Address */}
            <div>
              <h3 className="pb-px text-xs font-bold text-brand-orange uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{t('venue.address')}</h3>
              <p className="text-xs text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {currentVenue.address[language]}
              </p>
            </div>

            {/* Hours */}
            <div>
              <h3 className="pb-px text-xs font-bold text-brand-orange uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{t('venue.hours')}</h3>
              <p className="text-xs text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {currentVenue.hours[language]}
              </p>
            </div>

            {/* Phone */}
            <div>
              <h3 className="pb-px text-xs font-bold text-brand-orange uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{t('venue.phone')}</h3>
              <a 
                href={`tel:${currentVenue.phone}`}
                className="text-xs text-brand-orange hover:text-brand-orange-light font-bold hover:underline transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                {currentVenue.phone}
              </a>
            </div>

            {/* Facilities */}
            <div style={{ display: currentVenue.facilities.length > 0 ? 'block' : 'none' }}>
              <h3 className="pb-px text-xs font-bold text-brand-orange uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{t('venue.facilities')}</h3>
              <div className="flex flex-wrap gap-1">
                {currentVenue.facilities.map((facility) => (
                  <span 
                    key={facility}
                    className="inline-block px-2 py-0.5 bg-brand-orange/80 text-white text-xs font-medium rounded-sm"
                  >
                    {t(`venue.facility.${facility}`)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Image Slider Buttons - Bottom Right Corner */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`transition-all duration-300 cursor-pointer ${
                index === currentImageIndex
                  ? 'w-10 h-0.5 bg-brand-orange shadow-md'
                  : 'w-10 h-0.5 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
