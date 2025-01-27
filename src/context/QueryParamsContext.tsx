import React, { createContext, useState } from 'react'
import { defaultUrls } from '../utils/data.ts'
import helpers from '../utils/helpers.tsx'

const initialQueryParams: string =
  localStorage.getItem('queryParams') || defaultUrls.queryParams

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
    if (newQueryParams === '?') {
      handleResetQueryParams()

      return
    }
    newQueryParams = newQueryParams.startsWith('?')
      ? newQueryParams
      : `?${newQueryParams}`
    setQueryParams(newQueryParams)
    if (
      newQueryParams === defaultUrls.queryParams ||
      !helpers.isValidQueryString(newQueryParams)
    ) {
      localStorage.removeItem('queryParams')
    } else {
      localStorage.setItem('queryParams', newQueryParams)
    }
  }

  const handleResetQueryParams = () => {
    setQueryParams(defaultUrls.queryParams)
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
