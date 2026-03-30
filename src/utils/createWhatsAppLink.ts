export function createWhatsAppLink(phoneNumber: string, message: string): string {
  const cleanNumber = phoneNumber.replace(/\D/g, '')
  const encodedMessage = encodeURIComponent(message)

  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`
}
