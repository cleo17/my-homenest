'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { apiGetListing, apiCreateInquiry } from '@/lib/api'
import type { Listing, ContactDetails } from '@/types'
import {
  MapPin, Bed, Bath, Maximize, Heart, Phone, Mail,
  User, Send, Loader2, CheckCircle,
  Wifi, Car, ShieldCheck, Dumbbell, WashingMachine, Wind,
} from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: <Wifi size={16} />,
  parking: <Car size={16} />,
  security: <ShieldCheck size={16} />,
  gym: <Dumbbell size={16} />,
  laundry: <WashingMachine size={16} />,
  'air conditioning': <Wind size={16} />,
}

const PROPERTY_EMOJIS: Record<string, string> = {
  apartment: '🏙️',
  'family-home': '🏡',
  studio: '🏢',
  vacation: '🏖️',
  student: '🎓',
  'guest-house': '🏠',
  shared: '🏘️',
}

export default function ListingDetailClient({ id }: { id: string }) {
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [contactShown, setContactShown] = useState(false)
  const [sending, setSending] = useState(false)
  const [contactDetails, setContactDetails] = useState<ContactDetails | null>(null)
  const [inquiry, setInquiry] = useState({ name: '', email: '', phone: '', message: '' })

  useEffect(() => {
    apiGetListing(id)
      .then((data) => setListing(data as Listing))
      .catch(() => toast.error('Listing not found'))
      .finally(() => setLoading(false))
  }, [id])

  const sendInquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const result = await apiCreateInquiry({ listingId: id, ...inquiry })
      setContactDetails(result.contactDetails)
      setContactShown(true)
      toast.success('Message sent! Contact details revealed.')
    } catch {
      toast.error('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <Loader2 size={32} className="animate-spin text-gold" />
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream gap-4">
        <p className="text-navy font-semibold">Listing not found</p>
        <Link href="/listings" className="btn-primary">Browse Listings</Link>
      </div>
    )
  }

  const emoji = PROPERTY_EMOJIS[listing.category] ?? '🏠'

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <div className="bg-gradient-to-br from-navy to-navy-light h-72 md:h-96 relative flex items-center justify-center text-8xl">
          {listing.images?.[0]
            ? <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
            : <span>{emoji}</span>}
          {listing.featured && (
            <span className="absolute top-4 left-4 badge badge-featured text-sm px-3 py-1">Featured</span>
          )}
          <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-card">
            <Heart size={18} />
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <div className="font-serif text-3xl font-bold text-navy">
                ${listing.monthlyRent.toLocaleString()}
                <span className="font-sans text-base font-normal text-gray-400"> /month</span>
              </div>
              <h1 className="font-serif text-2xl font-bold text-navy mt-2">{listing.title}</h1>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <MapPin size={14} />
                {listing.streetAddress}, {listing.city}, {listing.state} {listing.zipCode}
              </div>

              <div className="flex gap-6 mt-5 pt-5 border-t border-stone text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <Bed size={16} className="text-gold" />
                  {listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} Beds`}
                </span>
                <span className="flex items-center gap-1.5">
                  <Bath size={16} className="text-gold" />
                  {listing.bathrooms} Baths
                </span>
                {listing.sqft && (
                  <span className="flex items-center gap-1.5">
                    <Maximize size={16} className="text-gold" />
                    {listing.sqft.toLocaleString()} sqft
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {listing.furnished && <span className="badge bg-blue-50 text-blue-700">Furnished</span>}
                {listing.petFriendly && <span className="badge bg-green-50 text-green-700">Pet Friendly</span>}
                {listing.parkingAvailable && <span className="badge bg-purple-50 text-purple-700">Parking</span>}
                <span className="badge badge-type capitalize">{listing.category.replace('-', ' ')}</span>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-serif text-lg font-bold text-navy mb-3">About this property</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{listing.description}</p>
            </div>

            {listing.amenities?.length > 0 && (
              <div className="card p-6">
                <h2 className="font-serif text-lg font-bold text-navy mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {listing.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-gold">
                        {AMENITY_ICONS[a.toLowerCase()] ?? <CheckCircle size={16} />}
                      </span>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="card p-6">
              <h2 className="font-serif text-lg font-bold text-navy mb-3">Location</h2>
              <div className="bg-stone rounded-xl h-48 flex flex-col items-center justify-center gap-2 text-gray-400">
                <MapPin size={28} className="text-gold" />
                <p className="font-medium text-navy text-sm">{listing.city}, {listing.state}</p>
                <p className="text-xs">
                  Interactive map available in the next release
                </p>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(`${listing.streetAddress}, ${listing.city}, ${listing.state}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-xs text-gold underline hover:text-gold-dark"
                >
                  View on Google Maps ↗
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="card p-6 sticky top-20">
              <h3 className="font-serif text-lg font-bold text-navy mb-4">Contact Landlord</h3>

              {contactShown && contactDetails ? (
                <div className="space-y-3 mb-5 p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wide flex items-center gap-1">
                    <CheckCircle size={13} /> Contact Details Revealed
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <User size={14} className="text-gold" /> {contactDetails.name}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Phone size={14} className="text-gold" />
                    <a href={`tel:${contactDetails.phone}`} className="hover:text-gold">{contactDetails.phone}</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Mail size={14} className="text-gold" />
                    <a href={`mailto:${contactDetails.email}`} className="hover:text-gold">{contactDetails.email}</a>
                  </div>
                </div>
              ) : null}

              <form onSubmit={sendInquiry} className="space-y-3">
                <div>
                  <label className="label">Your Name</label>
                  <input
                    className="input-field"
                    placeholder="John Doe"
                    value={inquiry.name}
                    onChange={(e) => setInquiry((p) => ({ ...p, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="you@example.com"
                    value={inquiry.email}
                    onChange={(e) => setInquiry((p) => ({ ...p, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="label">Phone (optional)</label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="(555) 000-0000"
                    value={inquiry.phone}
                    onChange={(e) => setInquiry((p) => ({ ...p, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="label">Message</label>
                  <textarea
                    className="input-field h-28 resize-none"
                    placeholder="Hi, I'm interested in this property..."
                    value={inquiry.message}
                    onChange={(e) => setInquiry((p) => ({ ...p, message: e.target.value }))}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full justify-center py-3 disabled:opacity-60"
                >
                  {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {sending ? 'Sending...' : 'Send Message & Reveal Contact'}
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-stone text-xs text-gray-400 flex justify-between">
                <span className="flex items-center gap-1">👁 {listing.viewCount} views</span>
                <span className="flex items-center gap-1">❤️ {listing._count?.favorites ?? 0} saves</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
