import axios, { type AxiosRequestConfig, type Method } from 'axios'

const DEV = process.env.NODE_ENV !== 'production'

export const getURL = (path: string) => `https://ya-praktikum.tech/api/v2/${path}`
const getOutURL = (path: string) => ` http://127.0.0.1:3001/api/forum/${path}`

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

  request: (method: Method, path: string, params?: AxiosRequestConfig, isOutUrl?: boolean) => {
    let url = ''
    let config = {}

    if (isOutUrl) {
      url = getOutURL(path)
      config = {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
      }
    } else {
      url = getURL(path)
      config = {
        withCredentials: true,
      }
    }

    if (DEV) {
      console.info('[API] ->', method, url, params || '')
    }

    return axios
      .create(config)
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
        throw error
      })
  },

  get: (path: string, params?: AxiosRequestConfig['params'], isOutUrl?: boolean) =>
    api.request('GET', path, { params }, isOutUrl),

  post: (path: string, data?: AxiosRequestConfig['data'], isOutUrl?: boolean) =>
    api.request('POST', path, { data }, isOutUrl),

  patch: (path: string, data: AxiosRequestConfig['data'], isOutUrl?: boolean) =>
    api.request('PATCH', path, { data }, isOutUrl),

  put: (path: string, data: AxiosRequestConfig['data'], isOutUrl?: boolean) =>
    api.request('PUT', path, { data }, isOutUrl),

  delete: (path: string, isOutUrl?: boolean) => api.request('DELETE', path, undefined, isOutUrl),

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
