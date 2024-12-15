import React, { createContext, useState } from 'react'

const defaultQueryParams: string = ''
const initialQueryParams: string =
  localStorage.getItem('queryParams') || defaultQueryParams
console.log('Setting queryParams:', initialQueryParams)

export interface QueryParamsContextType {
  queryParams: string
  handleSetQueryParams: (newQueryParams: string) => void
  handleResetQueryParams: () => void
}

export const QueryParamsContext = createContext<QueryParamsContextType>({
  queryParams: initialQueryParams,
  handleSetQueryParams: () => {},
  handleResetQueryParams: () => {},
})

export const QueryParamsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [queryParams, setQueryParams] = useState<string>(initialQueryParams)

  const handleSetQueryParams = (newQueryParams: string) => {
    if (!newQueryParams) return
    newQueryParams = newQueryParams.startsWith('?')
      ? newQueryParams
      : `?${newQueryParams}`
    setQueryParams(newQueryParams)
    if (newQueryParams === defaultQueryParams) {
      localStorage.removeItem('queryParams')
    } else {
      localStorage.setItem('queryParams', newQueryParams)
    }
  }

  const handleResetQueryParams = () => {
    setQueryParams(defaultQueryParams)
    localStorage.removeItem('queryParams')
  }

  return (
    <QueryParamsContext.Provider
      value={{
        queryParams,
        handleSetQueryParams,
        handleResetQueryParams,
      }}
    >
      {children}
    </QueryParamsContext.Provider>
  )
}
