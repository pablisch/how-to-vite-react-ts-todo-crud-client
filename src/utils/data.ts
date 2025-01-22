import { deployedDefaultUrl, localDefaultUrl } from './baseUrl.ts'

export const defaultUrls = {
  localBase: localDefaultUrl,
  remoteBase: deployedDefaultUrl,
  endpoint: '/samples',
  idParam: '',
  queryParam: '',
}
