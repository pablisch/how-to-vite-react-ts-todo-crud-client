import { ApiErrorObject, UnknownObject } from '../types/types.ts'
import React from 'react'

export default {
  processListItemForDisplay: function (item: UnknownObject) {
    const keys = Object.keys(item)

    const idKey = keys.find(key => key === 'id' || key === '_id')
    const idValue = idKey
      ? item[idKey]
      : 'WARNING: This item has no ID property'
    const nameKey = keys.find(
      key => key === 'name' || key === 'firstName' || key === 'fName'
    )
    const lastNameKey = keys.find(key => key === 'lName' || key === 'lastName')

    // Remove id/_id and name keys from the rest
    const otherKeys = keys.filter(
      key => key !== idKey && key !== nameKey && key !== lastNameKey
    )

    // Merge properties in desired order: id/_id -> name -> first 3 of others
    return [
      ...(idKey ? [[idKey, idValue]] : [['id', idValue]]), // Use 'id' for warning message if no idKey is found
      ...(nameKey ? [[nameKey, item[nameKey]]] : []),
      ...(lastNameKey ? [[lastNameKey, item[lastNameKey]]] : []),
      ...otherKeys.map(key => [key, item[key]]), // Limit to the first 2 remaining keys
    ].slice(0, 3)
  },

  constructErrorMessage: function (error: ApiErrorObject): React.ReactElement {
    const status: number | undefined = error?.status
    const message: string | undefined = error?.message
    const statusType = this.getStatusType(status)

    const responseDetails = (
      <>
        <div className="spacer"> </div>
        <div>
          <strong>Response from API:</strong>
        </div>
        <pre className="wrap-text">
          {this.formatObjectAsJsxWithBoldKeys(error)}
        </pre>
      </>
    )

    if (!status && !message) {
      return (
        <>
          <div className={`status-label ${statusType}`}>N/A</div>
          <div className="alert alert-info"></div>
          <div>
            <strong>An unknown error occurred.</strong>
          </div>
          <div className="spacer"></div>
          <div>No status or message properties were received from the API.</div>
          <div>{responseDetails}</div>
        </>
      )
    }

    if (!status) {
      return (
        <>
          <div className={`status-label ${statusType}`}>N/A</div>
          <div>
            <strong>No status property was received from the API.</strong>
          </div>
          <div className="spacer"></div>
          <p>Message: {message}</p>

          <div>{responseDetails}</div>
        </>
      )
    }

    if (!message) {
      return (
        <>
          <div className={`status-label ${statusType}`}>{status}</div>
          <div>
            <strong>Status code:</strong> {status}
          </div>
          <div className="spacer"></div>
          <div className="space-around">
            <strong>No message property was received from the API.</strong>
          </div>
          <div>{responseDetails}</div>
        </>
      )
    }

    return (
      <>
        <div className={`status-label ${statusType}`}>{status}</div>
        <div>
          <strong>Status code:</strong> {status}
        </div>
        <div className="spacer"></div>
        <div>
          <strong>Message:</strong> {message}
        </div>
        <div>{responseDetails}</div>
      </>
    )
  },

  getStatusType: function (status: number | undefined): string {
    let statusType: string | undefined = undefined
    let statusGroup: number | undefined = undefined
    if (status) statusGroup = Math.floor(status / 100)
    if (!status) {
      statusType = 'status-group-none'
    } else if (statusGroup === 1) {
      statusType = 'status-group-info'
    } else if (statusGroup === 2) {
      statusType = 'status-group-ok'
    } else if (statusGroup === 3) {
      statusType = 'status-group-redirect'
    } else if (statusGroup === 4) {
      statusType = 'status-group-error'
    } else if (statusGroup === 5) {
      statusType = 'status-group-server'
    } else {
      statusType = 'unknown'
    }

    return statusType
  },

  formatObjectAsJsxWithBoldKeys: function (
    obj: UnknownObject | ApiErrorObject
  ): React.ReactNode {
    if (typeof obj !== 'object' || obj === null) {
      return <span>{String(obj)}</span>
    }

    return (
      <ul className="single-item-details">
        {Object.entries(obj).map(([key, value]) => (
          <li key={key} className={`display-list`}>
            <span className={`mono-bold`}>{key}</span>:{' '}
            {typeof value === 'object' && value !== null ? (
              this.formatObjectAsJsxWithBoldKeys(
                value as UnknownObject | ApiErrorObject
              ) // Recursively render nested objects
            ) : (
              <span className={`mono pad-left`}>{`${String(value)}`}</span>
            )}
          </li>
        ))}
      </ul>
    )
  },

  ensureLeadingSlash: function (urlSection: string): string {
    return urlSection.startsWith('/') ? urlSection : `/${urlSection}`
  },

  removeLeadingSlash: function (urlSection: string): string {
    return urlSection.replace(/^\//, '')
  },

  isCurrentItem: function (
    currentItem: UnknownObject | UnknownObject[] | undefined,
    id: string
  ): boolean {
    let currentId: string = ''
    if (currentItem && 'id' in currentItem) {
      currentId = currentItem.id
    } else if (currentItem && '_id' in currentItem) {
      currentId = currentItem._id
    }

    return currentId === id
  },

  getIdFromObject: function (object: UnknownObject) {
    if (object && 'id' in object) {
      return object.id
    } else if (object && '_id' in object) {
      return object._id
    } else {
      return Object.values(object)[0]
    }
  },

  idMatchesIdParams(object: UnknownObject, idParams: string) {
    const id: string = this.getIdFromObject(object)
    const params: string = this.removeLeadingSlash(idParams)

    return id === params
  },

  isObjectTypeUnknownObject(object: unknown): object is UnknownObject {
    return typeof object === 'object' && object !== null
  },
}
