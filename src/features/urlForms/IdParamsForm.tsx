import UrlForm from './UrlForm.tsx'
import { useIdParams } from '../../hooks/useIdParams.tsx'

const IdParamsForm = () => {
  const {
    idParams,
    isDefaultUrlValue,
    handleSetIdParams,
    handleResetIdParams,
  } = useIdParams()

  return (
    <UrlForm
      id="id-params"
      title="URL /:id params:"
      placeholder="Enter new URL endpoint"
      defaultUrlValue={idParams}
      isDefaultUrlValue={isDefaultUrlValue}
      onSetUrl={(value: string) => handleSetIdParams(value)}
      onResetUrl={handleResetIdParams}
      setUrlBtnText={`Set /:id param`}
      resetUrlBtnText="Reset /:id param"
      additionalButtons={[]}
    />
  )
}

export default IdParamsForm
