import React, { ReactNode } from 'react'
import '../css/Button.css'

interface ButtonProps {
  children: ReactNode
  ariaLabel?: string
  className?: string
  onClick?: () => void
  id: string
  disabled?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    ariaLabel = 'button',
    className = 'btn',
    onClick,
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
      disabled={disabled}
      ref={ref}
    >
      <span>{children}</span>
    </button>
  )
})

Button.displayName = 'Button'

export default Button
