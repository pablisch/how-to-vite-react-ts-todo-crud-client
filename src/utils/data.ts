import { deployedDefaultUrl, localDefaultUrl } from './baseUrl.ts'
import {
  defaultUrlsObject,
  saveDisabledObject,
  StoredUrlsObject,
} from '../types/types.ts'

export const defaultUrls: defaultUrlsObject = {
  localBase: localDefaultUrl,
  remoteBase: deployedDefaultUrl,
  endpoint: '/samples',
  idParams: '',
  queryParams: '',
}

export const defaultSaveDisabledObject: saveDisabledObject = {
  complete: true,
  combined: true,
  base: true,
  endpoint: true,
  idParams: true,
  queryParams: true,
}

export const defaultSavedUrls: StoredUrlsObject = {
  complete: [],
  combined: [],
  base: ['https://jsonplaceholder.typicode.com'],
  endpoint: ['/todos'],
  idParams: [],
  queryParams: [],
}
