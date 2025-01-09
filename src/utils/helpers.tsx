import { ApiErrorObject, UnknownObject } from '../types/types.ts'
import React from 'react'

export default {
  constructErrorMessage: function (error: ApiErrorObject): React.ReactElement {
    const status: number | undefined = error?.status
    const message: string | undefined = error?.message
    const statusType = this.getStatusType(status)

    const responseDetails = (
      <>
        <p className="spacer"> </p>
        <p>
          <strong>Response from API:</strong>
        </p>
        <pre className="wrap-text">
          {this.formatObjectAsJsxWithBoldKeys(error)}
        </pre>
        {/*<pre className="wrap-text">{JSON.stringify(error, null, 2)}</pre>*/}
      </>
    )

    if (!status && !message) {
      return (
        <>
          <div className={`status-label ${statusType}`}>N/A</div>
          <div className="alert alert-info"></div>
          <p>
            <strong>An unknown error occurred.</strong>
          </p>
          <p className="spacer"></p>
          <p>No status or message properties were received from the API.</p>
          <p>{responseDetails}</p>
        </>
      )
    }

    if (!status) {
      return (
        <>
          <div className={`status-label ${statusType}`}>N/A</div>
          <p>
            <strong>No status property was received from the API.</strong>
          </p>
          <p className="spacer"></p>
          <p>Message: {message}</p>

          <p>{responseDetails}</p>
        </>
      )
    }

    if (!message) {
      return (
        <>
          <div className={`status-label ${statusType}`}>{status}</div>
          <p>
            <strong>Status code:</strong> {status}
          </p>
          <p className="spacer"></p>
          <p className="space-around">
            <strong>No message property was received from the API.</strong>
          </p>
          <p>{responseDetails}</p>
        </>
      )
    }

    return (
      <>
        <div className={`status-label ${statusType}`}>{status}</div>
        <p>
          <strong>Status code:</strong> {status}
        </p>
        <p className="spacer"></p>
        <p>
          <strong>Message:</strong> {message}
        </p>
        <p>{responseDetails}</p>
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
          <li key={key}>
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
}
