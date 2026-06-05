import { mockListings } from '@/lib/mockData'
import ListingDetailClient from './ListingDetailClient'

export function generateStaticParams() {
  return mockListings.map((listing) => ({ id: listing.id }))
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ListingDetailClient id={id} />
}
