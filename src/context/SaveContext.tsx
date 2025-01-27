import React, { createContext, useEffect, useState } from 'react'
import {
  saveDisabledObject,
  StoredUrlsObject,
  urlSections,
} from '../types/types.ts'
import {
  defaultSaveDisabledObject,
  defaultSavedUrls,
  defaultUrls,
} from '../utils/data.ts'

const storedSavedUrls = localStorage.getItem('storedSavedUrls')

const initialSavedUrls: StoredUrlsObject = storedSavedUrls
  ? JSON.parse(storedSavedUrls)
  : defaultSavedUrls

export interface SaveContextType {
  storedUrls: StoredUrlsObject
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
  storedUrls: initialSavedUrls,
  handleSaveUrlSection: () => {},
  clearSavedBaseUrls: () => {},
  clearSavedSectionUrls: () => {},
  clearAllSavedUrls: () => {},
  urlsAreStored: () => false,
  saveDisabled: defaultSaveDisabledObject,
  handleUpdateSaveDisabled: () => {},
})

export const SaveProvider = ({ children }: { children: React.ReactNode }) => {
  const [storedUrls, setStoredUrls] =
    useState<StoredUrlsObject>(initialSavedUrls)
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
    const saveUrlsString = localStorage.getItem('storedSavedUrls')
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
    } else if (storedUrls[section].includes(value)) {
      console.log(`${value} is already saved - return`)

      return
    } else if (value === defaultUrls[section]) {
      console.log(`${value} is default ${section} URL - return`)

      return
    } else {
      setStoredUrls(prev => ({ ...prev, [section]: [...prev[section], value] }))
      console.log(`${value} is saved`)
    }
  }

  const clearSavedBaseUrls = () => {
    setStoredUrls(prev => ({ ...prev, base: [] }))
  }

  const clearSavedSectionUrls = (section: keyof urlSections) => {
    setStoredUrls(prev => ({ ...prev, [section]: defaultSavedUrls[section] }))
  }

  const clearAllSavedUrls = () => {
    setStoredUrls(defaultSavedUrls)
  }

  useEffect(() => {
    localStorage.setItem('storedSavedUrls', JSON.stringify(storedUrls))
  }, [storedUrls])

  return (
    <SaveContext.Provider
      value={{
        storedUrls,
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
