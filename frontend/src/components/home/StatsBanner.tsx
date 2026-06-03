'use client'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  { id: 'listings', target: 31200, label: 'Active Listings' },
  { id: 'cities', target: 480, label: 'Cities Covered' },
  { id: 'users', target: 52000, label: 'Registered Users' },
  { id: 'rented', target: 18500, label: 'Properties Rented' },
]

function useCountUp(target: number, duration = 1800, started: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(ease * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration, started])
  return count
}

function StatItem({ stat, started }: { stat: typeof STATS[0]; started: boolean }) {
  const val = useCountUp(stat.target, 1800, started)
  const display = val >= 1000 ? `${(val / 1000).toFixed(1)}K` : String(val)
  return (
    <div className="text-center">
      <div className="font-serif text-2xl font-bold text-gold">{display}</div>
      <div className="text-xs text-white/50 mt-1">{stat.label}</div>
    </div>
  )
}

export default function StatsBanner() {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setStarted(true); obs.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="bg-navy py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-around items-center gap-6">
        {STATS.map((stat, i) => (
          <div key={stat.id} className="flex items-center gap-8">
            <StatItem stat={stat} started={started} />
            {i < STATS.length - 1 && <div className="hidden sm:block w-px h-10 bg-white/10" />}
          </div>
        ))}
      </div>
    </div>
  )
}
