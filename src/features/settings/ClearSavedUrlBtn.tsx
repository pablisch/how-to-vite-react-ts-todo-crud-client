import { FC } from 'react'
import Button from '../../components/Button.tsx'
import { useSave } from '../../hooks/useSave.tsx'
import { SavedUrlsObject } from '../../types/types.ts'
import './Settings.css'
import { defaultSavedUrls } from '../../utils/data.ts'

interface ClearSavedUrlProps {
  onClear: () => void
  section: keyof SavedUrlsObject
  titleText?: string
  activeText: string
  disabledText: string
}

const ClearSavedUrlBtn: FC<ClearSavedUrlProps> = ({
  onClear,
  section,
  titleText,
  activeText,
  disabledText,
}) => {
  const { savedUrls } = useSave()

  const hasStored = savedUrls[section].length > defaultSavedUrls[section].length

  return (
    <div
      id={`clear-saved-${section}-url-section-container`}
      className="settings-section flex-container"
    >
      <div className="settings-left-wrapper">
        <h1 className="settings-header">{titleText}</h1>
      </div>
      <div className="settings-right-wrapper">
        <Button
          ariaLabel={`clear saved ${section} urls`}
          id={`clear-saved-${section}-urls-btn`}
          className={`btn url-btn settings-btn ${!hasStored ? 'disabled' : ''}`}
          onClick={onClear}
          disabled={!hasStored}
        >
          {hasStored ? activeText || 'active' : disabledText || 'disabled'}
        </Button>
      </div>
    </div>
  )
}

export default ClearSavedUrlBtn
