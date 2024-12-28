import '../css/ControlBar.css'
import { useSettings } from '../hooks/useSettings.tsx'

const ControlBar = () => {
  const { handleToggleSettingsMenu } = useSettings()

  return (
    <div className="flex-container border-2" id="control-bar-container">
      <img
        className={`control-icon`}
        onClick={handleToggleSettingsMenu}
        src="/gear.png"
        alt="settings"
      />
    </div>
  )
}

export default ControlBar
