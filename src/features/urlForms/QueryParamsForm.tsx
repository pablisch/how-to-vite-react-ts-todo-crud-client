import UrlForm from './UrlForm.tsx'
import { useQueryParams } from '../../hooks/useQueryParams.tsx'
import { useSave } from '../../hooks/useSave.tsx'

const QueryParamsForm = () => {
  const {
    queryParams,
    isDefaultUrlValue,
    handleSetQueryParams,
    handleResetQueryParams,
  } = useQueryParams()
  const { handleSaveUrlSection } = useSave()

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
      saveAlt="save endpoint URL"
      onSave={() => handleSaveUrlSection('queryParam', queryParams)}
      value={queryParams}
    />
  )
}

export default QueryParamsForm
