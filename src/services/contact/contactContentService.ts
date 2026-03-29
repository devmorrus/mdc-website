import { CONTACT_STATIC_CONTENT } from '../../data/contact.static'
import type { ContactContent, ContactInquiryFormData, ContactInquiryResult } from '../../types/contact'

export interface ContactContentService {
  getContactContent: () => Promise<ContactContent>
  submitContactInquiry: (payload: ContactInquiryFormData) => Promise<ContactInquiryResult>
}

export class StaticContactContentService implements ContactContentService {
  async getContactContent(): Promise<ContactContent> {
    return Promise.resolve(CONTACT_STATIC_CONTENT)
  }

  async submitContactInquiry(payload: ContactInquiryFormData): Promise<ContactInquiryResult> {
    await new Promise((resolve) => {
      setTimeout(resolve, 900)
    })

    const shouldFail = payload.email.toLowerCase().includes('fail')

    if (shouldFail) {
      return {
        status: 'failed',
        message: 'Gagal mengirim inquiry. Silakan coba lagi atau hubungi WhatsApp langsung.',
      }
    }

    return {
      status: 'success',
      message: 'Inquiry berhasil dikirim. Tim kami akan menghubungi Anda secepatnya.',
    }
  }
}

export class ApiContactContentService implements ContactContentService {
  async getContactContent(): Promise<ContactContent> {
    throw new Error('API contact content service is not implemented yet.')
  }

  async submitContactInquiry(payload: ContactInquiryFormData): Promise<ContactInquiryResult> {
    void payload
    throw new Error('API contact inquiry service is not implemented yet.')
  }
}

export function createContactContentService(): ContactContentService {
  const mode = import.meta.env.VITE_CONTACT_CONTENT_MODE

  if (mode === 'api') {
    return new ApiContactContentService()
  }

  return new StaticContactContentService()
}
