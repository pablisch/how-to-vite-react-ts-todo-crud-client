import React, { createContext, useState } from 'react'

const defaultParams: string = ''
const initialParams: string = localStorage.getItem('params') || defaultParams
console.log('Setting params:', initialParams)

export interface ParamsContextType {
  params: string
  handleSetParams: (newParams: string) => void
  handleResetParams: () => void
}

export const ParamsContext = createContext<ParamsContextType>({
  params: initialParams,
  handleSetParams: () => {},
  handleResetParams: () => {},
})

export const ParamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useState<string>(initialParams)

  const handleSetParams = (newParams: string) => {
    console.log('in set params function with:', newParams)
    setParams(newParams)
    if (newParams === defaultParams) {
      localStorage.removeItem('params')
    } else {
      localStorage.setItem('params', newParams)
    }
  }

  const handleResetParams = () => {
    setParams(defaultParams)
    localStorage.removeItem('params')
  }

  return (
    <ParamsContext.Provider
      value={{
        params,
        handleSetParams,
        handleResetParams,
      }}
    >
      {children}
    </ParamsContext.Provider>
  )
}
