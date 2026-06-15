import { AdvantagesSection } from './AdvantagesSection'
import { AboutSection } from './AboutSection'
import { ArticlesSection } from './ArticlesSection'
import { ContactCtaSection } from './ContactCtaSection'
import { FloatingWhatsApp } from './FloatingWhatsApp'
import { HeroSection } from './HeroSection'
import { PartnersSection } from './PartnersSection'
import { PortfolioPreviewSection } from './PortfolioPreviewSection'
import { ServicesSection } from './ServicesSection'
import { StatsStrip } from './StatsStrip'
import { TestimonialsSection } from './TestimonialsSection'
import type { HomeViewModel } from '../../services/home/homeContentMapper'

interface HomePageContentProps {
  model: HomeViewModel
}

export function HomePageContent({ model }: HomePageContentProps) {
  return (
    <>
      <HeroSection content={model.hero} projects={model.portfolio} />
      <PartnersSection items={model.partners} />
      <StatsStrip stats={model.stats} />
      <AboutSection content={model.about} />
      <ServicesSection items={model.services} />
      <AdvantagesSection items={model.advantages} />
      <PortfolioPreviewSection items={model.portfolio} />
      <TestimonialsSection items={model.testimonials} />
      {model.articles.length > 0 ? <ArticlesSection items={model.articles} /> : null}
      <ContactCtaSection
        content={model.contactCta}
      />
      <FloatingWhatsApp />
    </>
  )
}
