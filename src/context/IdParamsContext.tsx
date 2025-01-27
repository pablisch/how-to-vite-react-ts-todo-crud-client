import React, { createContext, useState } from 'react'
import { defaultUrls } from '../utils/data.ts'

const defaultIdParams: string = defaultUrls.idParams
const initialIdParams: string =
  localStorage.getItem('idParams') || defaultIdParams

export interface IdParamsContextType {
  idParams: string
  handleSetIdParams: (newIdParams: string) => void
  handleResetIdParams: () => void
}

export const IdParamsContext = createContext<IdParamsContextType>({
  idParams: initialIdParams,
  handleSetIdParams: () => {},
  handleResetIdParams: () => {},
})

export const IdParamsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [idParams, setIdParams] = useState<string>(initialIdParams)

  const handleSetIdParams = (newIdParams: string) => {
    if (!newIdParams) return
    if (newIdParams === '/') {
      handleResetIdParams()

      return
    }
    newIdParams = newIdParams.startsWith('/') ? newIdParams : `/${newIdParams}`
    setIdParams(newIdParams)
    if (newIdParams === defaultIdParams || newIdParams === '/') {
      localStorage.removeItem('idParams')
    } else {
      localStorage.setItem('idParams', newIdParams)
    }
  }

  const handleResetIdParams = () => {
    setIdParams(defaultIdParams)
    localStorage.removeItem('idParams')
  }

  return (
    <IdParamsContext.Provider
      value={{
        idParams,
        handleSetIdParams,
        handleResetIdParams,
      }}
    >
      {children}
    </IdParamsContext.Provider>
  )
}
