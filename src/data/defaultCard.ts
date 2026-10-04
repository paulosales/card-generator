import type { CardData } from '../types'

export function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `card-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export function createDefaultCard(): CardData {
  return {
    id: createId(),
    fullName: 'Alexandre Silva',
    jobTitle: 'Product Designer',
    company: 'Acme Studio',
    email: 'alexandre.silva@acmestudio.com',
    phone: '+55 11 4002-8922',
    whatsapp: '+55 11 99876-5432',
    website: 'https://www.acmestudio.com',
    address: 'São Paulo, SP',
    social: {
      linkedin: 'https://linkedin.com/in/alexandresilva',
      instagram: '',
      twitter: '',
      github: '',
      facebook: '',
    },
    photo: '',
    qr: { value: '', enabled: false },
    template: 'classic',
    primaryColor: '#1d4ed8',
    secondaryColor: '#1e293b',
    fontFamily: 'system',
    updatedAt: new Date().toISOString(),
  }
}
