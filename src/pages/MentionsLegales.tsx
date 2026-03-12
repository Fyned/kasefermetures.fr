import { Helmet } from 'react-helmet-async'
import { SITE_NAME, BASE_URL, PHONE, EMAIL, ADDRESS, OWNER, HEBERGEUR } from '../lib/constants'
import Breadcrumb from '../components/ui/Breadcrumb'

const sections = [
  {
    title: 'Éditeur du site',
    content: [
      `**Raison sociale :** ${SITE_NAME}`,
      `**Responsable de la publication :** ${OWNER}`,
      `**Adresse :** ${ADDRESS.full}`,
      `**Téléphone :** ${PHONE}`,
      `**Email :** ${EMAIL}`,
    ],
  },
  {
    title: 'Hébergeur',
    content: [
      `**Hébergeur :** ${HEBERGEUR}`,
      '**Adresse :** Jonavos g. 60C, Kaunas 44192, Lituanie',
      '**Site web :** https://www.hostinger.fr',
    ],
  },
  {
    title: 'Propriété intellectuelle',
    content: [
      `L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de ${SITE_NAME}, sauf mention contraire. Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces éléments est strictement interdite sans l'accord écrit de ${SITE_NAME}.`,
    ],
  },
  {
    title: 'Protection des données personnelles (RGPD)',
    content: [
      `Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.`,
      `Les données collectées via les formulaires de contact et de devis (nom, email, téléphone, code postal, message) sont utilisées uniquement pour répondre à vos demandes. Elles ne sont ni vendues, ni cédées à des tiers.`,
      `Ces données sont conservées pour une durée maximale de 3 ans à compter de votre dernière interaction avec ${SITE_NAME}.`,
      `Pour exercer vos droits, vous pouvez nous contacter par email à ${EMAIL} ou par courrier à l'adresse ${ADDRESS.full}.`,
    ],
  },
  {
    title: 'Cookies',
    content: [
      `Ce site n'utilise pas de cookies de tracking ou de publicité. Seuls des cookies techniques essentiels au fonctionnement du site peuvent être utilisés.`,
    ],
  },
  {
    title: 'Limitation de responsabilité',
    content: [
      `${SITE_NAME} s'efforce de fournir sur ce site des informations aussi précises que possible. Toutefois, ${SITE_NAME} ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.`,
      `Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres ressources sur Internet ne sauraient engager la responsabilité de ${SITE_NAME}.`,
    ],
  },
  {
    title: 'Droit applicable',
    content: [
      `Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.`,
    ],
  },
]

function renderText(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-kase-anthracite">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

export default function MentionsLegales() {
  return (
    <>
      <Helmet>
        <title>Mentions Légales — {SITE_NAME}</title>
        <meta name="description" content={`Mentions légales du site ${SITE_NAME}. Informations sur l'éditeur, l'hébergeur, la protection des données et les cookies.`} />
        <link rel="canonical" href={`${BASE_URL}/mentions-legales`} />
        <meta property="og:title" content={`Mentions Légales — ${SITE_NAME}`} />
        <meta property="og:description" content={`Mentions légales du site ${SITE_NAME}. Informations sur l'éditeur, l'hébergeur et la protection des données.`} />
        <meta property="og:url" content={`${BASE_URL}/mentions-legales`} />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero */}
      <section className="bg-kase-anthracite py-10 md:py-14">
        <div className="mx-auto max-w-4xl w-full px-4 sm:px-6">
          <Breadcrumb items={[{ label: 'Mentions Légales' }]} />
          <h1 className="mt-4 text-3xl font-bold md:text-4xl font-[Outfit] text-kase-white">
            Mentions Légales
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-4xl w-full px-4 sm:px-6">
          <div className="space-y-10">
            {sections.map((section, idx) => (
              <article key={idx}>
                <h2 className="text-xl font-bold text-kase-anthracite font-[Outfit] mb-4">
                  {idx + 1}. {section.title}
                </h2>
                <div className="space-y-3">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-gray-600 leading-relaxed">
                      {renderText(paragraph)}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 border-t border-gray-200 pt-8 text-center text-sm text-gray-400">
            Dernière mise à jour : mars 2026
          </div>
        </div>
      </section>
    </>
  )
}
