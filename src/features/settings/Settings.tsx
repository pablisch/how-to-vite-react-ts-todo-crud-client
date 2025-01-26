import Button from '../../components/Button.tsx'
import { useSettings } from '../../hooks/useSettings.tsx'
import './Settings.css'
import { useSave } from '../../hooks/useSave.tsx'
import ClearSavedUrlBtn from './ClearSavedUrlBtn.tsx'

const Settings = () => {
  const { settings, handleSetUrlSetMode } = useSettings()
  const { clearSavedSectionUrls } = useSave()

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
      <ClearSavedUrlBtn
        onClear={() => clearSavedSectionUrls('remoteBase')}
        section="remoteBase"
        titleText="Clear saved URL entries for each section (clears local storage):"
        activeText="Clear saved remote base URLs"
        disabledText="No saved remote base URLs"
      />
      <ClearSavedUrlBtn
        onClear={() => clearSavedSectionUrls('localBase')}
        section="localBase"
        activeText="Clear saved local base URLs"
        disabledText="No saved local base URLs"
      />
      <ClearSavedUrlBtn
        onClear={() => clearSavedSectionUrls('endpoint')}
        section="endpoint"
        activeText="Clear saved URL enpoints"
        disabledText="No saved URL enpoints"
      />
      <ClearSavedUrlBtn
        onClear={() => clearSavedSectionUrls('idParams')}
        section="idParams"
        activeText="Clear saved ID params"
        disabledText="No saved ID params"
      />
      <ClearSavedUrlBtn
        onClear={() => clearSavedSectionUrls('queryParams')}
        section="queryParams"
        activeText="Clear saved query params"
        disabledText="No saved query params"
      />
    </div>
  )
}

export default Settings
