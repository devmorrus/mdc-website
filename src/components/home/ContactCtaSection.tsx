import type { ContactCtaContent } from '../../types/home'
import { ContactLeadForm } from './ContactLeadForm'
import { Link } from 'react-router-dom'

interface ContactCtaSectionProps {
  content: ContactCtaContent
  whatsappLink: string
  whatsappNumber: string
}

export function ContactCtaSection({ content, whatsappLink, whatsappNumber }: ContactCtaSectionProps) {
  const targetHref = content.buttonHref === '#whatsapp' ? whatsappLink : content.buttonHref
  const isExternal = targetHref.startsWith('http')

  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-6 pb-16 pt-8 md:pb-20">
      <div className="grid gap-6 rounded-2xl border border-amber-200/35 bg-linear-to-r from-blue-900/65 via-blue-900/55 to-amber-400/20 p-7 md:grid-cols-2 md:items-start md:p-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">{content.eyebrow}</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-blue-50 md:text-4xl">{content.title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-blue-100/85 md:text-base">{content.description}</p>
          {isExternal ? (
            <a
              href={targetHref}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-lg bg-amber-300 px-5 py-3 text-sm font-semibold text-blue-950 transition hover:bg-amber-200"
            >
              {content.buttonLabel}
            </a>
          ) : (
            <Link
              to={targetHref}
              className="mt-6 inline-flex rounded-lg bg-amber-300 px-5 py-3 text-sm font-semibold text-blue-950 transition hover:bg-amber-200"
            >
              {content.buttonLabel}
            </Link>
          )}
        </div>

        <ContactLeadForm whatsappNumber={whatsappNumber} />
      </div>
    </section>
  )
}
