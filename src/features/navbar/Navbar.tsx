import './Navbar.css'
import { useSettings } from '../../hooks/useSettings.tsx'

const Navbar = () => {
  const { handleToggleSettingsMenu, settings, handleToggleTheme } =
    useSettings()

  return (
    <nav id="navbar">
      <div className="flex-container border-2" id="navbar-container">
        <h1 className={`nav-title`}>crud client</h1>
        <div className={`nav-controls`}>
          <img
            className={`control-icon inner-icon ${settings.theme === 'dark' ? 'dark-mode-icon' : 'light-mode-icon'}`}
            onClick={handleToggleTheme}
            src="/colour-bulb-light-3.png"
            // src="/colour-bulb-light-2.png"
            alt="settings"
          />
          <img
            className={`control-icon ${settings.theme === 'dark' ? 'invert' : ''}`}
            onClick={handleToggleSettingsMenu}
            src="/gear.png"
            alt="settings"
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
