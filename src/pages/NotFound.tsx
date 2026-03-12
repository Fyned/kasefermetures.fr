import { Helmet } from 'react-helmet-async'
import { SITE_NAME } from '../lib/constants'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page introuvable — {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="flex min-h-[70vh] items-center justify-center bg-kase-anthracite px-4">
        <div className="text-center">
          <p className="text-7xl font-black text-kase-green sm:text-8xl md:text-[10rem] font-[Outfit] leading-none">
            404
          </p>
          <h1 className="mt-4 text-2xl font-bold text-kase-white md:text-3xl font-[Outfit]">
            Page introuvable
          </h1>
          <p className="mt-3 text-kase-gray-mid md:text-lg">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-kase-green px-8 py-3.5 font-semibold text-white transition-all hover:bg-kase-green-dark hover:shadow-lg hover:shadow-kase-green/25"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Retour à l'accueil
          </a>
        </div>
      </section>
    </>
  )
}
