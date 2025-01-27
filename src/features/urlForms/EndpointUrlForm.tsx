import UrlForm from './UrlForm.tsx'
import { useEndpoint } from '../../hooks/useEndpoint.tsx'
import { useSave } from '../../hooks/useSave.tsx'
import { useSaveDisabledUpdater } from '../../hooks/useSaveDisabledUpdater.tsx'
import { defaultUrls } from '../../utils/data.ts'

const EndpointUrlForm = () => {
  const { endpoint, handleSetEndpoint, handleResetEndpoint } = useEndpoint()
  const { handleSaveUrlSection, saveDisabled } = useSave()

  const isDefaultEndpoint = endpoint === defaultUrls.endpoint
  const sectionKey = 'endpoint'

  useSaveDisabledUpdater(sectionKey)

  return (
    <UrlForm
      id={`url-${sectionKey}-form`}
      title="URL endpoint:"
      placeholder="Enter new URL endpoint"
      defaultUrlValue={endpoint}
      isDefaultUrlValue={isDefaultEndpoint}
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
