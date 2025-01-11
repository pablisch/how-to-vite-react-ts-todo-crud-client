import React, { createContext, useState } from 'react'
import { StatusObject, UnknownObject } from '../types/types.ts'
import axios from 'axios'
import { useBaseUrl } from '../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../hooks/useEndpoint.tsx'
import { useQueryParams } from '../hooks/useQueryParams.tsx'
import { useIdParams } from '../hooks/useIdParams.tsx'
import apiClient from '../utils/apiClient.ts'
import helpers from '../utils/helpers.tsx'
import { useOperation } from '../hooks/useOperation.tsx'

export interface ItemsContextType {
  items: UnknownObject[] | UnknownObject | undefined
  singleItem: UnknownObject[] | UnknownObject | undefined
  itemToUpdate: UnknownObject | undefined | null
  getAllItems: () => void
  getAllItemsError: React.ReactElement | null
  getSingleItem: (
    // changeOperation: boolean | undefined,
    id: string | undefined
  ) => void
  getItemByIdError: React.ReactElement | null
  startDeleteItem: (id: string) => void
  deleteItem: (id: string) => void
  deleteItemError: React.ReactElement | null
  deleteResponseData: UnknownObject | null | undefined
  updateItem: (id: string) => void
  updateItemError: React.ReactElement | null
  getItemsStatus: StatusObject
  singleItemStatus: StatusObject
  deleteStatus: StatusObject
  isPatchUpdate: boolean
  toggleUpdateType: () => void
  loadUpdateForm: (id: string) => void
  handlePerformUpdate: () => void
  itemId: string | undefined
  setItemId: (id: string) => void
}

export const ItemsContext = createContext<ItemsContextType>({
  items: undefined,
  singleItem: undefined,
  itemToUpdate: null,
  getAllItems: () => {},
  getAllItemsError: null,
  getSingleItem: () => {},
  getItemByIdError: null,
  startDeleteItem: () => {},
  deleteItem: () => {},
  deleteItemError: null,
  deleteResponseData: null,
  updateItem: () => {},
  updateItemError: null,
  getItemsStatus: {},
  singleItemStatus: {},
  deleteStatus: {},
  isPatchUpdate: true,
  toggleUpdateType: () => {},
  loadUpdateForm: () => {},
  handlePerformUpdate: () => {},
  itemId: undefined,
  setItemId: () => {},
})

export const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleChangeOperation } = useOperation()
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
  const { idParams, handleSetIdParams } = useIdParams()
  const { queryParams } = useQueryParams()
  const [getItemsStatus, setGetItemsStatus] = useState<StatusObject>({})
  const [singleItemStatus, setSingleItemStatus] = useState<StatusObject>({})
  const [deleteStatus, setDeleteStatus] = useState<StatusObject>({})
  const [isPatchUpdate, setIsPatchUpdate] = useState<boolean>(true)
  const [abortController, setAbortController] =
    useState<AbortController | null>(null)
  const [itemId, setItemId] = useState<string | undefined>(undefined)

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

  const getSingleItem = async (id: string | undefined = idParams) => {
    const isCurrentItem = helpers.isCurrentItem(singleItem, id)
    console.log('****()** isCurrentItem:', isCurrentItem)
    if (isCurrentItem) return
    setSingleItem(undefined)
    setGetItemByIdError(null)
    if (!id) return
    id = helpers.ensureLeadingSlash(id)
    try {
      const response = await apiClient.get(
        `${baseUrl}${endpoint}${id}${queryParams}`
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

  const startDeleteItem = async (id: string) => {
    console.log('deleteProcess:', id)
    handleChangeOperation('delete')

    const isCurrentItem = helpers.isCurrentItem(singleItem, id)

    if (!isCurrentItem) {
      handleSetIdParams(id)
      await getSingleItem(id)
    }
  }

  const deleteItem = async (id: string) => {
    setDeleteMessage(null)
    setDeleteItemError(null)
    try {
      const response = await axios.delete(`${baseUrl}${endpoint}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setDeleteMessage(response.data)
      setDeleteStatus({
        status: response?.status,
        statusType: helpers.getStatusType(response?.status),
      })
      setItemId(undefined)
      await getAllItems()
    } catch (error) {
      const errorMessage: React.ReactElement =
        // @ts-expect-error - The error from the catch block cannot be assigned a type other than any or unknown
        helpers.constructErrorMessage(error)
      setDeleteItemError(errorMessage)
    }
  }

  const updateItem = async () => {
    handleChangeOperation('update')
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

  const toggleUpdateType = () => {
    setIsPatchUpdate(!isPatchUpdate)
  }

  const loadUpdateForm = (id: string) => {
    handleChangeOperation('update')

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
        startDeleteItem,
        deleteItem,
        deleteItemError,
        deleteResponseData: deleteMessage,
        updateItem,
        updateItemError,
        getItemsStatus,
        singleItemStatus,
        deleteStatus,
        isPatchUpdate,
        toggleUpdateType,
        loadUpdateForm,
        handlePerformUpdate,
        itemId,
        setItemId,
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}
