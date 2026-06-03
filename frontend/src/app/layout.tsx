import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/context/AuthContext'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'HomeNest Marketplace – Find Your Perfect Rental Home',
  description:
    'Browse verified rental listings — apartments, homes, student housing, and vacation rentals.',
  keywords: 'rental homes, apartments for rent, student housing, vacation rentals, property marketplace',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#0B1F3A',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '0.875rem',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
