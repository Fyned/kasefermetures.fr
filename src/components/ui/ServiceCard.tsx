import { Link } from 'react-router-dom'
import { ChevronRightIcon, WindowIcon, DoorIcon, GarageIcon, ShutterIcon } from '../../lib/icons'
import type { Service } from '../../types'

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  window: WindowIcon,
  door: DoorIcon,
  garage: GarageIcon,
  shutter: ShutterIcon,
}

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || WindowIcon

  return (
    <Link
      to={service.href}
      className="group block bg-kase-light rounded-2xl p-6 md:p-8 border border-transparent hover:border-kase-green/40 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="w-12 h-12 rounded-xl bg-kase-green/15 flex items-center justify-center mb-5 group-hover:bg-kase-green/25 transition-colors">
        <Icon className="text-kase-green" size={24} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
      <p className="text-kase-gray-mid text-sm leading-relaxed mb-4">{service.description}</p>
      <span className="inline-flex items-center gap-1 text-kase-green text-sm font-medium group-hover:gap-2 transition-all">
        Découvrir <ChevronRightIcon size={16} />
      </span>
    </Link>
  )
}
