'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useAuth } from '@/context/AuthContext'
import { apiGetMyListings, apiGetMyInquiries, apiGetMyPayments, apiMarkInquiryRead } from '@/lib/api'
import type { ListingCard, Inquiry, Payment } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard, List, MessageSquare, CreditCard,
  Plus, Eye, MapPin, CheckCircle, Clock, XCircle,
  Loader2, ArrowRight, Heart,
} from 'lucide-react'

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'listings', label: 'My Listings', icon: List },
  { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
  { id: 'payments', label: 'Payments', icon: CreditCard },
]

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  draft: 'bg-gray-100 text-gray-500',
  expired: 'bg-red-100 text-red-700',
  rejected: 'bg-red-100 text-red-700',
}

const STATUS_ICONS: Record<string, React.ReactNode> = {
  active: <CheckCircle size={13} />,
  pending: <Clock size={13} />,
  rejected: <XCircle size={13} />,
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState('overview')
  const [listings, setListings] = useState<ListingCard[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) router.push('/auth/login')
  }, [user, authLoading, router])

  useEffect(() => {
    if (!user) return
    setLoading(true)
    Promise.all([
      apiGetMyListings().then((d) => setListings(d.data as ListingCard[])).catch(() => {}),
      apiGetMyInquiries().then((d) => setInquiries(d.data as Inquiry[])).catch(() => {}),
      apiGetMyPayments().then((d) => setPayments(d as Payment[])).catch(() => {}),
    ]).finally(() => setLoading(false))
  }, [user])

  const markRead = async (id: string) => {
    await apiMarkInquiryRead(id).catch(() => {})
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, read: true } : i))
    )
  }

  if (authLoading || !user) return null

  const activeCount = listings.filter((l) => l.status === 'active').length
  const pendingCount = listings.filter((l) => l.status === 'pending').length
  const unreadCount = inquiries.filter((i) => !i.read).length
  const totalRevenue = payments
    .filter((p) => p.status === 'succeeded')
    .reduce((s, p) => s + Number(p.amount), 0)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream py-8 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-bold text-navy">Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">Welcome back, {user.name}</p>
            </div>
            <Link href="/list-property" className="btn-primary">
              <Plus size={16} /> New Listing
            </Link>
          </div>

          {/* Tab bar */}
          <div className="flex gap-1 bg-white rounded-xl p-1 border border-stone w-fit mb-8 flex-wrap">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === t.id ? 'bg-navy text-white' : 'text-gray-500 hover:text-navy'
                }`}
              >
                <t.icon size={15} /> {t.label}
                {t.id === 'inquiries' && unreadCount > 0 && (
                  <span className="ml-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 size={28} className="animate-spin text-gold" />
            </div>
          )}

          {/* ── Overview ── */}
          {!loading && tab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Active Listings', value: activeCount, icon: CheckCircle, color: 'text-green-600' },
                  { label: 'Pending Review', value: pendingCount, icon: Clock, color: 'text-yellow-600' },
                  { label: 'Unread Inquiries', value: unreadCount, icon: MessageSquare, color: 'text-blue-600' },
                  { label: 'Total Paid', value: `$${totalRevenue.toLocaleString()}`, icon: CreditCard, color: 'text-gold' },
                ].map((stat) => (
                  <div key={stat.label} className="card p-5">
                    <div className={`${stat.color} mb-3`}><stat.icon size={22} /></div>
                    <div className="font-serif text-2xl font-bold text-navy">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-serif text-lg font-bold text-navy">Recent Listings</h2>
                  <button onClick={() => setTab('listings')} className="text-xs text-gold flex items-center gap-1 hover:underline">
                    View all <ArrowRight size={13} />
                  </button>
                </div>
                {listings.slice(0, 3).map((l) => (
                  <div key={l.id} className="flex items-center justify-between py-3 border-b border-stone last:border-0">
                    <div>
                      <div className="font-medium text-sm text-navy">{l.title}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                        <MapPin size={11} /> {l.city}, {l.state}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-semibold text-navy">${l.monthlyRent.toLocaleString()}/mo</div>
                      <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${STATUS_STYLES[l.status] ?? 'bg-gray-100 text-gray-500'}`}>
                        {STATUS_ICONS[l.status]} {l.status}
                      </span>
                    </div>
                  </div>
                ))}
                {listings.length === 0 && (
                  <div className="text-center py-6 text-gray-400 text-sm">
                    No listings yet.{' '}
                    <Link href="/list-property" className="text-gold hover:underline">Create your first →</Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Listings ── */}
          {!loading && tab === 'listings' && (
            <div className="card overflow-hidden">
              <div className="p-5 border-b border-stone flex justify-between items-center">
                <h2 className="font-serif text-lg font-bold text-navy">All Listings ({listings.length})</h2>
                <Link href="/list-property" className="btn-primary text-sm py-2 px-4">
                  <Plus size={14} /> New
                </Link>
              </div>
              {listings.length === 0 ? (
                <div className="text-center py-12 text-gray-400">No listings yet.</div>
              ) : (
                <div className="divide-y divide-stone">
                  {listings.map((l) => (
                    <div key={l.id} className="flex items-center justify-between p-5 hover:bg-cream/50 transition-colors">
                      <div className="flex-1">
                        <div className="font-medium text-navy">{l.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5 flex gap-3">
                          <span className="flex items-center gap-1"><MapPin size={11} /> {l.city}, {l.state}</span>
                          <span className="flex items-center gap-1"><Eye size={11} /> {l.viewCount} views</span>
                          <span className="flex items-center gap-1"><MessageSquare size={11} /> {l._count.inquiries} inquiries</span>
                          <span className="flex items-center gap-1"><Heart size={11} /> {l._count.favorites} saves</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-semibold text-navy">${l.monthlyRent.toLocaleString()}/mo</div>
                        <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[l.status] ?? ''}`}>
                          {STATUS_ICONS[l.status]} {l.status}
                        </span>
                        <Link href={`/listings/${l.id}`} className="text-xs text-gold hover:underline flex items-center gap-1">
                          View <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Inquiries ── */}
          {!loading && tab === 'inquiries' && (
            <div className="card overflow-hidden">
              <div className="p-5 border-b border-stone">
                <h2 className="font-serif text-lg font-bold text-navy">Inquiries ({inquiries.length})</h2>
              </div>
              {inquiries.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">No inquiries yet.</div>
              ) : (
                <div className="divide-y divide-stone">
                  {inquiries.map((i) => (
                    <div key={i.id} className={`p-5 ${!i.read ? 'bg-blue-50/40' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-navy text-sm flex items-center gap-2">
                            {i.name}
                            {!i.read && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {i.email}{i.phone ? ` · ${i.phone}` : ''}
                          </div>
                          <div className="text-xs text-gray-400">Re: {i.listing.title}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-gray-400">
                            {new Date(i.createdAt).toLocaleDateString()}
                          </div>
                          {!i.read && (
                            <button onClick={() => markRead(i.id)} className="text-xs text-gold hover:underline">
                              Mark read
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 bg-cream rounded-lg px-3 py-2">{i.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Payments ── */}
          {!loading && tab === 'payments' && (
            <div className="card overflow-hidden">
              <div className="p-5 border-b border-stone">
                <h2 className="font-serif text-lg font-bold text-navy">Payment History</h2>
              </div>
              {payments.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">No payments yet.</div>
              ) : (
                <div className="divide-y divide-stone">
                  {payments.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-5">
                      <div>
                        <div className="font-medium text-sm text-navy capitalize">{p.plan} Plan</div>
                        <div className="text-xs text-gray-400 mt-0.5">{p.listing.title}</div>
                        <div className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="font-serif font-bold text-navy">${Number(p.amount).toFixed(2)}</div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          p.status === 'succeeded' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
