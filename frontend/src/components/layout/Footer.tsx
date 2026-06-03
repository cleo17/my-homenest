import Link from 'next/link'
import { Home, Facebook, Instagram, Twitter } from 'lucide-react'

const footerLinks = {
  Browse: [
    { label: 'Apartments', href: '/listings?type=apartment' },
    { label: 'Family Homes', href: '/listings?type=family-home' },
    { label: 'Student Housing', href: '/listings?type=student' },
    { label: 'Guest Houses', href: '/listings?type=guest-house' },
    { label: 'Vacation Rentals', href: '/listings?type=vacation' },
  ],
  Landlords: [
    { label: 'Post a Listing', href: '/list-property' },
    { label: 'Pricing Plans', href: '/pricing' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Resources', href: '/resources' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Contact', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-white mb-3">
              <span className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center text-white">
                <Home size={16} />
              </span>
              HomeNest
            </Link>
            <p className="text-sm leading-relaxed text-white/50">
              America&apos;s trusted rental marketplace connecting landlords and tenants across all 50 states.
            </p>
            <div className="flex gap-3 mt-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold/30 transition-colors">
                  <Icon size={16} className="text-white/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">{section}</h4>
              <ul className="flex flex-col gap-2">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/50 hover:text-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <span>© {new Date().getFullYear()} HomeNest Marketplace. All rights reserved.</span>
          <span className="flex items-center gap-1">🔒 Verified & Secure Platform</span>
        </div>
      </div>
    </footer>
  )
}
