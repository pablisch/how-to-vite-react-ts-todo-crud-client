import axios from 'axios'

const apiClient = axios.create({
  // baseURL: 'https://your-api-url.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { status, data } = error.response
      const apiError = {
        status,
        ...data,
      }

      return Promise.reject(apiError)
    }

    return Promise.reject({ status: 0, message: 'A network error occurred.' })
  }
)

export default apiClient
