import axios from 'axios'
import type { Industry } from '../../types/industries'

interface Response { success: boolean; data: Industry[] | Industry }
export async function fetchIndustries(): Promise<Industry[]> { const response = await axios.get<Response>('/api/public/industries'); return Array.isArray(response.data.data) ? response.data.data : [] }
export async function fetchIndustry(slug: string): Promise<Industry> { const response = await axios.get<Response>(`/api/public/industries/${slug}`); return response.data.data as Industry }
