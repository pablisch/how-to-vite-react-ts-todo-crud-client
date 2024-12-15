import { useContext } from 'react'
import { QueryParamsContext } from '../context/QueryParamsContext.tsx'

export const useQueryParams = () => {
  const context = useContext(QueryParamsContext)
  if (!context) {
    throw new Error('useQueryParams must be used within an QueryParamsProvider')
  }

  return context
}
