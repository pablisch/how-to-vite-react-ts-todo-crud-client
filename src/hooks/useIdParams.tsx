import { useContext } from 'react'
import { IdParamsContext } from '../context/IdParamsContext.tsx'

export const useIdParams = () => {
  const context = useContext(IdParamsContext)
  if (!context) {
    throw new Error('useIdParams must be used within an IdParamsProvider')
  }

  return context
}
