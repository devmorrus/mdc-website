import axios from 'axios'

import { CONTACT_STATIC_CONTENT } from '../../data/contact.static'
import type {
  ContactContent,
  ContactInquiryField,
  ContactInquiryFieldErrors,
  ContactInquiryFormData,
  ContactInquiryResult,
} from '../../types/contact'

export interface ContactContentService {
  getContactContent: () => Promise<ContactContent>
}

export interface ContactInquiryService {
  submitContactInquiry: (payload: ContactInquiryFormData) => Promise<ContactInquiryResult>
}

export class StaticContactContentService implements ContactContentService {
  async getContactContent(): Promise<ContactContent> {
    return Promise.resolve(CONTACT_STATIC_CONTENT)
  }
}

export class ApiContactContentService implements ContactContentService {
  async getContactContent(): Promise<ContactContent> {
    throw new Error('API contact content service is not implemented yet.')
  }
}

interface InquiryApiSuccessResponse {
  message?: string
}

interface InquiryApiErrorResponse {
  message?: string
  errors?: Partial<Record<string, string[] | string>>
}

const DEFAULT_INQUIRY_ERROR_MESSAGE = 'Gagal mengirim inquiry. Silakan coba lagi atau hubungi WhatsApp langsung.'

const INQUIRY_FIELD_MAP: Record<string, ContactInquiryField> = {
  name: 'name',
  nama: 'name',
  company_name: 'companyName',
  nama_perusahaan: 'companyName',
  whatsapp_number: 'whatsappNumber',
  nomor_whatsapp: 'whatsappNumber',
  email: 'email',
  message: 'message',
  kebutuhan: 'message',
  pesan: 'message',
  kebutuhan_pesan: 'message',
}

function normalizeInquiryFieldErrors(
  errors?: InquiryApiErrorResponse['errors'],
): ContactInquiryFieldErrors | undefined {
  if (!errors) {
    return undefined
  }

  const normalizedErrors: ContactInquiryFieldErrors = {}

  for (const [field, messages] of Object.entries(errors)) {
    const normalizedField = INQUIRY_FIELD_MAP[field]

    if (!normalizedField) {
      continue
    }

    normalizedErrors[normalizedField] = Array.isArray(messages) ? messages[0] : messages
  }

  return Object.keys(normalizedErrors).length > 0 ? normalizedErrors : undefined
}

export class ApiContactInquiryService implements ContactInquiryService {
  async submitContactInquiry(payload: ContactInquiryFormData): Promise<ContactInquiryResult> {
    const endpoint = import.meta.env.VITE_CONTACT_INQUIRY_ENDPOINT?.trim() || '/api/inquiries'

    try {
      const response = await axios.post<InquiryApiSuccessResponse>(endpoint, {
        nama: payload.name,
        nama_perusahaan: payload.companyName,
        nomor_whatsapp: payload.whatsappNumber,
        email: payload.email,
        pesan: payload.message,
      })

      return {
        status: 'success',
        message: response.data.message ?? 'Inquiry berhasil dikirim. Tim kami akan menghubungi Anda secepatnya.',
      }
    } catch (error) {
      if (axios.isAxiosError<InquiryApiErrorResponse>(error)) {
        const responseMessage = error.response?.data?.message
        const fieldErrors = normalizeInquiryFieldErrors(error.response?.data?.errors)
        const status = error.response?.status

        if (status === 422) {
          return {
            status: 'failed',
            message: responseMessage ?? 'Mohon periksa kembali data inquiry Anda.',
            fieldErrors,
          }
        }

        return {
          status: 'failed',
          message: responseMessage ?? DEFAULT_INQUIRY_ERROR_MESSAGE,
        }
      }

      return {
        status: 'failed',
        message: DEFAULT_INQUIRY_ERROR_MESSAGE,
      }
    }
  }
}

export function createContactContentService(): ContactContentService {
  const mode = import.meta.env.VITE_CONTACT_CONTENT_MODE

  if (mode === 'api') {
    return new ApiContactContentService()
  }

  return new StaticContactContentService()
}

export function createContactInquiryService(): ContactInquiryService {
  return new ApiContactInquiryService()
}
