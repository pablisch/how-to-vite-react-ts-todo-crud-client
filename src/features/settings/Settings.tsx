import Button from '../../components/Button.tsx'
import { useSettings } from '../../hooks/useSettings.tsx'

const Settings = () => {
  const { settings, handleSetUrlSetMode, handleToggleTheme } = useSettings()

  return (
    <div
      className="whole-width-container flex-container border-1"
      id="settings-container"
    >
      <Button
        ariaLabel="set url section setting behaviour"
        id={`set-url-mode`}
        className={`btn url-btn`}
        // disabled={isDefaultUrlValue}
        onClick={handleSetUrlSetMode}
      >
        {`Set URL section ${settings.setUrlOnChange ? 'on submit' : 'as you type'}`}
      </Button>
      <Button
        ariaLabel="toggle the colour theme"
        id={`toggle-theme`}
        className={`btn url-btn ${settings.theme === 'light' ? 'dark' : 'light'}`}
        // disabled={isDefaultUrlValue}
        onClick={handleToggleTheme}
      >
        {`Select ${settings.theme === 'light' ? 'dark' : 'light'} theme`}
      </Button>
    </div>
  )
}

export default Settings
