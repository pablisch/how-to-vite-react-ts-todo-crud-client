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
  localBase: true,
  remoteBase: true,
  endpoint: true,
  idParams: true,
  queryParams: true,
}

export const defaultSavedUrls: StoredUrlsObject = {
  complete: [],
  combined: [],
  // base: [],
  localBase: ['http://localhost:3000/'],
  remoteBase: ['https://jsonplaceholder.typicode.com'],
  endpoint: ['/todos'],
  idParams: [],
  queryParams: [],
}

export const sections = {
  complete: 'complete',
  combined: 'combined',
  localBase: 'localBase',
  remoteBase: 'remoteBase',
  base: 'base',
  endpoint: 'endpoint',
  idParams: 'idParams',
  queryParams: 'queryParams',
}
