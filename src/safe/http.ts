import ax, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { array, InputOf, Mixed, string, TypeOf } from 'io-ts'
import { decode } from 'io-ts-promise'
import { stringify } from 'query-string'
import { debug, keys, verify } from '../safe'

/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export function chop(arg: string, delimiter: string = '/'): string {
  return arg.length === 0
    ? ''
    : arg.endsWith(delimiter)
    ? arg.slice(0, arg.length - 1)
    : arg
}

export interface MethodArgs {
  readonly resource?: string
  readonly path?: string | readonly string[]
  readonly query?: string | Record<string, any>
}

function slashWarn(s: string): void {
  verify(string.is(s))

  debug(!s.includes('/'), `${s} should not contain "/"`)
}
export interface RequestConfig extends AxiosRequestConfig {
  readonly baseURL: string
}

function buildResource(resource?: string): string {
  if (resource !== undefined && resource.trim() !== '') {
    slashWarn(resource)
    return `/${resource}`
  }

  return ''
}

function buildPath(path?: string | readonly string[]): string {
  if (array(string).is(path)) {
    const paths: readonly string[] = path.filter(p => p.trim() !== '')
    paths.forEach(slashWarn)
    return paths.length === 0 ? '' : `/${paths.join('/')}`
  }

  if (string.is(path) && path.trim() !== '') {
    slashWarn(path)
    return `/${path}`
  }

  return ''
}

function buildQueryString(query?: string | Record<string, any>): string {
  return query === undefined || keys(query).length === 0
    ? ''
    : `?${string.is(query) ? query : stringify(query)}`
}

export function buildUrl(options: MethodArgs): string {
  return `${buildResource(options.resource)}${buildPath(
    options.path,
  )}${buildQueryString(options.query)}`
}

function url(options: MethodArgs | string): string {
  return string.is(options) ? options : buildUrl(options)
}

function isRequestConfig(
  config: RequestConfig | AxiosInstance,
): config is RequestConfig {
  return 'baseURL' in config
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function http(axiosConfig: RequestConfig | AxiosInstance) {
  const axios: AxiosInstance = isRequestConfig(axiosConfig)
    ? ax.create({
        ...axiosConfig,
        baseURL: chop(axiosConfig.baseURL),
      })
    : axiosConfig

  function get$<Spec extends Mixed>(
    options: MethodArgs | string,
    responseSpec: Spec,
  ): {
    readonly data: Promise<TypeOf<Spec>>
    readonly response: Promise<AxiosResponse<Spec['_I']>>
  } {
    const response = axios.get<InputOf<Spec>>(url(options))
    const data = response.then(res => res.data).then(decode(responseSpec))

    return { response, data }
  }

  function post$<Spec extends Mixed, ID extends keyof Spec>(
    options: Omit<MethodArgs, 'query'> | string,
    data: Omit<InputOf<Spec>, ID>,
    responseSpec: Spec,
  ): {
    readonly data: Promise<TypeOf<Spec>>
    readonly response: Promise<AxiosResponse<Spec['_I']>>
  } {
    const response = axios.post<InputOf<Spec>>(url(options), data)

    const result = response.then(res => res.data).then(decode(responseSpec))

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { response, data: result }
  }

  function patch$<Spec extends Mixed>(
    options: Omit<MethodArgs, 'query'> | string,
    data: Partial<InputOf<Spec>>,
    responseSpec: Spec,
  ): {
    readonly data: Promise<TypeOf<Spec>>
    readonly response: Promise<AxiosResponse<InputOf<Spec>>>
  } {
    const response = axios.patch<InputOf<Spec>>(url(options), data)
    const result = response.then(res => res.data).then(decode(responseSpec))

    return { response, data: result }
  }

  function put$<Spec extends Mixed>(
    options: Omit<MethodArgs, 'query'> | string,
    data: InputOf<Spec>,
    responseSpec: Spec,
  ): {
    readonly data: Promise<TypeOf<Spec>>
    readonly response: Promise<AxiosResponse<Spec['_I']>>
  } {
    const response = axios.put<InputOf<Spec>>(url(options), data)

    const result = response.then(res => res.data).then(decode(responseSpec))

    return { response, data: result }
  }

  async function del$(
    options: Omit<MethodArgs, 'query'> | string,
  ): Promise<AxiosResponse<void>> {
    return axios.delete(url(options))
  }

  async function get<Spec extends Mixed>(
    options: MethodArgs | string,
    responseSpec: Spec,
  ): Promise<TypeOf<Spec>> {
    return get$(options, responseSpec).data
  }

  async function post<Spec extends Mixed, ID extends keyof Spec>(
    options: Omit<MethodArgs, 'query'> | string,
    data: Omit<InputOf<Spec>, ID>,
    responseSpec: Spec,
  ): Promise<TypeOf<Spec>> {
    return post$(options, data, responseSpec).data
  }

  async function patch<Spec extends Mixed>(
    options: Omit<MethodArgs, 'query'> | string,
    data: Partial<InputOf<Spec>>,
    responseSpec: Spec,
  ): Promise<TypeOf<Spec>> {
    return patch$(options, data, responseSpec).data
  }

  async function put<Spec extends Mixed>(
    options: Omit<MethodArgs, 'query'> | string,
    data: InputOf<Spec>,
    responseSpec: Spec,
  ): Promise<TypeOf<Spec>> {
    return put$(options, data, responseSpec).data
  }

  async function del(
    options: Omit<MethodArgs, 'query'> | string,
  ): Promise<void> {
    await del$(options)
  }

  return { get, del, put, post, patch, get$, del$, put$, post$, patch$, axios }
}
