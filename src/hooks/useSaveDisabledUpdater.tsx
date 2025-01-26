import { useSave } from './useSave.tsx'
import { useEndpoint } from './useEndpoint.tsx'
import { useQueryParams } from './useQueryParams.tsx'
import { useIdParams } from './useIdParams.tsx'
import { urlSections } from '../types/types.ts'
import { defaultUrls } from '../utils/data.ts'

export const useSaveDisabledUpdater = (section: keyof urlSections) => {
  const { storedUrls, saveDisabled, handleUpdateSaveDisabled } = useSave()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const { queryParams } = useQueryParams()
  let url: string = ''
  switch (section) {
    case 'endpoint':
      url = endpoint
      break
    case 'idParam':
      url = idParams
      break
    case 'queryParam':
      url = queryParams
      break
    default:
      break
  }
  if (url === '') return

  const isDefaultUrl = url === defaultUrls[section]

  if (!saveDisabled[section]) {
    if (storedUrls[section].includes(url) || isDefaultUrl) {
      handleUpdateSaveDisabled(true, section)
    }
  } else if (saveDisabled[section]) {
    if (!storedUrls[section].includes(url) && !isDefaultUrl) {
      handleUpdateSaveDisabled(false, section)
    }
  }
}
