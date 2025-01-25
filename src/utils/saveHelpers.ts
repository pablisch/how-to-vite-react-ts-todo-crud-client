import {
  saveDisabledObject,
  StoredUrlsObject,
  urlSections,
} from '../types/types.ts'
import { defaultUrls } from './data.ts'

export default {
  updateSaveDisabled: function (
    url: string,
    section: keyof urlSections,
    saveDisabled: saveDisabledObject,
    storedUrls: StoredUrlsObject
  ) {
    const isDefaultUrl = url === defaultUrls[section]
    if (!saveDisabled[section]) {
      if (storedUrls[section].includes(url) || isDefaultUrl) {
        return 'true'
      }
    } else if (saveDisabled[section]) {
      if (!storedUrls[section].includes(url) && !isDefaultUrl) {
        return 'false'
      }
    }
  },
}
