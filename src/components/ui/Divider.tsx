export default function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-8 ${className}`} role="separator">
      <span className="h-px w-16 bg-kase-charcoal" />
      <span className="size-1.5 rotate-45 bg-kase-green" />
      <span className="h-px w-16 bg-kase-charcoal" />
    </div>
  )
}
