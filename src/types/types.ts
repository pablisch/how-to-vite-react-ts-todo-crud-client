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
