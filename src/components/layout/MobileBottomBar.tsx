import { Link } from 'react-router-dom'
import { PHONE_HREF } from '../../lib/constants'
import { ClipboardIcon, PhoneIcon, MailIcon } from '../../lib/icons'

export default function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-kase-charcoal bg-kase-deep/95 backdrop-blur-sm md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="grid h-[60px] grid-cols-3">
        <Link
          to="/devis-gratuit"
          className="flex flex-col items-center justify-center gap-0.5 bg-kase-green text-white active:bg-kase-green-dark transition-colors"
        >
          <ClipboardIcon className="size-5" />
          <span className="text-[10px] font-medium">Devis gratuit</span>
        </Link>
        <a
          href={PHONE_HREF}
          className="flex flex-col items-center justify-center gap-0.5 text-kase-gray-light active:text-kase-green transition-colors"
        >
          <PhoneIcon className="size-5" />
          <span className="text-[10px] font-medium">Appeler</span>
        </a>
        <Link
          to="/contact"
          className="flex flex-col items-center justify-center gap-0.5 text-kase-gray-light active:text-kase-green transition-colors"
        >
          <MailIcon className="size-5" />
          <span className="text-[10px] font-medium">Contact</span>
        </Link>
      </div>
    </div>
  )
}
