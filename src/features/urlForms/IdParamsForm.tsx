import UrlForm from './UrlForm.tsx'
import { useIdParams } from '../../hooks/useIdParams.tsx'
import { useSave } from '../../hooks/useSave.tsx'

const IdParamsForm = () => {
  const {
    idParams,
    isDefaultUrlValue,
    handleSetIdParams,
    handleResetIdParams,
  } = useIdParams()
  const { handleSaveUrlSection } = useSave()

  return (
    <UrlForm
      id="id-params"
      title="URL /:id param:"
      placeholder="Enter new URL endpoint"
      defaultUrlValue={idParams}
      isDefaultUrlValue={isDefaultUrlValue}
      onSetUrl={(value: string) => handleSetIdParams(value)}
      onResetUrl={handleResetIdParams}
      setUrlBtnText={`Set /:id param`}
      resetUrlBtnText="Reset /:id param"
      additionalButtons={[]}
      saveAlt="save endpoint URL"
      onSave={() => handleSaveUrlSection('idParam', idParams)}
      value={idParams}
    />
  )
}

export default IdParamsForm
