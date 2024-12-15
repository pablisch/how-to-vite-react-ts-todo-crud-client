import React, { createContext, useState } from 'react'

const defaultQueryParams: string = ''
const initialQueryParams: string = localStorage.getItem('params') || defaultQueryParams
console.log('Setting params:', initialQueryParams)

export interface ItemQueryParamsContextType {
  params: string
  handleSetQueryParams: (newQueryParams: string) => void
  handleResetQueryParams: () => void
}

export const ItemQueryParamsContext = createContext<ItemQueryParamsContextType>({
  params: initialQueryParams,
  handleSetQueryParams: () => {},
  handleResetQueryParams: () => {},
})

export const ItemQueryParamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setQueryParams] = useState<string>(initialQueryParams)

  const handleSetQueryParams = (newQueryParams: string) => {
    setQueryParams(newQueryParams)
    if (newQueryParams === defaultQueryParams) {
      localStorage.removeItem('params')
    } else {
      localStorage.setItem('params', newQueryParams)
    }
  }

  const handleResetQueryParams = () => {
    setQueryParams(defaultQueryParams)
    localStorage.removeItem('params')
  }

  return (
    <ItemQueryParamsContext.Provider
      value={{
        params,
        handleSetQueryParams,
        handleResetQueryParams,
      }}
    >
      {children}
    </ItemQueryParamsContext.Provider>
  )
}
