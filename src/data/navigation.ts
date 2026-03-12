import type { NavItem } from '../types'

export const mainNavItems: NavItem[] = [
  { label: 'Accueil', href: '/' },
  {
    label: 'Fenêtres',
    href: '/fenetres',
    children: [
      { label: 'Fenêtres PVC', href: '/fenetres?cat=pvc', description: 'Isolation thermique optimale' },
      { label: 'Fenêtres Aluminium', href: '/fenetres?cat=aluminium', description: 'Design moderne et robuste' },
      { label: 'Fenêtres Bois', href: '/fenetres?cat=bois', description: 'Charme authentique et naturel' },
    ],
  },
  {
    label: 'Portes',
    href: '/portes',
    children: [
      { label: 'Portes PVC', href: '/portes?cat=pvc', description: 'Rapport qualité-prix optimal' },
      { label: 'Portes Aluminium', href: '/portes?cat=aluminium', description: 'Élégance et sécurité' },
      { label: 'Portes Acier', href: '/portes?cat=acier', description: 'Résistance maximale' },
      { label: 'Portes Bois', href: '/portes?cat=bois', description: 'Chaleur et authenticité' },
    ],
  },
  {
    label: 'Portes de Garage',
    href: '/portes-de-garage',
    children: [
      { label: 'Sectionnelles', href: '/portes-de-garage?cat=sectionnelles', description: 'Gain de place optimal' },
      { label: 'Basculantes', href: '/portes-de-garage?cat=basculantes', description: 'Solution classique et fiable' },
      { label: 'Enroulables', href: '/portes-de-garage?cat=enroulables', description: 'Compacte et pratique' },
    ],
  },
  {
    label: 'Volets',
    href: '/volets',
    children: [
      { label: 'Volets Roulants', href: '/volets?cat=roulants', description: 'Isolation et sécurité' },
      { label: 'Volets Battants', href: '/volets?cat=battants', description: 'Style traditionnel' },
      { label: 'Brise-Soleil (BSO)', href: '/volets?cat=bso', description: 'Protection solaire orientable' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]
