import Link from 'next/link'

export default function CtaSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gold to-gold-dark text-center">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
        Ready to List Your Property?
      </h2>
      <p className="text-white/80 text-base mb-8 max-w-md mx-auto leading-relaxed">
        Join over 50,000 landlords who trust HomeNest to connect them with quality tenants across America.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/list-property"
          className="bg-white text-gold font-semibold px-7 py-3.5 rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        >
          Post a Listing
        </Link>
        <Link
          href="/about"
          className="border-2 border-white/60 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/15 transition-all duration-200"
        >
          Learn More
        </Link>
      </div>
    </section>
  )
}
