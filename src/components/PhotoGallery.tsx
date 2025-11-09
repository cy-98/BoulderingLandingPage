'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useRef, useEffect } from 'react'

interface Venue {
  id: string
  name: { zh: string; en: string }
  image: string
  photos?: string[]
}

interface PhotoGalleryProps {
  venues: Venue[]
  currentVenueIndex: number
}

export default function PhotoGallery({ venues, currentVenueIndex }: PhotoGalleryProps) {
  const { t, language } = useLanguage()
  const currentVenue = venues[currentVenueIndex]
  
  // 根据当前场馆获取对应的照片列表，首页最多显示4张
  const allPhotos = currentVenue.photos && currentVenue.photos.length > 0 
    ? currentVenue.photos 
    : [currentVenue.image] // 如果没有photos数组，使用默认image
  const galleryImages = allPhotos.slice(0, 4) // 限制首页最多显示4张
  
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  
  // 当切换场馆时，重置图片索引
  useEffect(() => {
    setCurrentPhotoIndex(0)
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
      setCurrentPhotoIndex((prev) => (prev + 1) % galleryImages.length)
    }
    
    if (isRightSwipe) {
      // 右滑，上一张
      setCurrentPhotoIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    }
  }

  return (
    <section className="snap-start relative min-h-screen bg-brand-black">
      {/* Full Screen Photo Carousel */}
      <div 
        ref={containerRef}
        className="relative h-screen bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out"
        style={{ backgroundImage: `url(${galleryImages[currentPhotoIndex]})` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/50"></div>
        
        {/* Title - Top Left Corner with Navbar Spacing */}
        <div className="absolute top-24 sm:top-28 left-4 sm:left-6 lg:left-8 z-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mb-2">
            {currentVenue.name[language]}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] max-w-md">
            {t('photos.description')}
          </p>
        </div>

        {/* Image Counter - Top Right Corner */}
        <div className="absolute top-24 sm:top-28 right-4 sm:right-6 lg:right-8 z-20">
          <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-sm">
            <span className="text-brand-orange font-bold text-lg">
              {currentPhotoIndex + 1}
            </span>
            <span className="text-white/70 text-sm"> / {galleryImages.length}</span>
          </div>
        </div>

        {/* Photo Slider Buttons - Bottom Right Corner */}
        <div className="absolute bottom-6 right-4 sm:right-6 lg:right-8 flex gap-2 z-20">
          {galleryImages.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentPhotoIndex(index)}
              className={`transition-all duration-300 cursor-pointer ${
                index === currentPhotoIndex
                  ? 'w-12 h-0.5 bg-brand-orange shadow-md'
                  : 'w-12 h-0.5 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
