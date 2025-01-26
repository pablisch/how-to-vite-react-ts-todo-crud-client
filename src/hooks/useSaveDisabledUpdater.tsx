import { useSave } from './useSave.tsx'
import { useEndpoint } from './useEndpoint.tsx'
import { useQueryParams } from './useQueryParams.tsx'
import { useIdParams } from './useIdParams.tsx'
import { urlSections } from '../types/types.ts'
import { defaultUrls } from '../utils/data.ts'
import { useBaseUrl } from './useBaseUrl.tsx'

export const useSaveDisabledUpdater = (section: keyof urlSections) => {
  const { storedUrls, saveDisabled, handleUpdateSaveDisabled } = useSave()
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const { queryParams } = useQueryParams()
  let url: string = ''
  switch (section) {
    case 'endpoint':
      url = endpoint
      break
    case 'idParams':
      url = idParams
      break
    case 'queryParams':
      url = queryParams
      break
    case 'localBase':
      url = baseUrl
      break
    case 'remoteBase':
      url = baseUrl
      break
    default:
      break
  }

  const isDefaultUrl = url === defaultUrls[section]
  const validQueryRegex = /^\?[a-zA-Z0-9]+=[a-zA-Z0-9]+$/
  const queryIsValid =
    section !== 'queryParams' ||
    (section === 'queryParams' && validQueryRegex.test(url))
  
  console.log("****()** is default:", isDefaultUrl, "valid Qurery:", queryIsValid, "url:", url)

  if (!saveDisabled[section]) {
    if (
      storedUrls[section].includes(url) ||
      isDefaultUrl ||
      url === '' ||
      !queryIsValid
    ) {
      handleUpdateSaveDisabled(true, section)
    }
  } else if (saveDisabled[section]) {
    if (!storedUrls[section].includes(url) && !isDefaultUrl && queryIsValid) {
      handleUpdateSaveDisabled(false, section)
    }
  }
}
