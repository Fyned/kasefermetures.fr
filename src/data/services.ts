import type { Service } from '../types'

export const services: Service[] = [
  {
    id: 'fenetres',
    title: 'Fenêtres',
    description: 'Fenêtres PVC, aluminium et bois sur mesure. Isolation thermique et acoustique optimale avec double et triple vitrage.',
    icon: 'window',
    href: '/fenetres',
    features: ['PVC, aluminium, bois', 'Double et triple vitrage', 'Sur mesure', 'Haute isolation'],
  },
  {
    id: 'portes',
    title: 'Portes d\'entrée',
    description: 'Portes d\'entrée en aluminium, PVC, acier et bois. Sécurité renforcée avec serrures multipoints et design personnalisé.',
    icon: 'door',
    href: '/portes',
    features: ['Aluminium, PVC, acier, bois', 'Serrures multipoints', 'Design personnalisé', 'Sécurité renforcée'],
  },
  {
    id: 'portes-garage',
    title: 'Portes de Garage',
    description: 'Portes de garage sectionnelles, basculantes et enroulables. Motorisation et télécommande disponibles.',
    icon: 'garage',
    href: '/portes-de-garage',
    features: ['Sectionnelles, basculantes, enroulables', 'Motorisation', 'Isolation thermique', 'Nombreux coloris'],
  },
  {
    id: 'volets',
    title: 'Volets',
    description: 'Volets roulants, volets battants et brise-soleil orientables (BSO). Motorisation et commande à distance.',
    icon: 'shutter',
    href: '/volets',
    features: ['Volets roulants et battants', 'Brise-soleil orientables', 'Motorisation Somfy', 'Large choix de coloris'],
  },
]
