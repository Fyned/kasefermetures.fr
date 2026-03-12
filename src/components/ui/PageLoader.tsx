export default function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 animate-spin rounded-full border-3 border-kase-charcoal border-t-kase-green" />
        <p className="text-sm text-kase-gray-mid">Chargement…</p>
      </div>
    </div>
  )
}
