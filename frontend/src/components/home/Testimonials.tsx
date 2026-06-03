const TESTIMONIALS = [
  {
    stars: 5,
    text: 'I listed my Austin condo and got 12 inquiries in the first week. The premium placement was absolutely worth it. Found a great tenant in just 10 days!',
    name: 'Marcus Reid',
    role: 'Landlord · Austin, TX',
    initials: 'MR',
    color: '#1D3A5C',
  },
  {
    stars: 5,
    text: 'As a student moving to a new city, HomeNest made it so easy to find verified off-campus housing. The filters and map view helped me narrow down to exactly what I needed.',
    name: 'Jamie Liu',
    role: 'Student · Denver, CO',
    initials: 'JL',
    color: '#4A1942',
  },
  {
    stars: 4,
    text: 'We manage 30 properties across three states and HomeNest\'s enterprise plan has streamlined everything. The dashboard analytics are genuinely useful for our business.',
    name: 'Sandra Park',
    role: 'Property Manager · Miami, FL',
    initials: 'SP',
    color: '#1B6B45',
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 px-4 bg-stone/40">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-navy">What Our Users Say</h2>
          <p className="text-gray-500 mt-1 text-sm">Join thousands of satisfied landlords and renters</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="card p-6">
              <div className="text-gold text-lg mb-3">{'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}</div>
              <p className="text-sm text-gray-600 leading-relaxed italic mb-5">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
