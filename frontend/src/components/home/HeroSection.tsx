'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Star } from 'lucide-react'

const QUICK_LOCATIONS = ['Austin, TX', 'Miami, FL', 'New York, NY', 'Denver, CO', 'Seattle, WA']

const SEARCH_TABS = ['For Rent', 'Short Term', 'Student', 'Vacation']

export default function HeroSection() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('For Rent')
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [maxRent, setMaxRent] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (propertyType) params.set('type', propertyType)
    if (bedrooms) params.set('bedrooms', bedrooms)
    if (maxRent) params.set('maxRent', maxRent)
    if (activeTab !== 'For Rent') params.set('rentalType', activeTab.toLowerCase().replace(' ', '-'))
    router.push(`/listings?${params.toString()}`)
  }

  return (
    <section className="bg-gradient-to-br from-navy to-navy-light min-h-[580px] flex items-center py-16 px-4 relative overflow-hidden">
      {/* subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)",backgroundSize:"24px 24px"}} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 text-gold-light px-4 py-1.5 rounded-full text-sm font-medium mb-5">
          <Star size={14} /> America&apos;s #1 Rental Marketplace
        </div>

        {/* Heading */}
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl">
          Find Your <span className="text-gold">Perfect</span> Rental Home
        </h1>
        <p className="text-white/70 text-base mb-10 max-w-lg leading-relaxed">
          Browse thousands of verified listings — apartments, homes, student housing, and vacation rentals across all 50 states.
        </p>

        {/* Search Box */}
        <div className="bg-white rounded-2xl p-5 shadow-card-lg max-w-4xl">
          {/* Tabs */}
          <div className="flex gap-1 mb-5">
            {SEARCH_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-navy text-white' : 'text-gray-500 hover:text-navy'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div className="lg:col-span-2">
              <label className="label">Location</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="City, State or ZIP code"
                  className="input-field pl-9"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>

            <div>
              <label className="label">Property Type</label>
              <select className="input-field" value={propertyType} onChange={e => setPropertyType(e.target.value)}>
                <option value="">Any Type</option>
                <option value="apartment">Apartment</option>
                <option value="family-home">Family Home</option>
                <option value="studio">Studio</option>
                <option value="guest-house">Guest House</option>
                <option value="student">Student Housing</option>
                <option value="vacation">Vacation Rental</option>
              </select>
            </div>

            <div>
              <label className="label">Bedrooms</label>
              <select className="input-field" value={bedrooms} onChange={e => setBedrooms(e.target.value)}>
                <option value="">Any</option>
                <option value="0">Studio</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4">4+ Beds</option>
              </select>
            </div>

            <div>
              <label className="label">Max Rent</label>
              <select className="input-field" value={maxRent} onChange={e => setMaxRent(e.target.value)}>
                <option value="">Any Price</option>
                <option value="500">$500/mo</option>
                <option value="1000">$1,000/mo</option>
                <option value="1500">$1,500/mo</option>
                <option value="2000">$2,000/mo</option>
                <option value="3000">$3,000/mo</option>
                <option value="5000">$5,000+/mo</option>
              </select>
            </div>

            <div className="lg:col-span-5">
              <button onClick={handleSearch} className="btn-primary w-full justify-center py-3">
                <Search size={16} /> Search Properties
              </button>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-stone">
            {QUICK_LOCATIONS.map(loc => (
              <button
                key={loc}
                onClick={() => { setLocation(loc); handleSearch() }}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gold transition-colors"
              >
                <MapPin size={12} /> {loc}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
