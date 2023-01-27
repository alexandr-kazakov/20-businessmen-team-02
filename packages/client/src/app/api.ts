import axios, { type AxiosRequestConfig, type Method } from 'axios'

const DEV = process.env.NODE_ENV !== 'production'

const getURL = (path: string) => `https://ya-praktikum.tech/api/v2/${path}`

/**
 * возвращает header для запроса
 */
const getHeaders = (userToken: string | null) => {
  const headers = {
    Authorization: <string | undefined>undefined,
  }
  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`
  }
  return headers
}

/**
 * класс api
 */
export const api = {
  /**
   * токен юзера
   */
  userToken: <string | null>null,
  /**
   * проставить токен юзера
   * @param {String} token
   */
  setUserToken: (token: string | null) => {
    api.userToken = token
    if (DEV) {
      console.info('[API] change token', getHeaders(token))
    }
    return api
  },

  request: (method: Method, path: string, params?: AxiosRequestConfig) => {
    const url = getURL(path)
    if (DEV) {
      console.info('[API] ->', method, url, params || '')
    }
    return axios
      .create({ withCredentials: true })
      .request({
        method,
        url,
        ...params,
      })
      .then(response => {
        if (DEV) {
          console.info('[API] <- ok', method, url, response.data)
        }
        return response
      })
      .catch(error => {
        if (DEV) {
          console.error('[API] <- error', method, url, error)
        }
        const reason = error?.response?.data?.reason || error?.response?.data
        reason && typeof reason === 'string' && (error.message = reason)
        throw error
      })
  },

  get: (path: string, params?: AxiosRequestConfig['params']) => api.request('GET', path, { params }),

  post: (path: string, data?: AxiosRequestConfig['data']) => api.request('POST', path, { data }),

  patch: (path: string, data: AxiosRequestConfig['data']) => api.request('PATCH', path, { data }),

  put: (path: string, data: AxiosRequestConfig['data']) => api.request('PUT', path, { data }),

  delete: (path: string) => api.request('DELETE', path),

  getFile: (path: string, params?: AxiosRequestConfig['params']) =>
    api.request('GET', path, { responseType: 'blob', params }),

  sendFile: (path: string, data: AxiosRequestConfig['data']) =>
    api.request('POST', path, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    }),

  updateFile: (path: string, data: AxiosRequestConfig['data']) =>
    api.request('PATCH', path, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    }),
}
