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

const storedSavedUrls = localStorage.getItem('savedUrls')

const initialSavedUrls: StoredUrlsObject = storedSavedUrls
  ? JSON.parse(storedSavedUrls)
  : defaultSavedUrls

export interface SaveContextType {
  storedUrls: StoredUrlsObject
  handleSaveBaseUrl: (value: string) => void
  handleSaveUrlSection: (value: string, section: keyof urlSections) => void
  clearSavedBaseUrls: () => void
  clearSavedSectionUrls: (section: keyof urlSections) => void
  clearAllSavedUrls: () => void
  urlsAreStored: (section: string) => boolean
  saveDisabled: saveDisabledObject
  handleSaveDisabled: (
    value: boolean,
    section: keyof saveDisabledObject
  ) => void
}

export const SaveContext = createContext<SaveContextType>({
  storedUrls: initialSavedUrls,
  handleSaveBaseUrl: () => {},
  handleSaveUrlSection: () => {},
  clearSavedBaseUrls: () => {},
  clearSavedSectionUrls: () => {},
  clearAllSavedUrls: () => {},
  urlsAreStored: () => false,
  saveDisabled: defaultSaveDisabledObject,
  handleSaveDisabled: () => {},
})

export const SaveProvider = ({ children }: { children: React.ReactNode }) => {
  const [storedUrls, setStoredUrls] =
    useState<StoredUrlsObject>(initialSavedUrls)
  const [saveDisabled, setSaveDisabled] = useState<saveDisabledObject>(
    defaultSaveDisabledObject
  )

  const handleSaveDisabled = (
    value: boolean,
    section: keyof saveDisabledObject
  ) => {
    setSaveDisabled(prev => ({
      ...prev,
      [section]: value,
    }))
  }

  const urlsAreStored = (section: string) => {
    const saveUrlsString = localStorage.getItem('savedUrls')
    if (!saveUrlsString) return false
    const savedUrls = JSON.parse(saveUrlsString)
    if (savedUrls[section].length > 0) return true

    return false
  }

  const handleSaveBaseUrl = (
    value: string,
    section: keyof StoredUrlsObject = 'base'
  ) => {
    if (!value) {
      console.log('Do not store empty value')
    } else if (section === 'base' && storedUrls[section].includes(value)) {
      console.log(`${value} is already saved - return`)

      return
    } else if (value === defaultUrls.localBase) {
      console.log(`${value} is default local URL - return`)

      return
    } else if (value === defaultUrls.remoteBase) {
      console.log(`${value} is default remote URL - return`)

      return
    } else {
      setStoredUrls(prev => ({ ...prev, base: [...prev.base, value] }))
      console.log(`${value} is saved`)
    }
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
    localStorage.setItem('savedUrls', JSON.stringify(storedUrls))
  }, [storedUrls])

  return (
    <SaveContext.Provider
      value={{
        storedUrls,
        handleSaveBaseUrl,
        handleSaveUrlSection,
        clearSavedBaseUrls,
        clearSavedSectionUrls,
        clearAllSavedUrls,
        urlsAreStored,
        saveDisabled,
        handleSaveDisabled,
      }}
    >
      {children}
    </SaveContext.Provider>
  )
}
