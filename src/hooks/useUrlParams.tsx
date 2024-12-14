import { useContext } from 'react'
import { ParamsContext } from '../context/ParamsContext.tsx'

export const useUrlParams = () => {
  const context = useContext(ParamsContext)
  if (!context) {
    throw new Error('useParams must be used within an ParamsProvider')
  }

  return context
}
