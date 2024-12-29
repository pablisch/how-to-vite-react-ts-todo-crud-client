import UrlForm from './UrlForm.tsx'
import { useEndpoint } from '../../hooks/useEndpoint.tsx'

const EndpointUrlForm = () => {
  const {
    endpoint,
    isDefaultUrlValue,
    handleSetEndpoint,
    handleResetEndpoint,
  } = useEndpoint()

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
    />
  )
}

export default EndpointUrlForm
