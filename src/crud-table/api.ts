import { keyof, number, partial, Props, readonlyArray, TypeOf } from 'io-ts'
import { stringify } from 'query-string'
import axios from 'axios'
import { AnyObj, cast, enumerate, getProps, ObjC, opt } from '../safe'
import { http } from '../safe/http'

export interface APIQuery<C> {
  readonly select?: ReadonlyArray<keyof C>
  readonly filter?: Partial<C>
  readonly page?: number
  readonly perPage?: number
  readonly sort?: keyof C
  readonly order?: 'asc' | 'desc'
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function apiQuerySpec(codec: AnyObj) {
  const props = getProps(codec)

  return opt({
    select: readonlyArray(keyof(props)),
    filter: partial(props),
    page: number,
    perPage: number,
    sort: keyof(props),
    order: enumerate('asc', 'desc'),
  })
}

export function toAPIQuery<Opt extends Props, Req extends Props>(
  codec: ObjC<Opt, Req>,
  query: APIQuery<TypeOf<typeof codec>>,
): string {
  cast(apiQuerySpec(codec), query)

  const { sort, order } = query
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const range = { page: query.page, per_page: query.perPage }

  return stringify({ ...range, sort, order }, { arrayFormat: 'comma' })
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function rest<Opt extends Props, Req extends Props>(args: {
  readonly baseURL: string
  readonly resource: string
  readonly spec: ObjC<Opt, Req>
}) {
  const { baseURL, resource, spec } = args

  const axiosInstance = axios.create({ baseURL })

  const api = http(axiosInstance)

  return {
    api,
    list: async (
      query: APIQuery<TypeOf<ObjC<Opt, Req>>>,
    ): Promise<ReadonlyArray<TypeOf<ObjC<Opt, Req>>>> =>
      api.get(
        { query: toAPIQuery(spec, query), resource },
        readonlyArray(spec),
      ),
  }
}
