import { AboutSection } from './AboutSection'
import { ContactCtaSection } from './ContactCtaSection'
import { FloatingWhatsApp } from './FloatingWhatsApp'
import { HeroSection } from './HeroSection'
import { PortfolioPreviewSection } from './PortfolioPreviewSection'
import { ServicesSection } from './ServicesSection'
import { StatsStrip } from './StatsStrip'
import type { HomeViewModel } from '../../services/home/homeContentMapper'

interface HomePageContentProps {
  model: HomeViewModel
}

export function HomePageContent({ model }: HomePageContentProps) {
  return (
    <>
      <HeroSection content={model.hero} />
      <StatsStrip stats={model.stats} />
      <AboutSection content={model.about} />
      <ServicesSection items={model.services} />
      <PortfolioPreviewSection items={model.portfolio} />
      <ContactCtaSection
        content={model.contactCta}
        whatsappLink={model.whatsappLink}
        whatsappNumber={model.whatsappNumber}
      />
      <FloatingWhatsApp whatsappLink={model.whatsappLink} />
    </>
  )
}
