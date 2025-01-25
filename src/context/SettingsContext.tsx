import React, { createContext, useEffect, useState } from 'react'
import { Settings } from '../types/types.ts'

const defaultSettings: Settings = {
  setUrlOnChange: true,
  theme: 'dark',
}

const storedSettings = localStorage.getItem('storedSettings')

const initialSettings: Settings = storedSettings
  ? JSON.parse(storedSettings)
  : defaultSettings

export interface SettingsContextType {
  settings: Settings
  menuIsOpen: boolean
  handleSetUrlSetMode: () => void
  handleResetSettings: () => void
  handleToggleSettingsMenu: () => void
  handleToggleTheme: () => void
}

export const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  menuIsOpen: false,
  handleSetUrlSetMode: () => {},
  handleResetSettings: () => {},
  handleToggleSettingsMenu: () => {},
  handleToggleTheme: () => {},
})

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [settings, setSettings] = useState<Settings>(initialSettings)
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  const handleSetUrlSetMode = () => {
    setSettings({
      ...settings,
      setUrlOnChange: !settings.setUrlOnChange,
    })
  }

  const handleResetSettings = () => {
    setSettings(defaultSettings)
  }

  const handleToggleSettingsMenu = () => {
    setMenuIsOpen(!menuIsOpen)
  }

  const handleToggleTheme = () => {
    const theme: string = settings.theme === 'light' ? 'dark' : 'light'
    setSettings({
      ...settings,
      theme: theme,
    })
  }

  useEffect(() => {
    localStorage.setItem('storedSettings', JSON.stringify(settings))
  }, [settings])

  return (
    <SettingsContext.Provider
      value={{
        settings,
        menuIsOpen,
        handleSetUrlSetMode,
        handleResetSettings,
        handleToggleSettingsMenu,
        handleToggleTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
