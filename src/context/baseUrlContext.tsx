import React, { createContext, useEffect, useState } from 'react'

import { deployedDefaultUrl, localDefaultUrl } from '../utils/baseUrl.ts'
const apiSelection = localStorage.getItem('apiSelection') || 'defaultDeployed'
const localStoredUrlValue = localStorage.getItem('localUrl')
const deployedStoredUrlValue = localStorage.getItem('deployedUrl')

let initialBaseUrl: string = deployedDefaultUrl
if (apiSelection && apiSelection.includes('default')) {
  localStorage.removeItem('localUrl')
  localStorage.removeItem('deployedUrl')
  if (apiSelection === 'defaultLocal') {
    initialBaseUrl = localDefaultUrl
  }
} else if (apiSelection && apiSelection.includes('Local')) {
  localStorage.removeItem('deployedUrl')
  if (localStoredUrlValue) initialBaseUrl = localStoredUrlValue
} else if (apiSelection && apiSelection.includes('Deployed')) {
  localStorage.removeItem('localUrl')
  if (deployedStoredUrlValue) initialBaseUrl = deployedStoredUrlValue
}

console.log('Initial apiSelection:', apiSelection)
console.log('localStorage apiSelection:', localStorage.getItem('apiSelection'))
console.log('localStorage localUrl:', localStorage.getItem('localUrl'))
console.log('localStorage deployedUrl:', localStorage.getItem('deployedUrl'))
console.log('initialBaseUrl:', initialBaseUrl)

export interface BaseUrlContextType {
  baseUrl: string
  isLocalApi: boolean
  isDefaultUrlValue: boolean
  handleSetBaseUrl: (baseUrl: string) => void
  handleResetBaseUrl: () => void
  handleToggleApiLocation: () => void
}

export const BaseUrlContext = createContext<BaseUrlContextType>({
  baseUrl: initialBaseUrl || deployedDefaultUrl,
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
  const [baseUrl, setBaseUrl] = useState<string>(
    initialBaseUrl
  )
  const [isLocalApi, setIsLocalApi] = useState<boolean>(
    apiSelection.includes('Local')
  )
  const [localUrl, setLocalUrl] = useState<string | null>(
    localStorage.getItem('localUrl')
  )
  const [deployedUrl, setDeployedUrl] = useState<string | null>(
    localStorage.getItem('deployedUrl')
  )
  const [isDefaultUrlValue, setIsDefaultUrlValueUrlValue] = useState<boolean>(
    apiSelection.includes('default')
  )
  // const [apiSelection, setApiSelection] = useState<string>(storedApiSelection || 'defaultDeployed')

  const handleSetBaseUrl = (newBaseUrl: string) => {
    if (isLocalApi) {
      setLocalUrl(newBaseUrl)
    } else {
      setDeployedUrl(newBaseUrl)
    }
    // console.log(`baseUrl set to ${newBaseUrl}`)
  }

  const handleResetBaseUrl = () => {
    // console.log(`Is local API? ${isLocalApi}`)
    if (isLocalApi) {
      setLocalUrl(null)
      // console.log(`localUrl set to ${null}`)
    } else {
      setDeployedUrl(null)
      // console.log(`deployedUrl set to ${null}`)
    }
  }

  const handleToggleApiLocation = () => {
    setIsLocalApi(!isLocalApi)
  }

  useEffect(() => {
    // console.log(`🌱 API is ${isLocalApi ? 'local' : 'deployed'}`)
    if (isLocalApi) {
      console.log(
        `local URL is being set to ${localUrl ? localUrl : localDefaultUrl}`
      )
      const newLocalUrlValue = localUrl ? localUrl : localDefaultUrl
      setBaseUrl(newLocalUrlValue)
      if (newLocalUrlValue !== localDefaultUrl)
        localStorage.setItem('localUrl', newLocalUrlValue)
    } else {
      console.log(
        `deployed URL is being set to ${deployedUrl ? deployedUrl : deployedDefaultUrl}`
      )
      const newDeployedUrlValue = deployedUrl ? deployedUrl : deployedDefaultUrl
      setBaseUrl(newDeployedUrlValue)
      if (newDeployedUrlValue !== deployedDefaultUrl)
        localStorage.setItem('deployedUrl', newDeployedUrlValue)
    }
  }, [isLocalApi, localUrl, deployedUrl])

  useEffect(() => {
    const defaultUrl = isLocalApi ? localDefaultUrl : deployedDefaultUrl
    if (isDefaultUrlValue && baseUrl !== defaultUrl) {
      setIsDefaultUrlValueUrlValue(false)
    } else if (!isDefaultUrlValue && baseUrl === defaultUrl) {
      setIsDefaultUrlValueUrlValue(true)
    }
  }, [baseUrl])

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
