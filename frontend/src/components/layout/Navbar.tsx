'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Home, Menu, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white border-b border-stone sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-navy">
            <span className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center text-white">
              <Home size={16} />
            </span>
            HomeNest
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex gap-6 ml-4">
            <Link href="/listings" className="text-sm font-medium text-gray-500 hover:text-navy transition-colors">Browse</Link>
            <Link href="/calculator" className="text-sm font-medium text-gray-500 hover:text-navy transition-colors">Rent Calculator</Link>
            <Link href="/mortgage" className="text-sm font-medium text-gray-500 hover:text-navy transition-colors">Mortgage</Link>
            <Link href="/list-property" className="text-sm font-medium text-gray-500 hover:text-navy transition-colors">List Property</Link>
          </div>

          {/* Auth buttons */}
          <div className="ml-auto hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard" className="btn-ghost text-sm py-2 px-4">Dashboard</Link>
                <button onClick={logout} className="btn-outline text-sm py-2 px-4">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="btn-outline text-sm py-2 px-4">Sign In</Link>
                <Link href="/list-property" className="btn-primary text-sm py-2 px-4">Post Listing</Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="ml-auto md:hidden p-2 text-navy" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-stone px-4 py-4 flex flex-col gap-3">
          <Link href="/listings" className="text-sm font-medium text-gray-600 py-2">Browse</Link>
          <Link href="/calculator" className="text-sm font-medium text-gray-600 py-2">Rent Calculator</Link>
          <Link href="/list-property" className="text-sm font-medium text-gray-600 py-2">List Property</Link>
          <div className="flex flex-col gap-2 pt-2 border-t border-stone">
            <Link href="/auth/login" className="btn-outline text-sm justify-center">Sign In</Link>
            <Link href="/list-property" className="btn-primary text-sm justify-center">Post Listing</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
