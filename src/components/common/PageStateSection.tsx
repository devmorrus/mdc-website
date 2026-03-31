interface PageStateSectionProps {
  tone: 'info' | 'error'
  text: string
}

export function PageStateSection({ tone, text }: PageStateSectionProps) {
  const textColor = tone === 'error' ? 'text-red-200' : 'text-blue-100/80'

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <p className={textColor}>{text}</p>
    </section>
  )
}
