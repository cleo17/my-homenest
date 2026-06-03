import Link from 'next/link'
import { MapPin, Bed, Bath, Maximize, Heart, ArrowRight } from 'lucide-react'

const LISTINGS = [
  { id: 1, title: 'Luxury Downtown Apartment', price: 2850, location: 'Austin, TX 78701', type: 'Apartment', beds: 2, baths: 2, sqft: 1200, badge: 'featured', emoji: '🏙️', color: 'from-[#2C5364] to-[#203A43]' },
  { id: 2, title: 'Spacious Family Home with Garden', price: 3400, location: 'Denver, CO 80202', type: 'Family Home', beds: 4, baths: 3, sqft: 2400, badge: 'new', emoji: '🏡', color: 'from-[#1A3C34] to-[#2E7D52]' },
  { id: 3, title: 'Modern Ocean-View Condo', price: 4200, location: 'Miami, FL 33101', type: 'Apartment', beds: 3, baths: 2, sqft: 1800, badge: 'hot', emoji: '🏖️', color: 'from-[#1B2A4A] to-[#2D5BE3]' },
  { id: 4, title: 'Cozy Student Studio near UT', price: 950, location: 'Austin, TX 78712', type: 'Student Housing', beds: 0, baths: 1, sqft: 480, badge: 'featured', emoji: '🎓', color: 'from-[#4A1942] to-[#C06C84]' },
  { id: 5, title: 'Rustic Mountain Retreat Cabin', price: 2100, location: 'Aspen, CO 81611', type: 'Vacation Rental', beds: 3, baths: 2, sqft: 1600, badge: 'new', emoji: '🏔️', color: 'from-[#3D2B1F] to-[#8B5E3C]' },
  { id: 6, title: 'Charming Urban Guest House', price: 1500, location: 'Portland, OR 97201', type: 'Guest House', beds: 1, baths: 1, sqft: 650, badge: 'hot', emoji: '🏠', color: 'from-[#2D1B69] to-[#7B2FBE]' },
]

const badgeClass: Record<string, string> = {
  featured: 'badge-featured',
  new: 'badge-new',
  hot: 'badge-hot',
}

export default function FeaturedListings() {
  return (
    <section className="py-16 px-4 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-navy">Featured Listings</h2>
            <p className="text-gray-500 mt-1 text-sm">Hand-picked premium properties across the country</p>
          </div>
          <Link href="/listings" className="flex items-center gap-1 text-gold text-sm font-semibold hover:underline">
            View all <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LISTINGS.map(listing => (
            <Link key={listing.id} href={`/listings/${listing.id}`} className="card hover:-translate-y-1 hover:shadow-card-lg transition-all duration-250 group overflow-hidden block">
              {/* Image */}
              <div className={`h-48 bg-gradient-to-br ${listing.color} relative flex items-center justify-center text-5xl`}>
                {listing.emoji}
                <span className={`absolute top-3 left-3 badge ${badgeClass[listing.badge]}`}>
                  {listing.badge.charAt(0).toUpperCase() + listing.badge.slice(1)}
                </span>
                <button
                  onClick={e => e.preventDefault()}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart size={15} />
                </button>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="font-serif text-2xl font-bold text-navy">
                  ${listing.price.toLocaleString()} <span className="font-sans text-xs font-normal text-gray-400">/month</span>
                </div>
                <div className="font-semibold text-sm text-navy mt-1.5 mb-1">{listing.title}</div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin size={12} /> {listing.location}
                </div>
                <span className="badge badge-type mt-2">{listing.type}</span>
                <div className="flex gap-4 mt-4 pt-4 border-t border-stone text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Bed size={13} /> {listing.beds === 0 ? 'Studio' : `${listing.beds} Beds`}</span>
                  <span className="flex items-center gap-1"><Bath size={13} /> {listing.baths} Baths</span>
                  <span className="flex items-center gap-1"><Maximize size={13} /> {listing.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
