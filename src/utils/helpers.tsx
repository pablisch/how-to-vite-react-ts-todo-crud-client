import { ApiErrorObject } from '../types/types.ts'
import React from 'react'

export default {
  constructErrorMessage: function (error: ApiErrorObject): React.ReactElement {
    const status: number | undefined = error?.status
    const message: string | undefined = error?.message

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
          <p>
            <strong>No status property was received from the API.</strong>
          </p>
          <p className="spacer"> </p>
          <p>Error message: {message}</p>

          <p>{responseDetails}</p>
        </>
      )
    }

    if (!message) {
      return (
        <>
          <p>
            <strong>Error status code:</strong> {status}
          </p>
          <p className="spacer"> </p>
          <p className="space-around">
            <strong>No message property was received from the API.</strong>
          </p>
          <p>{responseDetails}</p>
        </>
      )
    }

    return (
      <>
        <p>
          <strong>Error status code:</strong> {status}
        </p>
        <p className="spacer"> </p>
        <p>
          <strong>Error message:</strong> {message}
        </p>
        <p>{responseDetails}</p>
      </>
    )
  },
}
