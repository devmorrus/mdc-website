import { useEffect, useState } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { AboutSnippetContent } from '../../types/home'
import { SectionHeading } from './SectionHeading'

interface AboutSectionProps {
  content: AboutSnippetContent
}

function TeamMemberSlider({ members }: { members: AboutSnippetContent['teamMembers'] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (members.length <= 1) return

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % members.length)
    }, 3200)

    return () => window.clearInterval(intervalId)
  }, [members.length])

  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-blue-900/10 bg-gradient-to-br from-[#0b1f57] via-[#0f2f78] to-[#184aa8] p-7 shadow-[0_24px_60px_-34px_rgba(11,31,87,0.55)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_20%),radial-gradient(circle_at_80%_75%,rgba(255,255,255,0.08),transparent_18%)]" />
      <p className="relative z-10 text-xs font-bold uppercase tracking-[0.3em] text-[#f6c445]">
        Tim Kami
      </p>

      <div className="relative mt-6 h-[24rem] overflow-hidden">
        {members.map((member, index) => {
          const isActive = index === activeIndex

          return (
            <div
              key={member.id}
              className={`absolute inset-0 transition-all duration-700 ${
                isActive
                  ? 'translate-x-0 opacity-100'
                  : index < activeIndex || (activeIndex === 0 && index === members.length - 1)
                    ? '-translate-x-8 opacity-0'
                    : 'translate-x-8 opacity-0'
              }`}
            >
              <div className="flex h-full flex-col justify-between rounded-[1.75rem] border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                <div className="overflow-hidden rounded-[1.5rem] bg-white/10">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="h-64 w-full object-cover object-center"
                    loading="lazy"
                  />
                </div>

                <div className="mt-5">
                  <h3
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-blue-100/72">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="relative z-10 mt-5 flex items-center justify-center gap-2">
        {members.map((member, index) => (
          <button
            key={member.id}
            type="button"
            aria-label={`Tampilkan ${member.name}`}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === activeIndex ? 'w-8 bg-[#f6c445]' : 'w-2.5 bg-white/38'
            }`}
          />
        ))}
      </div>
    </article>
  )
}

export function AboutSection({ content }: AboutSectionProps) {
  const sectionRef = useGsapReveal<HTMLElement>()

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] py-18 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(246,196,69,0.08),transparent_18%),radial-gradient(circle_at_86%_32%,rgba(24,74,168,0.08),transparent_22%)]" />
      <div className="mx-auto relative z-10 grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.summary}
          />

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            {content.description}
          </p>
        </div>

        <div>
          <TeamMemberSlider members={content.teamMembers} />
        </div>
      </div>
    </section>
  )
}
