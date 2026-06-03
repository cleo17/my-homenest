import Link from 'next/link'
import { Check, X } from 'lucide-react'

const PLANS = [
  {
    name: 'Basic',
    price: 29,
    period: '30 days',
    popular: false,
    features: [
      { label: 'Standard placement', included: true },
      { label: 'Up to 5 photos', included: true },
      { label: 'Inquiry management', included: true },
      { label: 'Featured placement', included: false },
      { label: 'Analytics dashboard', included: false },
    ],
    cta: 'Get Started',
    href: '/list-property?plan=basic',
  },
  {
    name: 'Premium',
    price: 79,
    period: '60 days',
    popular: true,
    features: [
      { label: 'Homepage featured spot', included: true },
      { label: 'Highlighted search results', included: true },
      { label: 'Priority support', included: true },
      { label: 'Analytics dashboard', included: true },
      { label: 'Listing performance stats', included: true },
    ],
    cta: 'Choose Premium',
    href: '/list-property?plan=premium',
  },
  {
    name: 'Enterprise',
    price: 199,
    period: '90 days',
    popular: false,
    features: [
      { label: 'Unlimited listings', included: true },
      { label: 'Dedicated account manager', included: true },
      { label: 'Full analytics suite', included: true },
      { label: 'API access', included: true },
      { label: 'Custom integrations', included: true },
    ],
    cta: 'Contact Sales',
    href: '/contact?plan=enterprise',
  },
]

export default function PricingPlans() {
  return (
    <section className="py-16 px-4 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-navy">Listing Plans</h2>
          <p className="text-gray-500 mt-2 text-sm">Choose the plan that works best for you</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {PLANS.map(plan => (
            <div
              key={plan.name}
              className={`rounded-2xl p-7 relative ${
                plan.popular
                  ? 'bg-navy border-2 border-gold shadow-card-lg'
                  : 'bg-white border border-stone shadow-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <div className={`text-xs font-semibold uppercase tracking-widest mb-2 ${plan.popular ? 'text-white/50' : 'text-gray-400'}`}>
                {plan.name}
              </div>
              <div className={`font-serif text-3xl font-bold mb-5 ${plan.popular ? 'text-gold' : 'text-navy'}`}>
                ${plan.price}
                <span className={`font-sans text-sm font-normal ${plan.popular ? 'text-white/40' : 'text-gray-400'}`}>
                  {' '}/ {plan.period}
                </span>
              </div>
              <ul className="flex flex-col gap-2.5 mb-7">
                {plan.features.map(f => (
                  <li key={f.label} className={`flex items-center gap-2 text-sm ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
                    {f.included
                      ? <Check size={15} className={plan.popular ? 'text-gold' : 'text-green-500'} />
                      : <X size={15} className="text-gray-300" />
                    }
                    {f.label}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block text-center py-3 rounded-lg font-medium text-sm transition-all ${
                  plan.popular
                    ? 'bg-gold text-white hover:bg-gold-light'
                    : 'border border-navy text-navy hover:bg-navy hover:text-white'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
