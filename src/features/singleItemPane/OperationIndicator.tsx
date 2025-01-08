import './OperationIndicator.css'
import { forwardRef, ReactNode, useState } from 'react'

interface OperationIndicatorProps {
  children: ReactNode
  ariaLabel?: string
  classNames?: string[]
  hoverClass: string
  onClick?: () => void
  id: string
  disabled?: boolean
}

const OperationIndicator = forwardRef<
  HTMLButtonElement,
  OperationIndicatorProps
>(function OperationIndicator(
  {
    children,
    ariaLabel = 'button',
    classNames = ['btn'],
    hoverClass,
    onClick,
    id = '',
    disabled = false,
  }: OperationIndicatorProps,
  ref
) {
  const [hovered, setHovered] = useState(false)

  const handleHoverStart = () => setHovered(true)
  const handleHoverEnd = () => setHovered(false)

  const combinedClasses = [
    ...classNames,
    ...(hovered ? [hoverClass] : []),
  ].join(' ')

  return (
    <button
      id={id}
      aria-label={ariaLabel}
      className={combinedClasses}
      onClick={onClick}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      disabled={disabled}
      ref={ref}
    >
      <span>{children}</span>
    </button>
  )
})

export default OperationIndicator
