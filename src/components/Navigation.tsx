'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import LanguageToggle from './LanguageToggle'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

interface Venue {
  id: string
  name: { zh: string; en: string }
  imagePlaceholder: string
}

interface NavigationProps {
  venues: Venue[]
  currentVenueIndex: number
  setCurrentVenueIndex: (index: number) => void
}

export default function Navigation({ venues, currentVenueIndex, setCurrentVenueIndex }: NavigationProps) {
  const { t, language } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-gray-dark shadow-lg shadow-black/50' : 'bg-brand-gray-dark/95 backdrop-blur-sm'
        }`}
    >
      <div className="container mx-auto px-2 sm:px-3 lg:px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Logo + Venue Selector + Navigation Links */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            {/* Logo */}
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </Link>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-600"></div>

            {venues.map((venue, index) => (
              <button
                key={venue.id}
                onClick={() => {
                  setCurrentVenueIndex(index)
                  if (isHomePage) {
                    scrollToSection('home')
                  } else {
                    window.location.href = '/#home'
                  }
                }}
                className="relative py-2 font-medium transition-all duration-300 group"
              >
                <span className={`text-sm sm:text-base transition-colors ${index === currentVenueIndex
                  ? 'text-brand-orange'
                  : 'text-gray-400 group-hover:text-brand-orange'
                  }`}>
                  {venue.name[language]}
                </span>
                {/* Animated underline */}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-orange transition-all duration-300 ${index === currentVenueIndex
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
                  }`}></span>
              </button>
            ))}

            {/* Divider */}
            <div className="h-6 w-px bg-gray-600"></div>

            {/* Photos Link */}
            <Link
              href="/photos"
              className="relative py-2 font-medium transition-all duration-300 group"
            >
              <span className={`text-sm sm:text-base transition-colors ${
                pathname === '/photos'
                  ? 'text-brand-orange'
                  : 'text-gray-400 group-hover:text-brand-orange'
              }`}>
                {t('nav.photos')}
              </span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-orange transition-all duration-300 ${
                pathname === '/photos'
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>

            {/* Pricing Link */}
            <Link
              href="/pricing"
              className="relative py-2 font-medium transition-all duration-300 group"
            >
              <span className={`text-sm sm:text-base transition-colors ${
                pathname === '/pricing'
                  ? 'text-brand-orange'
                  : 'text-gray-400 group-hover:text-brand-orange'
              }`}>
                {t('nav.pricing')}
              </span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-orange transition-all duration-300 ${
                pathname === '/pricing'
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          </div>

          {/* Right: Language Toggle & Menu Button */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <LanguageToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-brand-orange transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="py-4 border-t border-brand-gray-light/20 bg-brand-gray-dark">
            <div className="flex flex-col space-y-3">
              {/* Activity Calendar Link */}
              <Link
                href="/calendar"
                className={`text-left px-4 py-2 hover:text-brand-orange hover:bg-brand-gray-medium transition-all font-medium rounded-sm ${pathname === '/calendar' ? 'text-brand-orange bg-brand-gray-medium' : 'text-gray-300'
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.calendar')}
              </Link>

              <div className="px-4 pt-2">
                <LanguageToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
