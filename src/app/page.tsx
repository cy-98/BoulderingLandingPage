'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import VenueHero from '@/components/VenueHero'
import PhotoGallery from '@/components/PhotoGallery'
import Footer from '@/components/Footer'
import venuesData from '@/data/venues.json'

export default function Home() {
  const venues = venuesData.venues
  const [currentVenueIndex, setCurrentVenueIndex] = useState(0)

  return (
    <main className="min-h-screen bg-brand-black snap-y snap-proximity overflow-y-auto">
      {/* Navigation */}
      <Navigation 
        venues={venues}
        currentVenueIndex={currentVenueIndex}
        setCurrentVenueIndex={setCurrentVenueIndex}
      />
      
      {/* Venue Hero Section - Full Screen with Switcher */}
      <section id="home">
        <VenueHero 
          venues={venues}
          currentVenueIndex={currentVenueIndex}
          setCurrentVenueIndex={setCurrentVenueIndex}
        />
      </section>

      {/* Photos Section */}
      {/* <section id="photos" className="bg-brand-gray-medium">
        <PhotoGallery 
          venues={venues}
          currentVenueIndex={currentVenueIndex}
        />
      </section> */}

      {/* Footer */}
      <div className="snap-start">
        <Footer />
      </div>
    </main>
  )
}
