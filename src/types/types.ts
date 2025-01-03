export interface Todo {
  _id: string
  task: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

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
