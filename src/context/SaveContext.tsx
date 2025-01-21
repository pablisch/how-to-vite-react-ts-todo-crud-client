import React, { createContext, useEffect, useState } from 'react'
import { StoredUrlsObject, urlSections } from '../types/types.ts'
import { defaultUrls } from '../utils/data.ts'

const defaultSavedUrls: StoredUrlsObject = {
  complete: [],
  base: [],
  endpoint: [],
  idParam: [],
  queryParam: [],
}

const storedSavedUrls = localStorage.getItem('savedUrls')

const initialSavedUrls: StoredUrlsObject = storedSavedUrls
  ? JSON.parse(storedSavedUrls)
  : defaultSavedUrls

export interface SaveContextType {
  storedUrls: StoredUrlsObject
  handleSaveBaseUrl: (value: string) => void
  handleSaveUrlSection: (section: keyof urlSections, value: string) => void
  clearSavedBaseUrls: () => void
  clearSavedSectionUrls: (section: keyof urlSections) => void
  clearAllSavedUrls: () => void
  urlsAreStored: (section: string) => boolean
}

export const SaveContext = createContext<SaveContextType>({
  storedUrls: initialSavedUrls,
  handleSaveBaseUrl: () => {},
  handleSaveUrlSection: () => {},
  clearSavedBaseUrls: () => {},
  clearSavedSectionUrls: () => {},
  clearAllSavedUrls: () => {},
  urlsAreStored: () => false,
})

export const SaveProvider = ({ children }: { children: React.ReactNode }) => {
  const [storedUrls, setStoredUrls] =
    useState<StoredUrlsObject>(initialSavedUrls)

  const urlsAreStored = (section: string) => {
    const saveUrlsString = localStorage.getItem('savedUrls')
    if (!saveUrlsString) return false
    const savedUrls = JSON.parse(saveUrlsString)
    if (savedUrls[section].length > 0) return true

    return false
  }

  const handleSaveBaseUrl = (value: string) => {
    if (!value) {
      console.log('Do not store empty value')
    } else if (storedUrls.base.includes(value)) {
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

  const handleSaveUrlSection = (section: keyof urlSections, value: string) => {
    console.log(`Default: ${defaultUrls[section]}, value: ${value}, section: ${section}`)
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
    setStoredUrls(prev => ({ ...prev, [section]: [] }))
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
      }}
    >
      {children}
    </SaveContext.Provider>
  )
}
