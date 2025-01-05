import Button from '../../components/Button.tsx'
import { useSettings } from '../../hooks/useSettings.tsx'

const Settings = () => {
  const { settings, handleSetUrlSetMode } = useSettings()

  return (
    <div
      className="whole-width-container flex-container border-primary"
      id="settings-container"
    >
      <Button
        ariaLabel="set url section setting behaviour"
        id={`set-url-mode`}
        className={`btn url-btn`}
        onClick={handleSetUrlSetMode}
      >
        {`Set URL section ${settings.setUrlOnChange ? 'on submit' : 'as you type'}`}
      </Button>
    </div>
  )
}

export default Settings
