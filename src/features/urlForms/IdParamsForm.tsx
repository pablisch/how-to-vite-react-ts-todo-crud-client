import UrlForm from './UrlForm.tsx'
import { useIdParams } from '../../hooks/useIdParams.tsx'
import { useSave } from '../../hooks/useSave.tsx'
import { useSaveDisabledUpdater } from '../../hooks/useSaveDisabledUpdater.tsx'

const IdParamsForm = () => {
  const {
    idParams,
    isDefaultUrlValue,
    handleSetIdParams,
    handleResetIdParams,
  } = useIdParams()
  const { handleSaveUrlSection, saveDisabled } = useSave()

  const idParamsKey = 'idParams'

  useSaveDisabledUpdater('idParams')

  return (
    <UrlForm
      id={idParamsKey}
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
      onSave={() => handleSaveUrlSection(idParams, idParamsKey)}
      value={idParams}
      section={idParamsKey}
      isDisabled={saveDisabled.idParams}
    />
  )
}

export default IdParamsForm
