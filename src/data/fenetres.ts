import type { Product } from '../types'

export const fenetresProducts: Product[] = [
  {
    id: 'fen-pvc-classic',
    name: 'Fenêtre PVC Classique',
    category: 'pvc',
    material: 'PVC',
    description: 'Fenêtre PVC haute isolation avec profilés multi-chambres. Excellent rapport qualité-prix pour une isolation thermique et acoustique optimale.',
    features: ['Double vitrage 4/16/4', 'Profilé 5 chambres', 'Classe A', 'Uw ≤ 1.4 W/m²K'],
    colors: ['#FFFFFF', '#2B2B2B', '#8B7355', '#A0A0A0'],
    image: '/images/fenetres/fenetre-pvc-classic.jpg',
  },
  {
    id: 'fen-pvc-premium',
    name: 'Fenêtre PVC Premium',
    category: 'pvc',
    material: 'PVC',
    description: 'Fenêtre PVC haut de gamme avec triple vitrage et profilés renforcés. Performance énergétique maximale.',
    features: ['Triple vitrage', 'Profilé 7 chambres', 'Joint périphérique', 'Uw ≤ 0.9 W/m²K'],
    colors: ['#FFFFFF', '#2B2B2B', '#556B2F'],
    image: '/images/fenetres/fenetre-pvc-premium.jpg',
  },
  {
    id: 'fen-pvc-coulissante',
    name: 'Baie Coulissante PVC',
    category: 'pvc',
    material: 'PVC',
    description: 'Baie vitrée coulissante PVC pour un maximum de luminosité. Ouverture fluide et silencieuse.',
    features: ['2, 3 ou 4 vantaux', 'Rails aluminium', 'Seuil encastré PMR', 'Grande surface vitrée'],
    colors: ['#FFFFFF', '#2B2B2B'],
    image: '/images/fenetres/baie-coulissante-pvc.jpg',
  },
  {
    id: 'fen-alu-classic',
    name: 'Fenêtre Aluminium',
    category: 'aluminium',
    material: 'Aluminium',
    description: 'Fenêtre aluminium aux lignes fines et modernes. Profilés à rupture de pont thermique pour une isolation performante.',
    features: ['Profilés fins', 'Rupture de pont thermique', 'Large choix RAL', 'Résistance et durabilité'],
    colors: ['#2B2B2B', '#FFFFFF', '#808080', '#556B2F'],
    image: '/images/fenetres/fenetre-alu-classic.jpg',
  },
  {
    id: 'fen-alu-coulissante',
    name: 'Baie Coulissante Aluminium',
    category: 'aluminium',
    material: 'Aluminium',
    description: 'Baie coulissante aluminium grand format. Design épuré avec montants ultra-fins pour une vue panoramique.',
    features: ['Montants ultra-fins', 'Jusqu\'à 6 m de large', 'Seuil PMR disponible', 'Vitrage 28 mm'],
    colors: ['#2B2B2B', '#FFFFFF', '#808080'],
  },
  {
    id: 'fen-bois-tradition',
    name: 'Fenêtre Bois Tradition',
    category: 'bois',
    material: 'Bois',
    description: 'Fenêtre en bois massif pour un charme authentique. Finition laquée ou lasurée au choix.',
    features: ['Bois massif (chêne, pin)', 'Double vitrage', 'Lasure ou peinture', 'Entretien facilité'],
    colors: ['#8B7355', '#DEB887', '#FFFFFF', '#2B2B2B'],
  },
]

export const fenetresCategories = [
  { id: 'all', label: 'Tous' },
  { id: 'pvc', label: 'PVC' },
  { id: 'aluminium', label: 'Aluminium' },
  { id: 'bois', label: 'Bois' },
]
