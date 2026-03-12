export interface NavItem {
  label: string
  href: string
  children?: NavChild[]
}

export interface NavChild {
  label: string
  href: string
  description?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  href: string
  features?: string[]
}

export interface Product {
  id: string
  name: string
  category: string
  material: string
  description: string
  features: string[]
  image?: string
  colors?: string[]
  badge?: string
}

export interface ContactFormData {
  nom: string
  telephone: string
  email: string
  service: string
  message: string
  rgpd: boolean
}

export interface DevisFormData {
  serviceType: string
  productType: string
  quantity: number
  dimensions?: string
  details?: string
  motorisation?: boolean
  nom: string
  telephone: string
  email: string
  codePostal?: string
  message?: string
  rgpd: boolean
}

export interface Testimonial {
  id: string
  name: string
  city: string
  rating: number
  text: string
}
