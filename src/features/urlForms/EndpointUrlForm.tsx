import UrlForm from './UrlForm.tsx'
import { useEndpoint } from '../../hooks/useEndpoint.tsx'
import { useSave } from '../../hooks/useSave.tsx'
import { useSaveDisabledUpdater } from '../../hooks/useSaveDisabledUpdater.tsx'

const EndpointUrlForm = () => {
  const {
    endpoint,
    isDefaultUrlValue,
    handleSetEndpoint,
    handleResetEndpoint,
  } = useEndpoint()
  const { handleSaveUrlSection, saveDisabled } = useSave()

  useSaveDisabledUpdater('endpoint')

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
