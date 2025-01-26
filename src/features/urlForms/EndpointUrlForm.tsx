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

  const sectionKey = 'endpoint'

  useSaveDisabledUpdater(sectionKey)

  return (
    <UrlForm
      id={`url-${sectionKey}-form`}
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
      onSave={() => handleSaveUrlSection(endpoint, sectionKey)}
      value={endpoint}
      section={sectionKey}
      isDisabled={saveDisabled.endpoint}
    />
  )
}

export default EndpointUrlForm
