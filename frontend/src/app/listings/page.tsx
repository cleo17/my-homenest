'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { apiGetListings, ListingFilters } from '@/lib/api'
import type { ListingCard } from '@/types'
import Link from 'next/link'
import { MapPin, Bed, Bath, Maximize, Heart, SlidersHorizontal, Search, Loader2 } from 'lucide-react'

function ListingsContent() {
  const searchParams = useSearchParams()
  const [listings, setListings] = useState<ListingCard[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState<ListingFilters>({
    location: searchParams.get('location') ?? '',
    type: searchParams.get('type') ?? '',
    bedrooms: searchParams.get('bedrooms') ?? '',
    maxRent: searchParams.get('maxRent') ?? '',
    petFriendly: '',
    furnished: '',
    parkingAvailable: '',
  })

  const set =
    (field: keyof ListingFilters) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFilters((prev) => ({ ...prev, [field]: e.target.value }))

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      setLoading(true)
      try {
        const result = await apiGetListings(filters)
        if (!cancelled) {
          setListings(result.data)
          setTotal(result.pagination.total)
        }
      } catch {
        if (!cancelled) setListings([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [filters])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">

        {/* Search bar */}
        <div className="bg-navy py-4 px-4">
          <div className="max-w-7xl mx-auto flex gap-3 items-center flex-wrap">
            <div className="relative flex-1 min-w-48">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="input-field pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/50 w-full"
                placeholder="City, State or ZIP..."
                value={filters.location ?? ''}
                onChange={set('location')}
              />
            </div>

            <select className="input-field bg-white/10 border-white/20 text-white w-40" value={filters.type ?? ''} onChange={set('type')}>
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="family-home">Family Home</option>
              <option value="student">Student</option>
              <option value="guest-house">Guest House</option>
              <option value="vacation">Vacation</option>
              <option value="shared">Shared Room</option>
            </select>

            <select className="input-field bg-white/10 border-white/20 text-white w-36" value={filters.bedrooms ?? ''} onChange={set('bedrooms')}>
              <option value="">Any Beds</option>
              <option value="0">Studio</option>
              <option value="1">1 Bed</option>
              <option value="2">2 Beds</option>
              <option value="3">3 Beds</option>
              <option value="4">4+ Beds</option>
            </select>

            <select className="input-field bg-white/10 border-white/20 text-white w-36" value={filters.maxRent ?? ''} onChange={set('maxRent')}>
              <option value="">Any Price</option>
              <option value="1000">Under $1,000</option>
              <option value="1500">Under $1,500</option>
              <option value="2000">Under $2,000</option>
              <option value="3000">Under $3,000</option>
              <option value="5000">Under $5,000</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-4 py-2.5 rounded-lg hover:bg-white/20 transition-colors"
            >
              <SlidersHorizontal size={15} /> More Filters
            </button>
          </div>

          {showFilters && (
            <div className="max-w-7xl mx-auto mt-3 flex gap-5 flex-wrap">
              {(['petFriendly', 'furnished', 'parkingAvailable'] as const).map((field) => (
                <label key={field} className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters[field] === 'true'}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, [field]: e.target.checked ? 'true' : '' }))
                    }
                  />
                  {field === 'petFriendly' ? 'Pet Friendly' : field === 'furnished' ? 'Furnished' : 'Parking'}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl font-bold text-navy">
              {loading ? 'Searching...' : `${total.toLocaleString()} properties found`}
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-gold" />
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <MapPin size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium text-navy">No listings found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listings/${listing.id}`}
                  className="bg-white rounded-2xl shadow-card hover:-translate-y-1 hover:shadow-card-lg transition-all duration-250 overflow-hidden block"
                >
                  <div className="h-48 bg-gradient-to-br from-navy to-navy-light relative flex items-center justify-center text-5xl">
                    {listing.images[0]
                      ? <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                      : <span>🏠</span>}
                    {listing.featured && (
                      <span className="absolute top-3 left-3 badge badge-featured">Featured</span>
                    )}
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Heart size={15} />
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="font-serif text-2xl font-bold text-navy">
                      ${listing.monthlyRent.toLocaleString()}
                      <span className="font-sans text-xs font-normal text-gray-400"> /mo</span>
                    </div>
                    <div className="font-semibold text-sm text-navy mt-1.5 mb-1 truncate">{listing.title}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={12} /> {listing.city}, {listing.state}
                    </div>
                    <div className="flex gap-4 mt-4 pt-4 border-t border-stone text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Bed size={13} /> {listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} Beds`}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath size={13} /> {listing.bathrooms} Baths
                      </span>
                      {listing.sqft !== null && (
                        <span className="flex items-center gap-1">
                          <Maximize size={13} /> {listing.sqft.toLocaleString()} sqft
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function ListingsPage() {
  return (
    <Suspense>
      <ListingsContent />
    </Suspense>
  )
}
