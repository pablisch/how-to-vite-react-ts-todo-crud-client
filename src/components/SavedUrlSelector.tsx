import { useSettings } from '../hooks/useSettings.tsx'
import { FC } from 'react'
import { SavedUrlsObject, urlSections } from '../types/types.ts'

interface SavedUrlSelectorProps {
  onSave: (
    value: string,
    section: keyof urlSections | keyof SavedUrlsObject
  ) => void
  alt: string
  classNames?: string[]
  value?: string
  section: keyof urlSections | keyof SavedUrlsObject
  isDisabled: boolean
}

const SavedUrlSelector: FC<SavedUrlSelectorProps> = ({
  onSave,
  alt,
  classNames = ['saved-url-dropdown-icon'],
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
    <>
      <button
        className={buttonClassNames}
        onClick={() => !isDisabled && onSave(value, section)}
        disabled={isDisabled}
        aria-label={alt}
      />
      {/*<div className="dropdown">*/}
      {/*  <select>*/}
      {/*    <option>Option One</option>*/}
      {/*    <option>Option Two</option>*/}
      {/*    <option>Option Three</option>*/}
      {/*  </select>*/}
      {/*</div>*/}
    </>
  )
}

export default SavedUrlSelector
