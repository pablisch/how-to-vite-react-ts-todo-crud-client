import React, { createContext, useEffect, useState } from 'react'

import { deployedDefaultUrl, localDefaultUrl } from '../utils/baseUrl.ts'

export interface BaseUrlContextType {
  baseUrl: string
  isLocalApi: boolean
  isDefaultUrlValue: boolean
  handleSetBaseUrl: (baseUrl: string) => void
  handleResetBaseUrl: () => void
  handleToggleApiLocation: () => void
}

export const BaseUrlContext = createContext<BaseUrlContextType>({
  baseUrl: deployedDefaultUrl,
  isLocalApi: false,
  isDefaultUrlValue: true,
  handleSetBaseUrl: () => {},
  handleResetBaseUrl: () => {},
  handleToggleApiLocation: () => {},
})

export const BaseUrlProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [baseUrl, setBaseUrl] = useState<string>(deployedDefaultUrl)
  const [isLocalApi, setIsLocalApi] = useState<boolean>(false)
  const [localUrl, setLocalUrl] = useState<string | null>(null)
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null)
  const [isDefaultUrlValue, setIsDefaultUrlValueUrlValue] = useState<boolean>(true)

  const handleSetBaseUrl = (newBaseUrl: string) => {
    if (isLocalApi) {
      setLocalUrl(newBaseUrl)
    } else {
      setDeployedUrl(newBaseUrl)
    }
    console.log(`baseUrl set to ${newBaseUrl}`)
  }

  const handleResetBaseUrl = () => {
    console.log(`Is local API? ${isLocalApi}`)
    if (isLocalApi) {
      setLocalUrl(null)
      console.log(`localUrl set to ${null}`)
    } else {
      setDeployedUrl(null)
      console.log(`deployedUrl set to ${null}`)
    }
  }

  const handleToggleApiLocation = () => {
    setIsLocalApi(!isLocalApi)
  }

  useEffect(() => {
    console.log(`🌱 API is ${isLocalApi ? 'local' : 'deployed'}`)
    if (isLocalApi) {
      console.log(
        `local URL is being set to ${localUrl ? localUrl : localDefaultUrl}`
      )
      setBaseUrl(localUrl ? localUrl : localDefaultUrl)
    } else {
      console.log(
        `deployed URL is being set to ${deployedUrl ? deployedUrl : deployedDefaultUrl}`
      )
      setBaseUrl(deployedUrl ? deployedUrl : deployedDefaultUrl)
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
