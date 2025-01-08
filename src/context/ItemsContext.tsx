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
  items: UnknownObject[] | UnknownObject | undefined
  singleItem: UnknownObject[] | UnknownObject | undefined
  itemToUpdate: UnknownObject | undefined | null
  getAllItems: () => void
  getAllItemsError: React.ReactElement | null
  getSingleItem: () => void
  getItemByIdError: React.ReactElement | null
  deleteItem: (id: string) => void
  deleteItemError: React.ReactElement | null
  deleteResponseData: UnknownObject | null | undefined
  updateItem: (id: string) => void
  updateItemError: React.ReactElement | null
  operation: string
  handleChangeOperation: (newOperation: string) => void
  handleResetOperation: () => void
  getItemsStatus: StatusObject
  singleItemStatus: StatusObject
  deleteStatus: StatusObject
  isPatchUpdate: boolean
  toggleUpdateType: () => void
  loadUpdateForm: (id: string) => void
  handlePerformUpdate: () => void
}

export const ItemsContext = createContext<ItemsContextType>({
  items: undefined,
  singleItem: undefined,
  itemToUpdate: null,
  getAllItems: () => {},
  getAllItemsError: null,
  getSingleItem: () => {},
  getItemByIdError: null,
  deleteItem: () => {},
  deleteItemError: null,
  deleteResponseData: null,
  updateItem: () => {},
  updateItemError: null,
  operation: 'getById',
  handleChangeOperation: () => {},
  handleResetOperation: () => {},
  getItemsStatus: {},
  singleItemStatus: {},
  deleteStatus: {},
  isPatchUpdate: true,
  toggleUpdateType: () => {},
  loadUpdateForm: () => {},
  handlePerformUpdate: () => {},
})

export const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<
    UnknownObject[] | UnknownObject | undefined
  >(undefined)
  const [singleItem, setSingleItem] = useState<
    UnknownObject[] | UnknownObject | undefined
  >(undefined)
  const [itemToUpdate, setItemToUpdate] = useState<
    UnknownObject | null | undefined
  >(null)
  const [deleteMessage, setDeleteMessage] = useState<
    UnknownObject | null | undefined
  >(null)
  const [getAllItemsError, setGetAllItemError] =
    useState<React.ReactElement | null>(null)
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
  const [deleteStatus, setDeleteStatus] = useState<StatusObject>({})
  const [isPatchUpdate, setIsPatchUpdate] = useState<boolean>(true)
  const [abortController, setAbortController] =
    useState<AbortController | null>(null)

  const getAllItems = async () => {
    // Cancel the previous request if it exists
    if (abortController) {
      abortController.abort()
    }

    // Create a new AbortController for the current request
    const controller = new AbortController()
    setAbortController(controller)

    setGetAllItemError(null)
    setItems(undefined)

    try {
      const response = await axios.get(`${baseUrl}${endpoint}${queryParams}`, {
        signal: controller.signal, // Pass the abort signal
      })

      setItems(response.data)
      setGetItemsStatus({
        status: response?.status,
        statusType: helpers.getStatusType(response?.status),
      })
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message)
      } else {
        const errorMessage: React.ReactElement =
          // @ts-expect-error - The error from the catch block cannot be assigned a type other than any or unknown
          helpers.constructErrorMessage(error)
        setGetAllItemError(errorMessage)
      }
    }
  }

  const getSingleItem = async () => {
    setOperation('getById')
    setSingleItem(undefined)
    setGetItemByIdError(null)
    if (!idParams) return
    try {
      const response = await apiClient.get(
        `${baseUrl}${endpoint}${idParams}${queryParams}`
      )
      setSingleItem(response.data)
      setSingleItemStatus({
        status: response?.status,
        statusType: helpers.getStatusType(response?.status),
      })
    } catch (error) {
      const errorMessage: React.ReactElement =
        // @ts-expect-error - The error from the catch block cannot be assigned a type other than any or unknown
        helpers.constructErrorMessage(error)
      setGetItemByIdError(errorMessage)
    }
  }

  const deleteItem = async (id: string) => {
    setDeleteMessage(null)
    setOperation('delete')
    setDeleteItemError(null)
    try {
      const response = await axios.delete(`${baseUrl}${endpoint}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(
        '****()** - AVOID ERRORS - delete response in itemsContext:',
        response
      )
      // if (typeof response?.data?.message === 'string')
      setDeleteMessage(response.data)
      setDeleteStatus({
        status: response?.status,
        statusType: helpers.getStatusType(response?.status),
      })
      await getAllItems()
    } catch (error) {
      const errorMessage: React.ReactElement =
        // @ts-expect-error - The error from the catch block cannot be assigned a type other than any or unknown
        helpers.constructErrorMessage(error)
      setDeleteItemError(errorMessage)
    }
  }

  const updateItem = async () => {
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
      console.log(
        '****()** - AVOID ERRORS - update response in itemsContext:',
        response.data
      )
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

  const loadUpdateForm = (id: string) => {
    setOperation('update')

    if (items && items.length)
      setItemToUpdate(items.find(item => item._id === id || item.id === id))
  }

  const handlePerformUpdate = () => {
    console.log(
      'placeholder for actually updating depending on if patch or put'
    )
  }

  return (
    <ItemsContext.Provider
      value={{
        items,
        singleItem,
        itemToUpdate,
        getAllItems,
        getAllItemsError,
        getSingleItem,
        getItemByIdError,
        deleteItem,
        deleteItemError,
        deleteResponseData: deleteMessage,
        updateItem,
        updateItemError,
        operation,
        handleChangeOperation,
        handleResetOperation,
        getItemsStatus,
        singleItemStatus,
        deleteStatus,
        isPatchUpdate,
        toggleUpdateType,
        loadUpdateForm,
        handlePerformUpdate,
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}
