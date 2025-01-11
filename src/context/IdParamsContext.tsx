import React, { createContext, useEffect, useState } from 'react'

const defaultIdParams: string = ''
const initialIdParams: string =
  localStorage.getItem('idParams') || defaultIdParams

export interface IdParamsContextType {
  idParams: string
  handleSetIdParams: (newIdParams: string) => void
  handleResetIdParams: () => void
  isDefaultUrlValue: boolean
}

export const IdParamsContext = createContext<IdParamsContextType>({
  idParams: initialIdParams,
  handleSetIdParams: () => {},
  handleResetIdParams: () => {},
  isDefaultUrlValue: initialIdParams === defaultIdParams,
})

export const IdParamsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [idParams, setIdParams] = useState<string>(initialIdParams)
  const [isDefaultUrlValue, setIsDefaultUrlValue] = useState<boolean>(
    initialIdParams === defaultIdParams
  )

  const handleSetIdParams = (newIdParams: string) => {
    if (!newIdParams) return
    newIdParams = newIdParams.startsWith('/') ? newIdParams : `/${newIdParams}`
    setIdParams(newIdParams)
    if (newIdParams === defaultIdParams) {
      localStorage.removeItem('idParams')
    } else {
      localStorage.setItem('idParams', newIdParams)
    }
  }

  const handleResetIdParams = () => {
    setIdParams(defaultIdParams)
    localStorage.removeItem('idParams')
  }

  useEffect(() => {
    if (idParams === defaultIdParams && !isDefaultUrlValue) {
      setIsDefaultUrlValue(true)
    } else if (idParams !== defaultIdParams && isDefaultUrlValue) {
      setIsDefaultUrlValue(false)
    }
  }, [idParams, isDefaultUrlValue])

  return (
    <IdParamsContext.Provider
      value={{
        idParams,
        handleSetIdParams,
        handleResetIdParams,
        isDefaultUrlValue,
      }}
    >
      {children}
    </IdParamsContext.Provider>
  )
}
