// ---------------------------------
// app/page.tsx  (Landing Page)
// ---------------------------------
import { SiteNav } from "@/components/landing/site-nav";
import { Hero } from "@/components/landing/hero";
import { KeyStats } from "@/components/landing/key-stats";
import { Categories } from "@/components/landing/categories";
import { Featured } from "@/components/landing/featured";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { sampleGameThumbs, featuredListings } from "@/lib/mock";

export default function LandingPage() {
  return (
    <main data-theme="light" className="min-h-screen bg-base-100 text-base-content">
      <SiteNav />
      <Hero thumbs={sampleGameThumbs} />
      <KeyStats stats={[
        { label: "Jogos ativos", value: "3.2k" },
        { label: "Vendedores verificados", value: "1.1k" },
        { label: "Ofertas hoje", value: "480+" },
        { label: "Avaliação média", value: "4.9/5" },
      ]} />
      <Categories />
      <Featured items={featuredListings} />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}