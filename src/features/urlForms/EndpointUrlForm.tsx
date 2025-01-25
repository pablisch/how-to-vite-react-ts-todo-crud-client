import UrlForm from './UrlForm.tsx'
import { useEndpoint } from '../../hooks/useEndpoint.tsx'
import { useSave } from '../../hooks/useSave.tsx'
import { useEffect } from 'react'
import { defaultUrls } from '../../utils/data.ts'

const EndpointUrlForm = () => {
  const {
    endpoint,
    isDefaultUrlValue,
    handleSetEndpoint,
    handleResetEndpoint,
  } = useEndpoint()
  const { handleSaveUrlSection, saveDisabled, handleSaveDisabled, storedUrls } =
    useSave()
  // const { storedUrls, saveDisabled, handleSaveDisabled } = useSave()
  console.log('****()** endpoint form loading:')

  useEffect(() => {
    const isDefaultEndpoint = endpoint === defaultUrls.endpoint
    console.log(
      `saveDisabled.endpoint: ${saveDisabled.endpoint}, endpoint stored: ${storedUrls.endpoint.includes(endpoint)}, endpoint is default: ${isDefaultEndpoint}`
    )

    if (!saveDisabled.endpoint) {
      if (storedUrls.endpoint.includes(endpoint) || isDefaultEndpoint) {
        handleSaveDisabled(true, 'endpoint')
      }
    } else if (saveDisabled.endpoint) {
      if (!storedUrls.endpoint.includes(endpoint) && !isDefaultEndpoint) {
        handleSaveDisabled(false, 'endpoint')
      }
    }
  }, [endpoint, storedUrls.endpoint, saveDisabled.endpoint, handleSaveDisabled])

  useEffect(() => {
    console.log(
      '****()** ^^^^^^^^^^^^^^^^^^^^^^^^^^ disabled:',
      saveDisabled.endpoint
    )
  }, [saveDisabled])

  return (
    <UrlForm
      id="url-endpoint"
      title="URL endpoint:"
      placeholder="Enter new URL endpoint"
      defaultUrlValue={endpoint}
      isDefaultUrlValue={isDefaultUrlValue}
      onSetUrl={(value: string) => handleSetEndpoint(value)}
      onResetUrl={handleResetEndpoint}
      setUrlBtnText={`Set URL endpoint`}
      resetUrlBtnText="Reset URL endpoint"
      additionalButtons={[]}
      saveAlt="save endpoint URL"
      onSave={() => handleSaveUrlSection(endpoint, 'endpoint')}
      value={endpoint}
      section="endpoint"
      // isDisabled={false}
      isDisabled={saveDisabled.endpoint}
    />
  )
}

export default EndpointUrlForm
