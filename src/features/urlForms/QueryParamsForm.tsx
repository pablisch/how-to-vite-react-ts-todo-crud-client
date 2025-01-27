import UrlForm from './UrlForm.tsx'
import { useQueryParams } from '../../hooks/useQueryParams.tsx'
import { useSave } from '../../hooks/useSave.tsx'
import { useSaveDisabledUpdater } from '../../hooks/useSaveDisabledUpdater.tsx'
import { defaultUrls } from '../../utils/data.ts'

const QueryParamsForm = () => {
  const { queryParams, handleSetQueryParams, handleResetQueryParams } =
    useQueryParams()
  const { handleSaveUrlSection, saveDisabled } = useSave()

  const isDefaultQueryParams = queryParams === defaultUrls.queryParams
  const sectionKey = 'queryParams'

  useSaveDisabledUpdater(sectionKey)

  return (
    <UrlForm
      id={`url-${sectionKey}-form`}
      title="URL query params:"
      placeholder="Enter query param"
      defaultUrlValue={queryParams}
      isDefaultUrlValue={isDefaultQueryParams}
      onSetUrl={(value: string) => handleSetQueryParams(value)}
      onResetUrl={handleResetQueryParams}
      setUrlBtnText={`Set query params`}
      resetUrlBtnText="Reset query params"
      additionalButtons={[]}
      saveAlt="save endpoint URL"
      onSave={() => handleSaveUrlSection(queryParams, sectionKey)}
      value={queryParams}
      section={sectionKey}
      isDisabled={saveDisabled.queryParams}
    />
  )
}

export default QueryParamsForm
