'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface Venue {
  id: string
  name: { zh: string; en: string }
  facilities: string[]
}

interface VenueFacilitiesProps {
  venue: Venue
}

interface FacilityData {
  icon: string
  title: { zh: string; en: string }
  description: { zh: string; en: string }
}

const facilityData: Record<string, FacilityData> = {
  restroom: {
    icon: '🚻',
    title: { zh: '卫生间', en: 'RESTROOM' },
    description: {
      zh: '干净舒适的卫生间设施。',
      en: 'Clean and comfortable restroom facilities.'
    }
  },
  shower: {
    icon: '🚿',
    title: { zh: '淋浴间', en: 'SHOWER' },
    description: {
      zh: '提供淋浴设施，方便您在运动后清洁。',
      en: 'Shower facilities available for post-workout refresh.'
    }
  },
  training: {
    icon: '🏋️',
    title: { zh: '训练区', en: 'TRAINING' },
    description: {
      zh: '专业的训练区域，配备各种健身器材。',
      en: 'Professional training area equipped with various fitness equipment.'
    }
  },
  freeParking: {
    icon: '🅿️',
    title: { zh: '免费停车', en: 'FREE PARKING' },
    description: {
      zh: '提供免费停车位，方便您的出行。',
      en: 'Free parking available for your convenience.'
    }
  },
  sauna: {
    icon: '🧖',
    title: { zh: '桑拿房', en: 'SAUNA' },
    description: {
      zh: '优先恢复身体，在锻炼后的桑拿房中放松身心。',
      en: 'Prioritize your recovery and relax in our saunas after your workout.'
    }
  },
  cafe: {
    icon: '☕',
    title: { zh: '休息区', en: 'CAFE' },
    description: {
      zh: '舒适的休息区，提供饮品和小食，让您在攀岩间隙放松身心。',
      en: 'Comfortable rest area with beverages and snacks to relax between climbs.'
    }
  },
  gearShop: {
    icon: '🛒',
    title: { zh: '装备商店', en: 'GEAR SHOP' },
    description: {
      zh: '我们提供各种攀岩鞋、BP服装、专业攀岩产品以及食品和饮料，为您的训练提供全方位支持。',
      en: 'We stock a wide range of climbing shoes, BP apparel, specialty climbing products, and food & drink to fuel your session.'
    }
  },
  tboard: {
    icon: '🧗',
    title: { zh: 'T板训练区', en: 'Tension Board' },
    description: {
      zh: '支持多角度训练与海量线上课题，适合力量、爆发与技术全面提升',
      en: 'A standardized Tension Board setup with adjustable angles and access to a vast library of global problems—ideal for strength, power, and precision training.'
    }
  },
  sprayWall: {
    icon: '🧗',
    title: { zh: 'Spray Wall', en: 'Spray Wall' },
    description: {
      zh: '高密度可变线路的 Spray Wall，自由设点训练利器，适合力量耐力与动作创造力的系统性强化。',
      en: 'A dense, customizable Spray Wall designed for free-setting sessions—perfect for developing power endurance, movement creativity, and overall climbing technique.'
    }
  }
}

export default function VenueFacilities({ venue }: VenueFacilitiesProps) {
  const { language } = useLanguage()

  // Filter facilities based on venue data
  const venueFacilities = venue.facilities
    .map(facilityKey => facilityData[facilityKey])
    .filter(Boolean)

  // Don't render if no facilities
  if (venueFacilities.length === 0) {
    return null
  }

  return (
    <section className="bg-brand-black py-16 sm:py-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {venueFacilities.map((facility, index) => (
            <div key={index} className="text-center">
              {/* Icon */}
              <div className="text-6xl mb-4">
                {facility.icon}
              </div>
              
              {/* Title */}
              <p className="text-xl font-bold uppercase mb-4 text-white">
                {facility.title[language]}
              </p>
              
              {/* Description */}
              <p className="text-sm text-gray-300 leading-relaxed">
                {facility.description[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

