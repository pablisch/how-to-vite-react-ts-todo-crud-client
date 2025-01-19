import { useSettings } from '../hooks/useSettings.tsx'
import { FC } from 'react'

interface SaveButtonProps {
  onSave: (value: string) => void
  alt: string
  classNames?: string[]
  value?: string | undefined
}

const SaveButton: FC<SaveButtonProps> = ({
  onSave,
  alt = '',
  classNames = ['save-btn-icon'],
  value = '',
}) => {
  const { settings } = useSettings()
  console.log('value...', value)

  classNames = [
    ...classNames,
    settings.theme === 'dark' ? 'save-btn-icon-dark' : '',
  ]

  return (
    <img
      src="/floppy-save.png"
      alt={alt}
      className={classNames.join(' ')}
      onClick={() => onSave(value)}
    />
  )
}

export default SaveButton
