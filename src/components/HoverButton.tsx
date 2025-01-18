import { forwardRef, ReactNode, useState } from 'react'
import './Button.css'

interface ButtonProps {
  children: ReactNode
  ariaLabel?: string
  classNames?: string[]
  spanClassName?: string
  onClick?: () => void
  id: string
  disabled?: boolean
}

const HoverButton = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    ariaLabel = 'button',
    classNames = ['btn'],
    spanClassName = '',
    onClick,
    id = '',
    disabled = false,
  }: ButtonProps,
  ref
) {
  const [hovered, setHovered] = useState<boolean>(false)

  const handleHoverStart = () => {
    setHovered(true)
  }

  const handleHoverEnd = () => {
    setHovered(false)
  }

  return (
    <button
      id={id}
      aria-label={ariaLabel}
      className={[...classNames, hovered ? 'btn-hovered' : ''].join(' ')}
      onClick={onClick}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      disabled={disabled}
      ref={ref}
    >
      <span className={spanClassName}>{children}</span>
    </button>
  )
})

HoverButton.displayName = 'Button'

export default HoverButton
