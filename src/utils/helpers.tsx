import { ApiErrorObject } from '../types/types.ts'
import React from 'react'

export default {
  constructErrorMessage: function (error: ApiErrorObject): React.ReactElement {
    console.log('error:', error)
    const status: number | undefined = error?.status
    const message: string | undefined = error?.message
    const statusType = this.getStatusType(status)
    console.log('status', status, 'type', statusType)

    const responseDetails = (
      <>
        <p className="spacer"> </p>
        <p>
          <strong>Response from API:</strong>
        </p>
        <pre className="wrap-text">{JSON.stringify(error, null, 2)}</pre>
      </>
    )

    console.error('Status:', status)
    console.error('Message:', message)

    if (!status && !message) {
      return (
        <>
          <div className={`status-label ${statusType}`}>{status}</div>
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
          <div className={`status-label ${statusType}`}>{status}</div>
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
    console.log('statusGroup:', statusGroup)
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
}
