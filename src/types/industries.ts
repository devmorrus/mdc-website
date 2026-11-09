export interface IndustrySolution { id: string; name: string; type: 'Website' | 'Aplikasi/Sistem'; description: string; benefits: string[] }
export interface Industry { id: string; name: string; slug: string; summary: string; hero?: string | null; coverImage?: string | null; seoTitle?: string | null; seoDescription?: string | null; solutions: IndustrySolution[] }
