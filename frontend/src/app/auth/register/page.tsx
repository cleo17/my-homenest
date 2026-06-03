'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Home, Eye, EyeOff, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const { register } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'tenant' as 'tenant' | 'landlord' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters'); return }
    setLoading(true)
    try {
      await register(form)
      toast.success('Account created! Please verify your email.')
      router.push('/dashboard')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 font-serif text-xl font-bold text-navy mb-8">
          <span className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center text-white">
            <Home size={18} />
          </span>
          HomeNest
        </Link>

        <div className="card p-8">
          <h1 className="font-serif text-2xl font-bold text-navy mb-1">Create your account</h1>
          <p className="text-sm text-gray-500 mb-6">Join thousands of landlords and renters</p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {(['tenant', 'landlord'] as const).map(role => (
              <button
                key={role}
                type="button"
                onClick={() => setForm(f => ({ ...f, role }))}
                className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                  form.role === role
                    ? 'border-gold bg-gold/10 text-navy'
                    : 'border-stone text-gray-400 hover:border-navy/30'
                }`}
              >
                {role === 'tenant' ? '🔍 I\'m looking to rent' : '🏠 I\'m a landlord'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input type="text" className="input-field" placeholder="John Smith" value={form.name} onChange={set('name')} required />
            </div>
            <div>
              <label className="label">Email Address</label>
              <input type="email" className="input-field" placeholder="you@example.com" value={form.email} onChange={set('email')} required autoComplete="email" />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  className="input-field pr-10"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={set('password')}
                  required
                  autoComplete="new-password"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed mt-2">
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            By signing up you agree to our{' '}
            <Link href="/terms" className="text-gold hover:underline">Terms</Link> and{' '}
            <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>.
          </p>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-gold font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
