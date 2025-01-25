import { deployedDefaultUrl, localDefaultUrl } from './baseUrl.ts'
import { saveDisabledObject, StoredUrlsObject } from '../types/types.ts'

export const defaultUrls = {
  localBase: localDefaultUrl,
  remoteBase: deployedDefaultUrl,
  endpoint: '/samples',
  idParam: '',
  queryParam: '',
}

export const defaultSaveDisabledObject: saveDisabledObject = {
  complete: true,
  combined: true,
  base: true,
  endpoint: true,
  idParam: true,
  queryParam: true,
}

export const defaultSavedUrls: StoredUrlsObject = {
  complete: [],
  combined: [],
  base: ["https://jsonplaceholder.typicode.com"],
  endpoint: ["/todos"],
  idParam: [],
  queryParam: [],
}
