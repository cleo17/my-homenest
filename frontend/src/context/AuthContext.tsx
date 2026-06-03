'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiLogin, apiRegister, apiLogout, apiGetMe, USE_MOCK, getMockUserFromCookie } from '@/lib/api'

interface User {
  id: string
  name: string
  email: string
  role: 'tenant' | 'landlord' | 'admin'
  avatar?: string | null
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (data: { name: string; email: string; password: string; role: 'tenant' | 'landlord' }) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const restore = async () => {
      try {
        if (USE_MOCK) {
          const u = getMockUserFromCookie()
          setUser(u)
        } else {
          const u = await apiGetMe()
          setUser(u)
        }
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    restore()
  }, [])

  const login = async (email: string, password: string) => {
    const { user: u } = await apiLogin(email, password)
    setUser(u)
  }

  const register = async (data: { name: string; email: string; password: string; role: 'tenant' | 'landlord' }) => {
    const { user: u } = await apiRegister(data)
    setUser(u)
  }

  const logout = () => {
    apiLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
