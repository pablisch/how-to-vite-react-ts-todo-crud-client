import React, { createContext, useState } from 'react'

const defaultIdParams: string = ''
const initialIdParams: string =
  localStorage.getItem('idParams') || defaultIdParams
console.log('Setting idParams:', initialIdParams)

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
