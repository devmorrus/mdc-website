import type { CompanyProfileContent } from '../../types/about'

interface CompanyProfileSectionProps {
  content: CompanyProfileContent
}

export function CompanyProfileSection({ content }: CompanyProfileSectionProps) {
  return (
    <section id="company-profile" className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
      <div className="rounded-2xl border border-blue-200/20 bg-blue-900/20 p-7 md:p-10">
        <h2 className="text-3xl font-semibold text-blue-50 md:text-4xl">{content.title}</h2>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-blue-100/85 md:text-base">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
