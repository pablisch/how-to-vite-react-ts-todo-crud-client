import { createContext, ReactNode, useState } from 'react'

const initialOperation = localStorage.getItem('operation') || 'getById'

export interface OperationContextType {
  operation: string
  setOperation: (operation: string) => void
}

export const OperationContext = createContext<OperationContextType>({
  operation: initialOperation,
  setOperation: () => {},
})

export const OperationProvider = ({ children }: { children: ReactNode }) => {
  const [operation, setOperation] = useState<string>(initialOperation)

  return (
    <OperationContext.Provider
      value={{
        operation,
        setOperation,
      }}
    >
      {children}
    </OperationContext.Provider>
  )
}
