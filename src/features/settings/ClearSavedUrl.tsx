import { FC } from 'react'
import Button from '../../components/Button.tsx'
import { useSave } from '../../hooks/useSave.tsx'
import { StoredUrlsObject } from '../../types/types.ts'
import './Settings.css'

interface ClearSavedUrlProps {
  onClear: () => void
  section: keyof StoredUrlsObject
  titleText?: string
}

const ClearSavedUrl: FC<ClearSavedUrlProps> = ({
  onClear,
  section,
  titleText,
}) => {
  const { storedUrls } = useSave()

  const hasStored = storedUrls[section].length > 0

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
          {hasStored
            ? `Clear saved ${section} URL sections`
            : `No saved ${section} URLs`}
        </Button>
      </div>
    </div>
  )
}

export default ClearSavedUrl
