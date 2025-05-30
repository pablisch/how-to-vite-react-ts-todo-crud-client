import { useBaseUrl } from '../../hooks/useBaseUrl.tsx'
import UrlForm from './UrlForm.tsx'
import { useSave } from '../../hooks/useSave.tsx'
import { useSaveDisabledUpdater } from '../../hooks/useSaveDisabledUpdater.tsx'
import { defaultUrls } from '../../utils/data.ts'

const BaseUrlForm = () => {
  const {
    baseUrl,
    isLocalApi,
    handleSetBaseUrl,
    handleResetBaseUrl,
    handleToggleApiLocation,
  } = useBaseUrl()
  // const { handleSaveBaseUrl } = useSave()
  const { handleSaveUrlSection, saveDisabled } = useSave()

  const isDefaultBaseUrl = isLocalApi
    ? baseUrl === defaultUrls.localBase
    : baseUrl === defaultUrls.remoteBase
  const sectionKey = isLocalApi ? 'localBase' : 'remoteBase'
  const isSaveDisabled = isLocalApi
    ? saveDisabled.localBase
    : saveDisabled.remoteBase

  useSaveDisabledUpdater(sectionKey)

  return (
    <UrlForm
      id="base-url"
      title="Base URL:"
      placeholder="Enter new base URL"
      defaultUrlValue={baseUrl}
      isDefaultUrlValue={isDefaultBaseUrl}
      onSetUrl={(value: string | undefined) => handleSetBaseUrl(value)}
      onResetUrl={handleResetBaseUrl}
      setUrlBtnText={`Set ${isLocalApi ? 'localhost' : 'remote'} base URL`}
      resetUrlBtnText="Reset base URL"
      additionalButtons={[
        {
          id: 'placeholder id',
          text: isLocalApi ? 'Use deployed API' : 'Use local API',
          onClick: handleToggleApiLocation,
          classNames: ['btn', 'url-btn', isLocalApi ? 'deployed' : 'local'],
        },
      ]}
      saveAlt="save base URL"
      onSave={() => handleSaveUrlSection(baseUrl, sectionKey)}
      value={baseUrl}
      section={sectionKey}
      isDisabled={isSaveDisabled}
    />
  )
}

export default BaseUrlForm
