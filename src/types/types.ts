export interface UnknownObject {
  [key: string]: never
}

export interface ApiErrorObject {
  status?: number
  message?: string
  [key: string]: unknown
}

export interface StatusObject {
  status?: number
  statusType?: string
}

export interface Settings {
  setUrlOnChange: boolean
  theme: string
}

export interface IsHoveredObject {
  item: boolean
  view: boolean
  create: boolean
  delete: boolean
  update: boolean
}

export interface itemClassesObject {
  item: string[]
  view: string[]
  create: string[]
  delete: string[]
  update: string[]
}

export interface StoredUrlsObject {
  complete: string[]
  combined: combinedUrlObject[]
  localBase: string[]
  remoteBase: string[]
  endpoint: string[]
  idParams: string[]
  queryParams: string[]
}

export interface urlSections {
  localBase: string
  remoteBase: string
  endpoint: string
  idParams: string
  queryParams: string
}

interface combinedUrlObject {
  localBase: string
  remoteBase: string
  endpoint: string
  idParam: string
  queryParams: string
}

export interface defaultUrlsObject {
  localBase: string
  remoteBase: string
  endpoint: string
  idParams: string
  queryParams: string
}

export interface saveDisabledObject {
  complete: boolean
  combined: boolean
  localBase: boolean
  remoteBase: boolean
  endpoint: boolean
  idParams: boolean
  queryParams: boolean
}

export interface urlSectionsObject {
  complete: string
  combined: combinedUrlObject
  localBase: string
  remoteBase: string
  base: string
  endpoint: string
  idParams: string
  queryParams: string
}
