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
  deleteItemError: string | null
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
})

export const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<UnknownObject[]>([])
  const [singleItem, setSingleItem] = useState<UnknownObject | null>(null)
  const [getAllItemsError, setGetAllItemError] = useState<string | null>(null)
  const [getSingleItemError, setGetSingleItemError] =
    useState<React.ReactElement | null>(null)
  const [deleteItemError, setDeleteItemError] = useState<string | null>(null)
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const { queryParams } = useQueryParams()

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
    setGetSingleItemError(null)
    try {
      const response = await apiClient.get(
        `${baseUrl}${endpoint}${idParams}${queryParams}`
      )
      setSingleItem(response.data)
      console.log(response)
    } catch (error) {
      // @ts-expect-error - The error from the catch block cannot be assigned a type other than any or unknown
      const errorMessage: React.ReactElement =
        helpers.constructErrorMessage(error)
      setGetSingleItemError(errorMessage)
    }

    // try {
    //   const response = await axios.get(
    //     `${baseUrl}${endpoint}${idParams}${queryParams}`
    //   )
    //   setSingleItem(response.data)
    // } catch (error) {
    //   console.error(
    //     `Error fetching single item data for item: ${idParams}`,
    //     error
    //   )
    //   setGetSingleItemError(
    //     `Failed to fetch data for item with ID: ${idParams}`
    //   )
    // }
  }

  // const getSingleItem = async () => {
  //   setGetSingleItemError(null)
  //   try {
  //     const response = await axios.get(
  //       `${baseUrl}${endpoint}${idParams}${queryParams}`
  //     )
  //     setSingleItem(response.data)
  //   } catch (error) {
  //     console.error(
  //       `Error fetching single item data for item: ${idParams}`,
  //       error
  //     )
  //     setGetSingleItemError(
  //       `Failed to fetch data for item with ID: ${idParams}`
  //     )
  //   }
  // }

  const deleteItem = async (id: string) => {
    setDeleteItemError(null)
    try {
      const response = await axios.delete(`${baseUrl}${endpoint}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(response.status, response.data)
    } catch (error) {
      console.error(error)
      setDeleteItemError(`Failed to delete item: ${id}`)
    }
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
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}
