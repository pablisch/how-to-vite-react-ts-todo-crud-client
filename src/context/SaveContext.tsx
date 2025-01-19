import React, { createContext, useEffect, useState } from 'react'
import { StoredUrlsObject } from '../types/types.ts'
import { deployedDefaultUrl, localDefaultUrl } from '../utils/baseUrl.ts'

const defaultUrls = {
  localBase: localDefaultUrl,
  remoteBase: deployedDefaultUrl,
  endpoint: 'samples',
  idParam: '',
  queryParam: '',
}

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
  clearSavedBaseUrls: () => void
  clearAllSavedUrls: () => void
}

export const SaveContext = createContext<SaveContextType>({
  storedUrls: initialSavedUrls,
  handleSaveBaseUrl: () => {},
  clearSavedBaseUrls: () => {},
  clearAllSavedUrls: () => {},
})

export const SaveProvider = ({ children }: { children: React.ReactNode }) => {
  const [storedUrls, setStoredUrls] =
    useState<StoredUrlsObject>(initialSavedUrls)

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

  const clearSavedBaseUrls = () => {
    setStoredUrls(prev => ({ ...prev, base: [] }))
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
        clearSavedBaseUrls,
        clearAllSavedUrls,
      }}
    >
      {children}
    </SaveContext.Provider>
  )
}
