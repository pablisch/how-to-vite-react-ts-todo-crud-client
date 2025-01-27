import React, { createContext, useEffect, useState } from 'react'
import {
  saveDisabledObject,
  SavedUrlsObject,
  urlSections,
} from '../types/types.ts'
import {
  defaultSaveDisabledObject,
  defaultSavedUrls,
  defaultUrls,
} from '../utils/data.ts'

const savedUrlsInLocalStorage = localStorage.getItem('storedUrls')

const initialSavedUrls: SavedUrlsObject = savedUrlsInLocalStorage
  ? JSON.parse(savedUrlsInLocalStorage)
  : defaultSavedUrls

export interface SaveContextType {
  savedUrls: SavedUrlsObject
  handleSaveUrlSection: (value: string, section: keyof urlSections) => void
  clearSavedBaseUrls: () => void
  clearSavedSectionUrls: (section: keyof urlSections) => void
  clearAllSavedUrls: () => void
  urlsAreStored: (section: string) => boolean
  saveDisabled: saveDisabledObject
  handleUpdateSaveDisabled: (
    value: boolean,
    section: keyof saveDisabledObject
  ) => void
}

export const SaveContext = createContext<SaveContextType>({
  savedUrls: initialSavedUrls,
  handleSaveUrlSection: () => {},
  clearSavedBaseUrls: () => {},
  clearSavedSectionUrls: () => {},
  clearAllSavedUrls: () => {},
  urlsAreStored: () => false,
  saveDisabled: defaultSaveDisabledObject,
  handleUpdateSaveDisabled: () => {},
})

export const SaveProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedUrls, setSavedUrls] = useState<SavedUrlsObject>(initialSavedUrls)
  const [saveDisabled, setSaveDisabled] = useState<saveDisabledObject>(
    defaultSaveDisabledObject
  )

  const handleUpdateSaveDisabled = (
    value: boolean,
    section: keyof saveDisabledObject
  ) => {
    setSaveDisabled(prev => ({
      ...prev,
      [section]: value,
    }))
  }

  const urlsAreStored = (section: string) => {
    const saveUrlsString = localStorage.getItem('storedUrls')
    if (!saveUrlsString) return false
    const savedUrlsInLocalStorage = JSON.parse(saveUrlsString)
    if (savedUrlsInLocalStorage[section].length > 0) return true

    return false
  }

  const handleSaveUrlSection = (value: string, section: keyof urlSections) => {
    console.log(
      `Default: ${defaultUrls[section]}, value: ${value}, section: ${section}`
    )
    if (!value) {
      console.log('Do not store empty value')
    } else if (savedUrls[section].includes(value)) {
      console.log(`${value} is already saved - return`)

      return
    } else if (value === defaultUrls[section]) {
      console.log(`${value} is default ${section} URL - return`)

      return
    } else {
      setSavedUrls(prev => ({ ...prev, [section]: [...prev[section], value] }))
      console.log(`${value} is saved`)
    }
  }

  const clearSavedBaseUrls = () => {
    setSavedUrls(prev => ({ ...prev, base: [] }))
  }

  const clearSavedSectionUrls = (section: keyof urlSections) => {
    setSavedUrls(prev => ({ ...prev, [section]: defaultSavedUrls[section] }))
  }

  const clearAllSavedUrls = () => {
    setSavedUrls(defaultSavedUrls)
  }

  useEffect(() => {
    localStorage.setItem('storedUrls', JSON.stringify(savedUrls))
  }, [savedUrls])

  return (
    <SaveContext.Provider
      value={{
        savedUrls,
        handleSaveUrlSection,
        clearSavedBaseUrls,
        clearSavedSectionUrls,
        clearAllSavedUrls,
        urlsAreStored,
        saveDisabled,
        handleUpdateSaveDisabled,
      }}
    >
      {children}
    </SaveContext.Provider>
  )
}
