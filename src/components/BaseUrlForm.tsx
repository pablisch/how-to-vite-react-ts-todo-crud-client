import { useBaseUrl } from '../hooks/useBaseUrl.tsx'
import UrlForm from './UrlForm.tsx'

const BaseUrlForm = () => {
  const {
    baseUrl,
    isDefaultUrlValue,
    isLocalApi,
    handleSetBaseUrl,
    handleResetBaseUrl,
    handleToggleApiLocation,
  } = useBaseUrl()

  return (
    <UrlForm
      id="base-url"
      title="Base URL:"
      placeholder="Enter new base URL"
      defaultUrlValue={baseUrl}
      isDefaultUrlValue={isDefaultUrlValue}
      onSetUrl={(value: string | undefined) => handleSetBaseUrl(value)}
      onResetUrl={handleResetBaseUrl}
      setUrlBtnText={`Set ${isLocalApi ? 'localhost' : 'remote'} base URL`}
      resetUrlBtnText="Reset base URL"
      additionalButtons={[
        {
          id: 'placeholder id',
          text: isLocalApi ? 'Use deployed API' : 'Use local API',
          onClick: handleToggleApiLocation,
          className: `btn url-btn ${isLocalApi ? 'deployed' : 'local'}`,
        },
      ]}
    />
  )
}

export default BaseUrlForm
