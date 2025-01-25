import { useSettings } from '../hooks/useSettings.tsx'
import { FC } from 'react'
import { StoredUrlsObject, urlSections } from '../types/types.ts'

interface SaveButtonProps {
  onSave: (
    value: string,
    section: keyof urlSections | keyof StoredUrlsObject
  ) => void
  alt: string
  classNames?: string[]
  value?: string
  section: keyof urlSections | keyof StoredUrlsObject
  isDisabled: boolean
}

const SaveButton: FC<SaveButtonProps> = ({
  onSave,
  alt,
  classNames = ['save-btn-icon'],
  value = '',
  section,
  isDisabled,
}) => {
  const { settings } = useSettings()

  const buttonClassNames = [
    ...classNames,
    settings.theme === 'dark' ? 'save-btn-icon-dark' : '',
    isDisabled ? 'save-btn-disabled' : 'ENABLED',
  ].join(' ')

  return (
    <button
      className={buttonClassNames}
      onClick={() => !isDisabled && onSave(value, section)}
      disabled={isDisabled}
      aria-label={alt}
    />
  )
}

export default SaveButton

// import { useSettings } from '../hooks/useSettings.tsx'
// import { FC } from 'react'
//
// interface SaveButtonProps {
//   onSave: (value: string) => void
//   alt: string
//   classNames?: string[]
//   value?: string | undefined
//   isDisabled?: boolean
// }
//
// const SaveButton: FC<SaveButtonProps> = ({
//   onSave,
//   alt = '',
//   classNames = ['save-btn-icon'],
//   value = '',
//   isDisabled = false,
// }) => {
//   const { settings } = useSettings()
//   console.log('value...', value)
//
//   classNames = [
//     ...classNames,
//     settings.theme === 'dark' ? 'save-btn-icon-dark' : '',
//   ]
//
//   return (
//     <img
//       src="/floppy-save.png"
//       alt={alt}
//       className={classNames.join(' ')}
//       onClick={() => onSave(value)}
//       // disabled={isDisabled}
//     />
//   )
// }
//
// export default SaveButton
