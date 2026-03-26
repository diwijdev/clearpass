interface Props {
  className?: string
}

function BrandLockup({ className = '' }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      <span className="text-lg font-bold tracking-tighter text-on-surface sm:text-xl">ClearPass</span>
      <img src="/logo-transparent.png" alt="" className="h-7 w-auto shrink-0 sm:h-8" />
    </div>
  )
}

export default BrandLockup
