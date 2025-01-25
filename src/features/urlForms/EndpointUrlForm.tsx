import UrlForm from './UrlForm.tsx'
import { useEndpoint } from '../../hooks/useEndpoint.tsx'
import { useSave } from '../../hooks/useSave.tsx'
import { useEffect } from 'react'
import saveHelpers from '../../utils/saveHelpers.ts'

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
    const section = 'endpoint'
    const updateSaveDisabled = saveHelpers.updateSaveDisabled(
      endpoint,
      section,
      saveDisabled,
      storedUrls
    )
    if (updateSaveDisabled === 'true') handleSaveDisabled(true, section)
    if (updateSaveDisabled === 'false') handleSaveDisabled(false, section)
  }, [endpoint, storedUrls.endpoint, saveDisabled.endpoint, handleSaveDisabled])

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
