interface SectionHeadingProps {
  eyebrow: string
  title: string
  description: string
  centered?: boolean
  tone?: 'light' | 'dark'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  tone = 'light',
}: SectionHeadingProps) {
  const eyebrowClass = tone === 'dark' ? 'text-[#f6c445]' : 'text-[#c49019]'
  const titleClass = tone === 'dark' ? 'text-white' : 'text-[#0b1f57]'
  const descriptionClass = tone === 'dark' ? 'text-blue-100/78' : 'text-slate-600'

  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <p className={`text-xs font-bold uppercase tracking-[0.34em] ${eyebrowClass}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-3xl font-bold leading-tight md:text-4xl ${titleClass}`}
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        {title}
      </h2>
      <p className={`mt-4 text-base leading-7 ${descriptionClass}`}>
        {description}
      </p>
    </div>
  )
}
