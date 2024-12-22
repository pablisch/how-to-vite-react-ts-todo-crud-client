import React, { createContext, useState } from 'react'
import { StatusObject, UnknownObject } from '../types/types.ts'
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
  getItemByIdError: React.ReactElement | null
  deleteItem: (id: string) => void
  deleteItemError: React.ReactElement | null
  updateItem: (id: string) => void
  updateItemError: React.ReactElement | null
  operation: string
  handleChangeOperation: (newOperation: string) => void
  handleResetOperation: () => void
  getItemsStatus: StatusObject
  singleItemStatus: StatusObject
  isPatchUpdate: boolean
  toggleUpdateType: () => void
  loadUpdateForm: () => void
}

export const ItemsContext = createContext<ItemsContextType>({
  items: [],
  singleItem: null,
  getAllItems: () => {},
  getAllItemsError: null,
  getSingleItem: () => {},
  getItemByIdError: null,
  deleteItem: () => {},
  deleteItemError: null,
  updateItem: () => {},
  updateItemError: null,
  operation: 'getById',
  handleChangeOperation: () => {},
  handleResetOperation: () => {},
  getItemsStatus: {},
  singleItemStatus: {},
  isPatchUpdate: true,
  toggleUpdateType: () => {},
  loadUpdateForm: () => {},
})

export const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<UnknownObject[]>([])
  const [singleItem, setSingleItem] = useState<UnknownObject | null>(null)
  const [getAllItemsError, setGetAllItemError] = useState<string | null>(null)
  const [getItemByIdError, setGetItemByIdError] =
    useState<React.ReactElement | null>(null)
  const [deleteItemError, setDeleteItemError] =
    useState<React.ReactElement | null>(null)
  const [updateItemError, setUpdateItemError] =
    useState<React.ReactElement | null>(null)
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const { queryParams } = useQueryParams()
  const [operation, setOperation] = useState<string>('getById')
  const [getItemsStatus, setGetItemsStatus] = useState<StatusObject>({})
  const [singleItemStatus, setSingleItemStatus] = useState<StatusObject>({})
  const [isPatchUpdate, setIsPatchUpdate] = useState<boolean>(true)

  const getAllItems = async () => {
    setGetAllItemError(null)
    try {
      const response = await axios.get(`${baseUrl}${endpoint}${queryParams}`)
      setItems(response.data)
      setGetItemsStatus({
        status: response?.status,
        statusType: helpers.getStatusType(response?.status),
      })
    } catch (error) {
      console.error('Error fetching item data:', error)
      setGetAllItemError('Failed to fetch data')
    }
  }

  const getSingleItem = async () => {
    console.log('setting operation in getSingleItem to getById')
    setOperation('getById')
    setGetItemByIdError(null)
    try {
      const response = await apiClient.get(
        `${baseUrl}${endpoint}${idParams}${queryParams}`
      )
      setSingleItem(response.data)
      setSingleItemStatus({
        status: response?.status,
        statusType: helpers.getStatusType(response?.status),
      })
      console.log(response)
    } catch (error) {
      const errorMessage: React.ReactElement =
        // @ts-expect-error - The error from the catch block cannot be assigned a type other than any or unknown
        helpers.constructErrorMessage(error)
      setGetItemByIdError(errorMessage)
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

  const updateItem = async () => {
    console.log('setting operation in updateItem to update')
    setOperation('update')
    setUpdateItemError(null)
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
      setUpdateItemError(errorMessage)
    }
  }

  const handleChangeOperation = (newOperation: string) => {
    if (newOperation !== operation) setOperation(newOperation)
  }

  const handleResetOperation = () => {
    if (operation !== 'getById') setOperation('getById')
  }

  const toggleUpdateType = () => {
    setIsPatchUpdate(!isPatchUpdate)
  }

  const loadUpdateForm = () => {
    console.log('setting operation in loadUpdateForm')
  }

  return (
    <ItemsContext.Provider
      value={{
        items,
        singleItem,
        getAllItems,
        getAllItemsError,
        getSingleItem,
        getItemByIdError,
        deleteItem,
        deleteItemError,
        updateItem,
        updateItemError,
        operation,
        handleChangeOperation,
        handleResetOperation,
        getItemsStatus,
        singleItemStatus,
        isPatchUpdate,
        toggleUpdateType,
        loadUpdateForm,
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}
