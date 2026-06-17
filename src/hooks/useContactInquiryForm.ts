import { useMemo, useState } from 'react'

import { createContactInquiryService } from '../services/contact/contactContentService'
import type {
  ContactInquiryFieldErrors,
  ContactInquiryFormData,
  ContactInquiryResult,
} from '../types/contact'

interface ContactInquiryFormState {
  values: ContactInquiryFormData
  errors: ContactInquiryFieldErrors
  isSubmitting: boolean
  submitResult: ContactInquiryResult | null
}

interface UseContactInquiryFormResult extends ContactInquiryFormState {
  setFieldValue: (field: keyof ContactInquiryFormData, value: string) => void
  submitInquiry: () => Promise<void>
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const INITIAL_VALUES: ContactInquiryFormData = {
  name: '',
  companyName: '',
  whatsappNumber: '',
  email: '',
  message: '',
}

export function useContactInquiryForm(): UseContactInquiryFormResult {
  const service = useMemo(() => createContactInquiryService(), [])

  const [values, setValues] = useState<ContactInquiryFormData>(INITIAL_VALUES)
  const [errors, setErrors] = useState<ContactInquiryFieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<ContactInquiryResult | null>(null)

  const setFieldValue = (field: keyof ContactInquiryFormData, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) return current

      const nextErrors = { ...current }
      delete nextErrors[field]
      return nextErrors
    })
    setSubmitResult(null)
  }

  const validate = (): boolean => {
    const nextErrors: ContactInquiryFieldErrors = {}

    if (!values.name.trim()) {
      nextErrors.name = 'Nama wajib diisi.'
    }

    if (!values.companyName.trim()) {
      nextErrors.companyName = 'Nama perusahaan wajib diisi.'
    }

    if (!values.whatsappNumber.trim()) {
      nextErrors.whatsappNumber = 'Nomor WhatsApp wajib diisi.'
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Email wajib diisi.'
    } else if (!EMAIL_REGEX.test(values.email)) {
      nextErrors.email = 'Format email belum valid.'
    }

    if (!values.message.trim()) {
      nextErrors.message = 'Kebutuhan / pesan wajib diisi.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const submitInquiry = async () => {
    setSubmitResult(null)

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await service.submitContactInquiry(values)
      setErrors(result.fieldErrors ?? {})
      setSubmitResult(result)

      if (result.status === 'success') {
        setValues(INITIAL_VALUES)
        setErrors({})
      }
    } catch {
      setSubmitResult({
        status: 'failed',
        message: 'Terjadi kendala saat mengirim inquiry. Silakan coba beberapa saat lagi.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    values,
    errors,
    isSubmitting,
    submitResult,
    setFieldValue,
    submitInquiry,
  }
}
