'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import pricingData from '@/data/pricing.json'
import venuesData from '@/data/venues.json'

interface PricingPlan {
  id: string
  type: string
  price: {
    zh: string
    en: string
  }
  duration: {
    zh: string
    en: string
  }
  features: Array<{
    zh: string
    en: string
  }>
  popular?: boolean
}

interface Course {
  id: string
  type: string
  price: {
    zh: string
    en: string
  }
  duration: {
    zh: string
    en: string
  }
}

interface Rental {
  id: string
  type: string
  price: {
    zh: string
    en: string
  }
  duration: {
    zh: string
    en: string
  }
}

export default function PricingPage() {
  const { t, language } = useLanguage()
  const venues = venuesData.venues
  const [currentVenueIndex, setCurrentVenueIndex] = useState(0)

  const plans = pricingData.plans as PricingPlan[]
  const courses = (pricingData.courses || []) as Course[]
  const rentals = (pricingData.rentals || []) as Rental[]

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Navigation */}
      <Navigation 
        venues={venues}
        currentVenueIndex={currentVenueIndex}
        setCurrentVenueIndex={setCurrentVenueIndex}
      />
      
      {/* Pricing Content */}
      <main className="pt-24 sm:pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('pricing.title')}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('pricing.description')}
            </p>
          </div>

          {/* Membership Plans */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
              {language === 'zh' ? '会员卡' : 'Membership Plans'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-brand-gray-dark rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 p-8 ${
                    plan.popular ? 'ring-4 ring-brand-pink transform scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-brand-pink text-white px-4 py-1 text-sm font-bold rounded-bl-sm rounded-tr-sm">
                      {language === 'zh' ? '最受欢迎' : 'Popular'}
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {t(`pricing.${plan.type}`)}
                    </h3>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-brand-pink">
                        {plan.price[language]}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {plan.duration[language]}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <span className="text-brand-pink text-xl mt-0.5">✓</span>
                        <span>{feature[language]}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              ))}
            </div>
          </div>

          {/* Courses */}
          {courses.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
                {language === 'zh' ? '课程' : 'Courses'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-brand-gray-dark rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 p-6"
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white mb-3">
                        {course.duration[language]}
                      </h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-brand-pink">
                          {course.price[language]}
                        </span>
                      </div>
                   
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rentals */}
          {rentals.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
                {language === 'zh' ? '租赁服务' : 'Rental Services'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {rentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="bg-brand-gray-dark rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 p-6"
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white mb-3">
                        {rental.duration[language]}
                      </h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-brand-pink">
                          {rental.price[language]}
                        </span>
                      </div>
                   
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  )
}

