import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import StatsBanner from '@/components/home/StatsBanner'
import FeaturedListings from '@/components/home/FeaturedListings'
import CategoriesSection from '@/components/home/CategoriesSection'
import HowItWorks from '@/components/home/HowItWorks'
import PricingPlans from '@/components/home/PricingPlans'
import Testimonials from '@/components/home/Testimonials'
import CtaSection from '@/components/home/CtaSection'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsBanner />
        <FeaturedListings />
        <CategoriesSection />
        <HowItWorks />
        <PricingPlans />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
