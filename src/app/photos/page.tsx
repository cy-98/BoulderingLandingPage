'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import venuesData from '@/data/venues.json'

export default function PhotosPage() {
  const { t, language } = useLanguage()
  const venues = venuesData.venues
  const [currentVenueIndex, setCurrentVenueIndex] = useState(0)
  
  // 收集所有场馆的所有照片
  const allPhotoImages = venues.flatMap((venue) => {
    if (venue.photos && venue.photos.length > 0) {
      return venue.photos
    }
    return [venue.image]
  })
  
  // 照片页面显示所有照片
  const photoImages = allPhotoImages
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
  const [isThumbnailBarVisible, setIsThumbnailBarVisible] = useState(true)
  const photoRefs = useRef<(HTMLDivElement | null)[]>([])
  const thumbnailBarRef = useRef<HTMLDivElement>(null)
  
  // 当切换场馆时，重置选中状态并滚动到顶部
  useEffect(() => {
    setSelectedPhotoIndex(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentVenueIndex])

  useEffect(() => {
    const handleScroll = () => {
      // 当滚动到底部附近时，隐藏缩略图栏
      const scrollBottom = window.innerHeight + window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      setIsThumbnailBarVisible(scrollBottom < documentHeight - 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToPhoto = (index: number) => {
    const photoElement = photoRefs.current[index]
    if (photoElement) {
      const offset = 100 // 导航栏高度
      const elementPosition = photoElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setSelectedPhotoIndex(index)
      
      // 重置选中状态
      setTimeout(() => setSelectedPhotoIndex(null), 1000)
    }
  }

  return (
    <>
      <Navigation 
        venues={venues}
        currentVenueIndex={currentVenueIndex}
        setCurrentVenueIndex={setCurrentVenueIndex}
      />
      
      <main className="bg-brand-black min-h-screen pt-20 sm:pt-24 pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Venue Title */}
          <div className="mb-8">
            <p className="text-gray-400 text-sm sm:text-base">
              {t('photos.title')}
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {photoImages.map((image, index) => (
              <div
                key={index}
                ref={(el) => { photoRefs.current[index] = el }}
                className="group relative aspect-square overflow-hidden rounded-sm bg-brand-gray-dark cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => scrollToPhoto(index)}
              >
                <img
                  src={image}
                  alt={`${t('photos.title')} ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {index + 1}
                  </span>
                </div>
                {/* Selected indicator */}
                {selectedPhotoIndex === index && (
                  <div className="absolute inset-0 border-4 border-brand-pink animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Floating Thumbnail Bar */}
      <div
        ref={thumbnailBarRef}
        className={`fixed bottom-0 left-0 right-0 z-40 bg-brand-gray-dark/95 backdrop-blur-sm border-t border-brand-gray-light/20 transition-transform duration-300 ${
          isThumbnailBarVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-2">
            {photoImages.map((image, index) => (
              <button
                key={index}
                onClick={() => scrollToPhoto(index)}
                className={`flex-shrink-0 relative group transition-all duration-300 ${
                  selectedPhotoIndex === index
                    ? 'ring-2 ring-brand-pink scale-110'
                    : 'hover:scale-105'
                }`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-sm overflow-hidden bg-brand-gray-medium">
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}

