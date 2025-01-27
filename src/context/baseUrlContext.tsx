import React, { createContext, useEffect, useState } from 'react'

import { defaultUrls } from '../utils/data.ts'
const initialApiSelection: string =
  localStorage.getItem('apiSelection') || 'remote'
const localStoredUrlValue = localStorage.getItem('localUrl')
const deployedStoredUrlValue = localStorage.getItem('deployedUrl')
const initialApiIsLocal = initialApiSelection === 'local'

let initialBaseUrl: string = ''
if (initialApiIsLocal) {
  initialBaseUrl = localStoredUrlValue || defaultUrls.localBase
} else {
  initialBaseUrl = deployedStoredUrlValue || defaultUrls.remoteBase
}

export interface BaseUrlContextType {
  baseUrl: string
  isLocalApi: boolean
  handleSetBaseUrl: (baseUrl: string | undefined) => void
  handleResetBaseUrl: () => void
  handleToggleApiLocation: () => void
}

export const BaseUrlContext = createContext<BaseUrlContextType>({
  baseUrl: initialBaseUrl || defaultUrls.remoteBase,
  isLocalApi: initialApiIsLocal,
  handleSetBaseUrl: () => {},
  handleResetBaseUrl: () => {},
  handleToggleApiLocation: () => {},
})

export const BaseUrlProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [baseUrl, setBaseUrl] = useState<string>(initialBaseUrl)
  const [isLocalApi, setIsLocalApi] = useState<boolean>(initialApiIsLocal)
  const [localUrl, setLocalUrl] = useState<string | null>(
    localStorage.getItem('localUrl')
  )
  const [deployedUrl, setDeployedUrl] = useState<string | null>(
    localStorage.getItem('deployedUrl')
  )

  const handleSetBaseUrl = (newBaseUrl: string | undefined) => {
    if (!newBaseUrl) return
    if (isLocalApi) {
      setLocalUrl(newBaseUrl)
    } else {
      setDeployedUrl(newBaseUrl)
    }
  }

  const handleResetBaseUrl = () => {
    if (isLocalApi) {
      setLocalUrl(null)
    } else {
      setDeployedUrl(null)
    }
  }

  const handleToggleApiLocation = () => {
    setIsLocalApi(!isLocalApi)
  }

  useEffect(() => {
    if (isLocalApi) {
      const newLocalUrlValue = localUrl ? localUrl : defaultUrls.localBase
      setBaseUrl(newLocalUrlValue)
      if (newLocalUrlValue !== defaultUrls.localBase) {
        localStorage.setItem('localUrl', newLocalUrlValue)
      } else {
        localStorage.removeItem('localUrl')
      }
    } else {
      const newDeployedUrlValue = deployedUrl
        ? deployedUrl
        : defaultUrls.remoteBase
      setBaseUrl(newDeployedUrlValue)
      if (newDeployedUrlValue !== defaultUrls.remoteBase) {
        localStorage.setItem('deployedUrl', newDeployedUrlValue)
      } else {
        localStorage.removeItem('deployedUrl')
      }
    }
  }, [isLocalApi, localUrl, deployedUrl])

  useEffect(() => {
    if (isLocalApi) {
      localStorage.setItem('apiSelection', 'local')
    } else {
      localStorage.setItem('apiSelection', 'remote')
    }
  }, [isLocalApi])

  return (
    <BaseUrlContext.Provider
      value={{
        baseUrl,
        isLocalApi,
        handleResetBaseUrl,
        handleSetBaseUrl,
        handleToggleApiLocation,
      }}
    >
      {children}
    </BaseUrlContext.Provider>
  )
}
