import type { HomeContent } from '../types/home'

export const HOME_STATIC_CONTENT: HomeContent = {
  hero: {
    eyebrow: 'MDC Studio',
    title: 'Build Digital Presence That Looks Premium and Feels Fast.',
    description:
      'We design and engineer company profile websites with strong visual identity, smooth motion, and scalable architecture that is ready to connect with your CMS and APIs.',
    primaryCtaLabel: 'Start Project',
    secondaryCtaLabel: 'View Works',
  },
  stats: [
    { label: 'Projects Delivered', value: '120+' },
    { label: 'Average Lighthouse', value: '95+' },
    { label: 'Client Satisfaction', value: '98%' },
  ],
  services: [
    {
      id: 'strategy',
      title: 'Brand and Content Strategy',
      description:
        'Turn your company profile into a clear narrative that helps visitors understand what you do in under 10 seconds.',
      highlights: ['Messaging map', 'Information architecture', 'Conversion-focused copy'],
    },
    {
      id: 'design',
      title: 'Modern UI Design System',
      description:
        'Craft a polished visual language with reusable components so the website stays consistent while scaling.',
      highlights: ['Design tokens', 'Responsive grid', 'Component library'],
    },
    {
      id: 'engineering',
      title: 'Frontend Engineering',
      description:
        'Implement performant React, GSAP, and Three.js experiences with clean architecture that is API-ready.',
      highlights: ['Code splitting', 'Motion optimization', 'API integration-ready'],
    },
  ],
}
