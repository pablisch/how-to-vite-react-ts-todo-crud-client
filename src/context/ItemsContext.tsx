import React, { createContext, useState } from 'react'
import { UnknownObject } from '../types/types.ts'
import axios from 'axios'
import { useBaseUrl } from '../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../hooks/useEndpoint.tsx'
import { useQueryParams } from '../hooks/useQueryParams.tsx'
import { useIdParams } from '../hooks/useIdParams.tsx'
import apiClient from '../utils/apiClient.ts'
import helpers from '../utils/helpers.tsx'

export interface ItemsContextType {
  items: UnknownObject[]
  singleItem: UnknownObject | null
  getAllItems: () => void
  getAllItemsError: string | null
  getSingleItem: () => void
  getSingleItemError: React.ReactElement | null
  deleteItem: (id: string) => void
  deleteItemError: React.ReactElement | null
  patchUpdateItem: (id: string) => void
  patchUpdateItemError: React.ReactElement | null
  operation: string
  handleChangeOperation: (newOperation: string) => void
}

export const ItemsContext = createContext<ItemsContextType>({
  items: [],
  singleItem: null,
  getAllItems: () => {},
  getAllItemsError: null,
  getSingleItem: () => {},
  getSingleItemError: null,
  deleteItem: () => {},
  deleteItemError: null,
  patchUpdateItem: () => {},
  patchUpdateItemError: null,
  operation: 'getById',
  handleChangeOperation: () => {},
})

export const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<UnknownObject[]>([])
  const [singleItem, setSingleItem] = useState<UnknownObject | null>(null)
  const [getAllItemsError, setGetAllItemError] = useState<string | null>(null)
  const [getSingleItemError, setGetSingleItemError] =
    useState<React.ReactElement | null>(null)
  const [deleteItemError, setDeleteItemError] =
    useState<React.ReactElement | null>(null)
  const [patchUpdateItemError, setPatchUpdateItemError] =
    useState<React.ReactElement | null>(null)
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const { queryParams } = useQueryParams()
  const [operation, setOperation] = useState<string>('getById')

  const getAllItems = async () => {
    setGetAllItemError(null)
    try {
      const response = await axios.get(`${baseUrl}${endpoint}${queryParams}`)
      setItems(response.data)
    } catch (error) {
      console.error('Error fetching item data:', error)
      setGetAllItemError('Failed to fetch data')
    }
  }

  const getSingleItem = async () => {
    console.log('setting operation in getSingleItem to getById')
    setOperation('getById')
    setGetSingleItemError(null)
    try {
      const response = await apiClient.get(
        `${baseUrl}${endpoint}${idParams}${queryParams}`
      )
      setSingleItem(response.data)
      console.log(response)
    } catch (error) {
      const errorMessage: React.ReactElement =
        // @ts-expect-error - The error from the catch block cannot be assigned a type other than any or unknown
        helpers.constructErrorMessage(error)
      setGetSingleItemError(errorMessage)
    }
  }

  const deleteItem = async (id: string) => {
    console.log('setting operation in deleteItem to delete')
    setOperation('delete')
    setDeleteItemError(null)
    try {
      const response = await axios.delete(`${baseUrl}${endpoint}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(response.status, response.data)
    } catch (error) {
      const errorMessage: React.ReactElement =
        // @ts-expect-error - The error from the catch block cannot be assigned a type other than any or unknown
        helpers.constructErrorMessage(error)
      setDeleteItemError(errorMessage)
    }
  }

  const patchUpdateItem = async () => {
    console.log('setting operation in patchUpdateItem to patchUpdate')
    setOperation('patchUpdate')
    setPatchUpdateItemError(null)
    const body = {}
    try {
      const response = await axios.patch(
        `${baseUrl}${endpoint}${idParams}${queryParams}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        }
      )
      console.log(response.status, response.data)
    } catch (error) {
      const errorMessage: React.ReactElement =
        // @ts-expect-error - The error from the catch block cannot be assigned a type other than any or unknown
        helpers.constructErrorMessage(error)
      setPatchUpdateItemError(errorMessage)
    }
  }

  const handleChangeOperation = (newOperation: string) => {
    if (newOperation !== operation) setOperation(newOperation)
  }

  return (
    <ItemsContext.Provider
      value={{
        items,
        singleItem,
        getAllItems,
        getAllItemsError,
        getSingleItem,
        getSingleItemError,
        deleteItem,
        deleteItemError,
        patchUpdateItem,
        patchUpdateItemError,
        operation,
        handleChangeOperation,
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}
