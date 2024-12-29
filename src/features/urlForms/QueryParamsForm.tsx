import UrlForm from './UrlForm.tsx'
import { useQueryParams } from '../../hooks/useQueryParams.tsx'

const QueryParamsForm = () => {
  const {
    queryParams,
    isDefaultUrlValue,
    handleSetQueryParams,
    handleResetQueryParams,
  } = useQueryParams()

  return (
    <UrlForm
      id="id-params"
      title="URL query params:"
      placeholder="Enter new URL endpoint"
      defaultUrlValue={queryParams}
      isDefaultUrlValue={isDefaultUrlValue}
      onSetUrl={(value: string) => handleSetQueryParams(value)}
      onResetUrl={handleResetQueryParams}
      setUrlBtnText={`Set query params`}
      resetUrlBtnText="Reset query params"
      additionalButtons={[]}
    />
  )
}

export default QueryParamsForm
