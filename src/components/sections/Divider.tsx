export default function Divider() {
  return (
    <div className="flex items-center justify-center px-6 md:px-12 py-4">
      <div className="flex items-center w-full max-w-2xl mx-auto gap-4">
        <div
          className="flex-1 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(107,190,69,0.4), transparent)' }}
        />
        <div
          className="w-3 h-3 shrink-0"
          style={{ backgroundColor: '#6BBE45', transform: 'rotate(45deg)' }}
        />
        <div
          className="flex-1 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(107,190,69,0.4), transparent)' }}
        />
      </div>
    </div>
  )
}
