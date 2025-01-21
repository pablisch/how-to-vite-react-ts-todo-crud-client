import React, { createContext, useEffect, useState } from 'react'
import { defaultUrls } from '../utils/data.ts'

const defaultQueryParams: string = defaultUrls.queryParam
const initialQueryParams: string =
  localStorage.getItem('queryParams') || defaultQueryParams

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
  isDefaultUrlValue: initialQueryParams === defaultQueryParams,
})

export const QueryParamsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [queryParams, setQueryParams] = useState<string>(initialQueryParams)
  const [isDefaultUrlValue, setIsDefaultUrlValue] = useState<boolean>(
    initialQueryParams === defaultQueryParams
  )

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

  useEffect(() => {
    if (queryParams === defaultQueryParams && !isDefaultUrlValue) {
      setIsDefaultUrlValue(true)
    } else if (queryParams !== defaultQueryParams && isDefaultUrlValue) {
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
