const STEPS = [
  { num: 1, title: 'Create Account', desc: 'Sign up free as a landlord or property manager in under 2 minutes.' },
  { num: 2, title: 'Post Property', desc: 'Fill in details, upload photos, and describe your rental space.' },
  { num: 3, title: 'Pay Listing Fee', desc: 'Choose your plan and pay securely via Stripe or PayPal.' },
  { num: 4, title: 'Get Inquiries', desc: 'Receive and respond to tenant inquiries in your dashboard.' },
  { num: 5, title: 'Close the Deal', desc: 'Screen tenants, sign agreements, and find your perfect renter.' },
]

export default function HowItWorks() {
  return (
    <section className="py-16 px-4 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-navy">How HomeNest Works</h2>
          <p className="text-gray-500 mt-1 text-sm">List your property in minutes and start receiving inquiries</p>
        </div>
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-[34px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-stone via-gold to-stone z-0" />
          {STEPS.map(step => (
            <div key={step.num} className="card p-5 text-center relative z-10">
              <div className="w-12 h-12 rounded-full bg-navy text-white font-serif text-lg font-bold flex items-center justify-center mx-auto mb-4">
                {step.num}
              </div>
              <h3 className="font-semibold text-sm text-navy mb-2">{step.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
