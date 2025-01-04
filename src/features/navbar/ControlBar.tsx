import './ControlBar.css'
import { useSettings } from '../../hooks/useSettings.tsx'

const ControlBar = () => {
  const { handleToggleSettingsMenu, settings } = useSettings()

  return (
    <div className="flex-container border-2" id="control-bar-container">
      <img
        className={`control-icon ${settings.theme === "dark" ? "invert" : ""}`}
        onClick={handleToggleSettingsMenu}
        src="/gear.png"
        alt="settings"
      />
    </div>
  )
}

export default ControlBar
