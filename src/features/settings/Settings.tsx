import Button from '../../components/Button.tsx'
import { useSettings } from '../../hooks/useSettings.tsx'
import './Settings.css'
import { useSave } from '../../hooks/useSave.tsx'
import ClearSavedUrl from './ClearSavedUrl.tsx'

const Settings = () => {
  const { settings, handleSetUrlSetMode } = useSettings()
  const { clearSavedBaseUrls, clearSavedSectionUrls } = useSave()

  return (
    <div
      className="whole-width-container flex-container border-primary"
      id="settings-container"
    >
      <div className="set-url-options-container settings-section flex-container">
        <div className="settings-left-wrapper">
          <h1 className="set-url-options-header settings-header">
            Choose if URL sections are set as you type or only on submission:
          </h1>
        </div>
        <div className="settings-right-wrapper">
          <Button
            ariaLabel="set url section setting behaviour"
            id={`set-url-mode`}
            className={`btn url-btn settings-btn`}
            onClick={handleSetUrlSetMode}
          >
            {`Set URL section ${settings.setUrlOnChange ? 'on submit' : 'as you type'}`}
          </Button>
        </div>
      </div>
      <ClearSavedUrl
        onClear={clearSavedBaseUrls}
        section="base"
        titleText="Clear saved URL entries for each section (clears local storage):"
      />
      <ClearSavedUrl
        onClear={() => clearSavedSectionUrls('endpoint')}
        section="endpoint"
      />
      <ClearSavedUrl
        onClear={() => clearSavedSectionUrls('idParam')}
        section="idParam"
      />
      <ClearSavedUrl
        onClear={() => clearSavedSectionUrls('queryParam')}
        section="queryParam"
      />
    </div>
  )
}

export default Settings
