import React, { createContext, useEffect, useState } from 'react'

import { deployedDefaultUrl, localDefaultUrl } from '../utils/baseUrl.ts'

export interface BaseUrlContextType {
  baseUrl: string
  defaultBaseUrl: string
  isLocalApi: boolean
  handleSetBaseUrl: (baseUrl: string) => void
  handleResetBaseUrl: () => void
  handleToggleApiLocation: () => void
}

export const BaseUrlContext = createContext<BaseUrlContextType>({
  baseUrl: deployedDefaultUrl,
  defaultBaseUrl: deployedDefaultUrl,
  isLocalApi: false,
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
  const [defaultBaseUrl, setDefaultBaseUrl] =
    useState<string>(deployedDefaultUrl)

  const handleSetBaseUrl = (newBaseUrl: string) => {
    setBaseUrl(newBaseUrl)
    console.log(`baseUrl set to ${newBaseUrl}`)
  }

  const handleResetBaseUrl = () => {
    setBaseUrl(deployedDefaultUrl)
    console.log(`baseUrl set to ${deployedDefaultUrl}`)
  }

  const handleToggleApiLocation = () => {
    setIsLocalApi(!isLocalApi)
  }

  useEffect(() => {
    console.log(`API is ${isLocalApi ? 'local' : 'deployed'}`)
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

  return (
    <BaseUrlContext.Provider
      value={{
        baseUrl,
        defaultBaseUrl,
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
