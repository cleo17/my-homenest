import Link from 'next/link'
import { Home, Building, GraduationCap, DoorOpen, Waves, Users } from 'lucide-react'

const CATEGORIES = [
  { icon: Home, name: 'Family Homes', count: '4,821', href: '/listings?type=family-home' },
  { icon: Building, name: 'Apartments', count: '12,450', href: '/listings?type=apartment' },
  { icon: GraduationCap, name: 'Student Housing', count: '3,204', href: '/listings?type=student' },
  { icon: DoorOpen, name: 'Guest Houses', count: '1,890', href: '/listings?type=guest-house' },
  { icon: Waves, name: 'Vacation Rentals', count: '6,732', href: '/listings?type=vacation' },
  { icon: Users, name: 'Shared Rooms', count: '2,110', href: '/listings?type=shared' },
]

export default function CategoriesSection() {
  return (
    <section className="bg-navy py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">Browse by Category</h2>
          <p className="text-white/50 mt-1 text-sm">Find exactly what you&apos;re looking for</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map(({ icon: Icon, name, count, href }) => (
            <Link
              key={name}
              href={href}
              className="bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:bg-gold/20 hover:border-gold/40 hover:-translate-y-1 transition-all duration-250"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3">
                <Icon size={24} className="text-gold" />
              </div>
              <div className="text-sm font-semibold text-white">{name}</div>
              <div className="text-xs text-white/40 mt-1">{count} listings</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
