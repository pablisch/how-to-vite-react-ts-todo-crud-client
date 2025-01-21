import React, { createContext, useEffect, useState } from 'react'

import { defaultUrls } from '../utils/data.ts'
const apiSelection = localStorage.getItem('apiSelection') || 'defaultDeployed'
const localStoredUrlValue = localStorage.getItem('localUrl')
const deployedStoredUrlValue = localStorage.getItem('deployedUrl')

let initialBaseUrl: string = defaultUrls.remoteBase
if (apiSelection && apiSelection.includes('default')) {
  localStorage.removeItem('localUrl')
  localStorage.removeItem('deployedUrl')
  if (apiSelection === 'defaultLocal') {
    initialBaseUrl = defaultUrls.localBase
  }
} else if (apiSelection && apiSelection.includes('Local')) {
  localStorage.removeItem('deployedUrl')
  if (localStoredUrlValue) initialBaseUrl = localStoredUrlValue
} else if (apiSelection && apiSelection.includes('Deployed')) {
  localStorage.removeItem('localUrl')
  if (deployedStoredUrlValue) initialBaseUrl = deployedStoredUrlValue
}

export interface BaseUrlContextType {
  baseUrl: string
  isLocalApi: boolean
  isDefaultUrlValue: boolean
  handleSetBaseUrl: (baseUrl: string | undefined) => void
  handleResetBaseUrl: () => void
  handleToggleApiLocation: () => void
}

export const BaseUrlContext = createContext<BaseUrlContextType>({
  baseUrl: initialBaseUrl || defaultUrls.remoteBase,
  isLocalApi: apiSelection.includes('Local'),
  isDefaultUrlValue: apiSelection.includes('default'),
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
  const [isLocalApi, setIsLocalApi] = useState<boolean>(
    apiSelection.includes('Local')
  )
  const [localUrl, setLocalUrl] = useState<string | null>(
    localStorage.getItem('localUrl')
  )
  const [deployedUrl, setDeployedUrl] = useState<string | null>(
    localStorage.getItem('deployedUrl')
  )
  const [isDefaultUrlValue, setIsDefaultUrlValue] = useState<boolean>(
    apiSelection.includes('default')
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
      if (newLocalUrlValue !== defaultUrls.localBase)
        localStorage.setItem('localUrl', newLocalUrlValue)
    } else {
      const newDeployedUrlValue = deployedUrl ? deployedUrl : defaultUrls.remoteBase
      setBaseUrl(newDeployedUrlValue)
      if (newDeployedUrlValue !== defaultUrls.remoteBase)
        localStorage.setItem('deployedUrl', newDeployedUrlValue)
    }
  }, [isLocalApi, localUrl, deployedUrl])

  useEffect(() => {
    const defaultUrl = isLocalApi ? defaultUrls.localBase : defaultUrls.remoteBase
    if (isDefaultUrlValue && baseUrl !== defaultUrl) {
      setIsDefaultUrlValue(false)
    } else if (!isDefaultUrlValue && baseUrl === defaultUrl) {
      setIsDefaultUrlValue(true)
    }
  }, [baseUrl, isDefaultUrlValue, isLocalApi])

  useEffect(() => {
    if (isLocalApi) {
      localStorage.setItem(
        'apiSelection',
        isDefaultUrlValue ? 'defaultLocal' : 'customLocal'
      )
    } else {
      localStorage.setItem(
        'apiSelection',
        isDefaultUrlValue ? 'defaultDeployed' : 'customDeployed'
      )
    }
  }, [isLocalApi, isDefaultUrlValue])

  return (
    <BaseUrlContext.Provider
      value={{
        baseUrl,
        isLocalApi,
        isDefaultUrlValue,
        handleResetBaseUrl,
        handleSetBaseUrl,
        handleToggleApiLocation,
      }}
    >
      {children}
    </BaseUrlContext.Provider>
  )
}
