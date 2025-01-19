import { useSettings } from '../hooks/useSettings.tsx'
import { FC } from 'react'

interface SaveButtonProps {
  onSave: () => void
  alt: string
  classNames?: string[]
}

const SaveButton: FC<SaveButtonProps> = ({
  onSave,
  alt = '',
  classNames = ['save-btn-icon'],
}) => {
  const { settings } = useSettings()

  classNames = [
    ...classNames,
    settings.theme === 'dark' ? 'save-btn-icon-dark' : '',
  ]

  return (
    <img
      src="/floppy-save.png"
      alt={alt}
      className={classNames.join(' ')}
      onClick={onSave}
    />
  )
}

export default SaveButton
