import React, { ReactNode } from 'react'
import './Button.css'

interface ButtonProps {
  children: ReactNode
  ariaLabel?: string
  className?: string
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  id: string
  disabled?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    ariaLabel = 'button',
    className = 'btn',
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
      <span>{children}</span>
    </button>
  )
})

Button.displayName = 'Button'

export default Button
