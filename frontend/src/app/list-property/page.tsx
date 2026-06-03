'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { apiCreateListing } from '@/lib/api'
import toast from 'react-hot-toast'
import { CheckCircle, Loader2, MapPin, Home, DollarSign, Info } from 'lucide-react'

const STEPS = ['Property Details', 'Location & Contact', 'Choose Plan']

const AMENITIES = [
  'WiFi', 'Parking', 'Swimming Pool', 'Gym', 'Laundry',
  'Air Conditioning', 'Security', 'Pet Friendly', 'Balcony', 'Dishwasher',
]

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$29',
    duration: '30 days',
    features: ['Standard listing', 'Up to 5 photos', 'Inquiry notifications'],
    highlight: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$79',
    duration: '60 days',
    features: ['Featured placement', 'Up to 20 photos', 'Priority support', 'Analytics dashboard'],
    highlight: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$149',
    duration: '90 days',
    features: ['Top search placement', 'Unlimited photos', 'Dedicated agent', 'Virtual tour support'],
    highlight: false,
  },
]

export default function ListPropertyPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState('premium')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'apartment',
    rentalType: 'long-term',
    monthlyRent: '',
    securityDeposit: '',
    bedrooms: '1',
    bathrooms: '1',
    sqft: '',
    furnished: false,
    petFriendly: false,
    parkingAvailable: false,
    amenities: [] as string[],
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
  })

  const set = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))

  const toggleAmenity = (a: string) =>
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a)
        ? f.amenities.filter((x) => x !== a)
        : [...f.amenities, a],
    }))

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      await apiCreateListing({ ...form, plan: selectedPlan })
      setDone(true)
      toast.success('Listing submitted! (Mock mode — no payment required)')
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-cream flex items-center justify-center px-4">
          <div className="card p-10 max-w-md text-center">
            <CheckCircle size={52} className="text-green-500 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-navy mb-2">Listing Submitted!</h2>
            <p className="text-sm text-gray-500 mb-6">
              Your listing has been submitted successfully. In Phase 2 you&apos;ll be
              redirected to payment. For now it&apos;s live in mock mode.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => router.push('/listings')} className="btn-primary">
                Browse Listings
              </button>
              <button onClick={() => router.push('/dashboard')} className="btn-outline">
                Go to Dashboard
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">List Your Property</h1>
          <p className="text-sm text-gray-500 mb-8">
            Fill in the details below to post your rental listing on HomeNest.
          </p>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {STEPS.map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    i < step
                      ? 'bg-green-500 text-white'
                      : i === step
                      ? 'bg-gold text-white'
                      : 'bg-stone text-gray-400'
                  }`}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    i === step ? 'text-navy' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
                {i < STEPS.length - 1 && <div className="w-8 h-px bg-stone mx-1" />}
              </div>
            ))}
          </div>

          <div className="card p-7">
            {/* ── Step 0: Property Details ── */}
            {step === 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Home size={18} className="text-gold" />
                  <h2 className="font-serif text-xl font-bold text-navy">Property Details</h2>
                </div>

                <div>
                  <label className="label">Listing Title *</label>
                  <input className="input-field" placeholder="e.g. Modern 2BR Downtown Apartment" value={form.title} onChange={set('title')} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Property Type *</label>
                    <select className="input-field" value={form.category} onChange={set('category')}>
                      <option value="apartment">Apartment</option>
                      <option value="family-home">Family Home</option>
                      <option value="studio">Studio</option>
                      <option value="guest-house">Guest House</option>
                      <option value="student">Student Housing</option>
                      <option value="vacation">Vacation Rental</option>
                      <option value="shared">Shared Room</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Rental Type *</label>
                    <select className="input-field" value={form.rentalType} onChange={set('rentalType')}>
                      <option value="long-term">Long Term</option>
                      <option value="short-term">Short Term</option>
                      <option value="vacation">Vacation</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Monthly Rent ($) *</label>
                    <input type="number" className="input-field" placeholder="e.g. 1500" value={form.monthlyRent} onChange={set('monthlyRent')} required />
                  </div>
                  <div>
                    <label className="label">Security Deposit ($)</label>
                    <input type="number" className="input-field" placeholder="e.g. 1500" value={form.securityDeposit} onChange={set('securityDeposit')} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="label">Bedrooms</label>
                    <select className="input-field" value={form.bedrooms} onChange={set('bedrooms')}>
                      <option value="0">Studio</option>
                      {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Bathrooms</label>
                    <select className="input-field" value={form.bathrooms} onChange={set('bathrooms')}>
                      {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Sqft</label>
                    <input type="number" className="input-field" placeholder="1200" value={form.sqft} onChange={set('sqft')} />
                  </div>
                </div>

                <div>
                  <label className="label">Description *</label>
                  <textarea className="input-field h-32 resize-none" placeholder="Describe the property, neighbourhood, nearby attractions..." value={form.description} onChange={set('description')} required />
                </div>

                <div className="flex gap-5">
                  {(['furnished', 'petFriendly', 'parkingAvailable'] as const).map((field) => (
                    <label key={field} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form[field] as boolean}
                        onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.checked }))}
                      />
                      {field === 'furnished' ? 'Furnished' : field === 'petFriendly' ? 'Pet Friendly' : 'Parking'}
                    </label>
                  ))}
                </div>

                <div>
                  <label className="label">Amenities</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                    {AMENITIES.map((a) => (
                      <label key={a} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.amenities.includes(a)}
                          onChange={() => toggleAmenity(a)}
                        />
                        {a}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 1: Location & Contact ── */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={18} className="text-gold" />
                  <h2 className="font-serif text-xl font-bold text-navy">Location & Contact</h2>
                </div>

                <div>
                  <label className="label">Street Address *</label>
                  <input className="input-field" placeholder="123 Main St" value={form.streetAddress} onChange={set('streetAddress')} required />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="label">City *</label>
                    <input className="input-field" placeholder="Austin" value={form.city} onChange={set('city')} required />
                  </div>
                  <div>
                    <label className="label">State *</label>
                    <input className="input-field" placeholder="TX" maxLength={2} value={form.state} onChange={set('state')} required />
                  </div>
                  <div>
                    <label className="label">ZIP Code *</label>
                    <input className="input-field" placeholder="78701" value={form.zipCode} onChange={set('zipCode')} required />
                  </div>
                </div>

                <hr className="border-stone my-2" />
                <h3 className="font-semibold text-sm text-navy">Contact Information</h3>

                <div>
                  <label className="label">Contact Name *</label>
                  <input className="input-field" placeholder="Your full name" value={form.contactName} onChange={set('contactName')} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Phone *</label>
                    <input type="tel" className="input-field" placeholder="(555) 000-0000" value={form.contactPhone} onChange={set('contactPhone')} required />
                  </div>
                  <div>
                    <label className="label">Email *</label>
                    <input type="email" className="input-field" placeholder="landlord@example.com" value={form.contactEmail} onChange={set('contactEmail')} required />
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2: Plan ── */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign size={18} className="text-gold" />
                  <h2 className="font-serif text-xl font-bold text-navy">Choose a Plan</h2>
                </div>

                <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
                  <Info size={14} className="shrink-0 mt-0.5" />
                  <span>
                    <strong>Phase 1 — Mock Mode:</strong> No payment is processed.
                    Your listing will be visible immediately in demo mode.
                    Stripe payments will be activated in Phase 2.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`cursor-pointer rounded-2xl border-2 p-5 transition-all ${
                        selectedPlan === plan.id
                          ? plan.highlight
                            ? 'border-gold bg-gold/5'
                            : 'border-navy bg-navy/5'
                          : 'border-stone hover:border-gray-300'
                      }`}
                    >
                      {plan.highlight && (
                        <span className="badge badge-featured text-xs mb-2">Most Popular</span>
                      )}
                      <div className="font-serif text-xl font-bold text-navy">{plan.name}</div>
                      <div className="text-2xl font-bold text-gold mt-1">{plan.price}</div>
                      <div className="text-xs text-gray-400 mb-3">{plan.duration}</div>
                      <ul className="space-y-1.5">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-1.5 text-xs text-gray-600">
                            <CheckCircle size={12} className="text-green-500 mt-0.5 shrink-0" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8 pt-5 border-t border-stone">
              {step > 0 ? (
                <button onClick={back} className="btn-outline">← Back</button>
              ) : (
                <div />
              )}

              {step < STEPS.length - 1 ? (
                <button
                  onClick={next}
                  disabled={
                    step === 0 && (!form.title || !form.monthlyRent || !form.description)
                  }
                  className="btn-primary disabled:opacity-50"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-primary disabled:opacity-60"
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                  {submitting ? 'Submitting...' : 'Submit Listing'}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
