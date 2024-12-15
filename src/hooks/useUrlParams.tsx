import { useContext } from 'react'
import { IdParamsContext } from '../context/IdParamsContext.tsx'

export const useUrlParams = () => {
  const context = useContext(IdParamsContext)
  if (!context) {
    throw new Error('useParams must be used within an IdParamsProvider')
  }

  return context
}
