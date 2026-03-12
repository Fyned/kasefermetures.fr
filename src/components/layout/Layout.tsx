import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import MobileBottomBar from './MobileBottomBar'
import FloatingSidebar from './FloatingSidebar'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-kase-deep text-kase-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-kase-green focus:px-4 focus:py-2 focus:text-white">
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content" className="pt-14 md:pt-[168px] pb-[60px] md:pb-0">
          <Outlet />
        </main>
        <Footer />
        <MobileBottomBar />
        <FloatingSidebar />
      </div>
    </>
  )
}
