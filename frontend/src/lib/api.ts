// ============================================================
// api.ts — Mock-only API layer for Phase 1
// All data comes from mockData.ts. No backend required.
// Flip USE_MOCK = false and wire up real endpoints in Phase 2.
// ============================================================

import Cookies from 'js-cookie'
import type {
  Listing, ListingCard, ListingsResponse,
  Inquiry, InquiriesResponse, InquiryResponse,
  Payment, ContactDetails, User,
} from '@/types'
import {
  mockUser, mockListings, mockInquiries, mockPayments,
  mockFavorites, mockStats, mockDashboardStats,
} from './mockData'

export const USE_MOCK = true

// ── Simulated delay ──────────────────────────────────────
const delay = (ms = 300) => new Promise<void>((res) => setTimeout(res, ms))

// ── Mock auth helpers ─────────────────────────────────────
export function getMockUserFromCookie(): User | null {
  try {
    const raw = Cookies.get('homenest_mock_user')
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

// ============================================================
// AUTH
// ============================================================

export async function apiLogin(email: string, _password: string) {
  await delay(400)
  // In mock mode any credentials work; role inferred from email
  const role = email.includes('landlord') ? 'landlord' : 'tenant'
  const user = { ...mockUser, email, role: role as 'tenant' | 'landlord' }
  Cookies.set('homenest_mock_user', JSON.stringify(user), { expires: 7 })
  return { user }
}

export async function apiRegister(data: { name: string; email: string; password: string; role: 'tenant' | 'landlord' }) {
  await delay(500)
  const user = { ...mockUser, name: data.name, email: data.email, role: data.role }
  Cookies.set('homenest_mock_user', JSON.stringify(user), { expires: 7 })
  return { user }
}

export function apiLogout() {
  Cookies.remove('homenest_mock_user')
  Cookies.remove('homenest_token')
}

export async function apiGetMe(): Promise<User> {
  await delay(200)
  const u = getMockUserFromCookie()
  if (!u) throw new Error('Not authenticated')
  return u
}

// ============================================================
// LISTINGS
// ============================================================

export interface ListingFilters {
  location?: string
  type?: string
  bedrooms?: string
  maxRent?: string
  petFriendly?: string
  furnished?: string
  parkingAvailable?: string
}

export async function apiGetListings(filters: ListingFilters = {}): Promise<ListingsResponse> {
  await delay(300)
  let data = [...mockListings] as ListingCard[]

  if (filters.location) {
    const loc = filters.location.toLowerCase()
    data = data.filter(
      (l) =>
        l.city.toLowerCase().includes(loc) ||
        l.state.toLowerCase().includes(loc) ||
        l.streetAddress.toLowerCase().includes(loc) ||
        l.zipCode.includes(loc)
    )
  }
  if (filters.type) data = data.filter((l) => l.category === filters.type)
  if (filters.bedrooms) {
    const beds = Number(filters.bedrooms)
    data = data.filter((l) => (beds === 0 ? l.bedrooms === 0 : l.bedrooms >= beds))
  }
  if (filters.maxRent) data = data.filter((l) => l.monthlyRent <= Number(filters.maxRent))
  if (filters.petFriendly === 'true') data = data.filter((l) => l.petFriendly)
  if (filters.furnished === 'true') data = data.filter((l) => l.furnished)

  return {
    data,
    pagination: { total: data.length, page: 1, limit: 20, pages: 1 },
  }
}

export async function apiGetListing(id: string): Promise<Listing> {
  await delay(250)
  const found = mockListings.find((l) => l.id === id)
  if (!found) throw new Error('Listing not found')
  return found as unknown as Listing
}

export async function apiCreateInquiry(data: {
  listingId: string
  name: string
  email: string
  phone?: string
  message: string
}): Promise<InquiryResponse> {
  await delay(600)
  const listing = mockListings.find((l) => l.id === data.listingId)
  return {
    inquiry: {
      id: `inq-${Date.now()}`,
      ...data,
      listing: listing ? { id: listing.id, title: listing.title } : undefined,
      read: false,
      createdAt: new Date().toISOString(),
    } as Inquiry,
    contactDetails: {
      name: listing?.contactName ?? 'Demo Landlord',
      phone: listing?.contactPhone ?? '(555) 000-0000',
      email: listing?.contactEmail ?? 'demo@homenest.com',
    } as ContactDetails,
  }
}

// ============================================================
// DASHBOARD (landlord/tenant)
// ============================================================

export async function apiGetMyListings(): Promise<ListingsResponse> {
  await delay(300)
  return {
    data: mockListings as unknown as ListingCard[],
    pagination: { total: mockListings.length, page: 1, limit: 20, pages: 1 },
  }
}

export async function apiGetMyInquiries(): Promise<InquiriesResponse> {
  await delay(300)
  return {
    data: mockInquiries as unknown as Inquiry[],
    pagination: { total: mockInquiries.length, page: 1, limit: 20, pages: 1 },
  }
}

export async function apiGetMyPayments(): Promise<Payment[]> {
  await delay(300)
  return mockPayments as unknown as Payment[]
}

export async function apiMarkInquiryRead(_id: string): Promise<void> {
  await delay(150)
}

export async function apiGetFeaturedListings(): Promise<ListingCard[]> {
  await delay(250)
  return mockListings.filter((l) => l.featured) as unknown as ListingCard[]
}

export async function apiGetStats() {
  await delay(200)
  return mockStats
}

export async function apiGetDashboardStats() {
  await delay(200)
  return mockDashboardStats
}

export async function apiCreateListing(data: unknown): Promise<{ id: string }> {
  await delay(800)
  console.log('Mock listing created:', data)
  return { id: `listing-${Date.now()}` }
}

export default { USE_MOCK }
