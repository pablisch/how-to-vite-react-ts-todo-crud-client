import { forwardRef, ReactNode } from 'react'
import './Button.css'

interface ButtonProps {
  children: ReactNode
  ariaLabel?: string
  className?: string
  spanClassName?: string
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  id: string
  disabled?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    ariaLabel = 'button',
    className = 'btn',
    spanClassName = '',
    onClick,
    onMouseEnter,
    onMouseLeave,
    id = '',
    disabled = false,
  }: ButtonProps,
  ref
) {
  return (
    <button
      id={id}
      aria-label={ariaLabel}
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      ref={ref}
    >
      <span className={spanClassName}>{children}</span>
    </button>
  )
})

Button.displayName = 'Button'

export default Button
