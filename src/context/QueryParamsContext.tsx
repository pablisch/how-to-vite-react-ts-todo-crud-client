import React, { createContext, useEffect, useState } from 'react'
import { defaultUrls } from '../utils/data.ts'

const initialQueryParams: string =
  localStorage.getItem('queryParams') || defaultUrls.queryParams

export interface QueryParamsContextType {
  queryParams: string
  handleSetQueryParams: (newQueryParams: string) => void
  handleResetQueryParams: () => void
  isDefaultUrlValue: boolean
}

export const QueryParamsContext = createContext<QueryParamsContextType>({
  queryParams: initialQueryParams,
  handleSetQueryParams: () => {},
  handleResetQueryParams: () => {},
  isDefaultUrlValue: initialQueryParams === defaultUrls.queryParams,
})

export const QueryParamsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [queryParams, setQueryParams] = useState<string>(initialQueryParams)
  const [isDefaultUrlValue, setIsDefaultUrlValue] = useState<boolean>(
    initialQueryParams === defaultUrls.queryParams
  )

  const handleSetQueryParams = (newQueryParams: string) => {
    if (!newQueryParams) return
    newQueryParams = newQueryParams.startsWith('?')
      ? newQueryParams
      : `?${newQueryParams}`
    setQueryParams(newQueryParams)
    if (newQueryParams === defaultUrls.queryParams) {
      localStorage.removeItem('queryParams')
    } else {
      localStorage.setItem('queryParams', newQueryParams)
    }
  }

  const handleResetQueryParams = () => {
    setQueryParams(defaultUrls.queryParams)
    localStorage.removeItem('queryParams')
  }

  useEffect(() => {
    if (queryParams === defaultUrls.queryParams && !isDefaultUrlValue) {
      setIsDefaultUrlValue(true)
    } else if (queryParams !== defaultUrls.queryParams && isDefaultUrlValue) {
      setIsDefaultUrlValue(false)
    }
  }, [queryParams])

  return (
    <QueryParamsContext.Provider
      value={{
        queryParams,
        handleSetQueryParams,
        handleResetQueryParams,
        isDefaultUrlValue,
      }}
    >
      {children}
    </QueryParamsContext.Provider>
  )
}
