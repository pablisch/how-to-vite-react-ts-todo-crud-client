import { createContext, ReactNode, useState } from 'react'

const initialOperation = localStorage.getItem('operation') || 'getById'

export interface OperationContextType {
  operation: string
  handleChangeOperation: (newOperation: string) => void
  handleResetOperation: () => void
  setOperation: (operation: string) => void
}

export const OperationContext = createContext<OperationContextType>({
  operation: initialOperation,
  handleChangeOperation: () => {},
  handleResetOperation: () => {},
  setOperation: () => {},
})

export const OperationProvider = ({ children }: { children: ReactNode }) => {
  const [operation, setOperation] = useState<string>(initialOperation)

  const handleChangeOperation = (newOperation: string) => {
    if (newOperation !== operation) setOperation(newOperation)
  }

  const handleResetOperation = () => {
    if (operation !== 'getById') setOperation('getById')
  }

  return (
    <OperationContext.Provider
      value={{
        operation,
        handleChangeOperation,
        handleResetOperation,
        setOperation,
      }}
    >
      {children}
    </OperationContext.Provider>
  )
}
