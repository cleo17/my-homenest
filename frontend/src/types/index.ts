// ============================================================
// Shared TypeScript types — used across all pages & components
// ============================================================

export interface Owner {
  id: string
  name: string
  avatar: string | null
}

export interface ListingCount {
  inquiries: number
  favorites: number
}

export interface Listing {
  id: string
  title: string
  description: string
  category: string
  rentalType: string
  monthlyRent: number
  securityDeposit: number | null
  bedrooms: number
  bathrooms: number
  sqft: number | null
  furnished: boolean
  petFriendly: boolean
  parkingAvailable: boolean
  amenities: string[]
  images: string[]
  streetAddress: string
  city: string
  state: string
  zipCode: string
  lat: number | null
  lng: number | null
  contactName: string
  contactPhone: string
  contactEmail: string
  status: string
  plan: string | null
  featured: boolean
  viewCount: number
  expiresAt: string | null
  ownerId: string
  owner: Owner
  _count: ListingCount
  createdAt: string
  updatedAt: string
}

export interface ListingCard {
  id: string
  title: string
  description?: string
  monthlyRent: number
  city: string
  state: string
  streetAddress: string
  zipCode: string
  category: string
  bedrooms: number
  bathrooms: number
  sqft: number | null
  images: string[]
  featured: boolean
  furnished: boolean
  petFriendly: boolean
  parkingAvailable: boolean
  plan: string | null
  status: string
  viewCount: number
  _count: ListingCount
  ownerId?: string
  owner?: Owner
  contactName?: string
  contactPhone?: string
  contactEmail?: string
}

export interface InquiryListing {
  id: string
  title: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  listingId: string
  listing: InquiryListing
  read: boolean
  createdAt: string
}

export interface PaymentListing {
  id: string
  title: string
}

export interface Payment {
  id: string
  amount: number
  currency: string
  status: string
  stripePaymentId: string | null
  plan: string
  listingId: string
  listing: PaymentListing
  userId: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'tenant' | 'landlord' | 'admin'
  avatar: string | null
  phone?: string | null
  emailVerified?: boolean
  createdAt?: string
}

export interface Pagination {
  total: number
  page: number
  limit: number
  pages?: number
}

export interface ListingsResponse {
  data: ListingCard[]
  pagination: Pagination
}

export interface InquiriesResponse {
  data: Inquiry[]
  pagination: Pagination
}

export interface ContactDetails {
  name: string
  phone: string
  email: string
}

export interface InquiryResponse {
  inquiry: Inquiry
  contactDetails: ContactDetails
}
