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

  const sectionKey = 'idParams'

  useSaveDisabledUpdater(sectionKey)

  return (
    <UrlForm
      id={`url-${sectionKey}-form`}
      title="URL /:id param:"
      placeholder="Enter new URL endpoint"
      defaultUrlValue={idParams}
      isDefaultUrlValue={isDefaultUrlValue}
      onSetUrl={(value: string) => handleSetIdParams(value)}
      onResetUrl={handleResetIdParams}
      setUrlBtnText={`Set /:id param`}
      resetUrlBtnText="Reset /:id param"
      additionalButtons={[]}
      saveAlt="save ID param"
      onSave={() => handleSaveUrlSection(idParams, sectionKey)}
      value={idParams}
      section={sectionKey}
      isDisabled={saveDisabled.idParams}
    />
  )
}

export default IdParamsForm
