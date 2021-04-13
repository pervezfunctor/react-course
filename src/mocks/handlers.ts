import { string, TypeOf } from 'io-ts'
import { NumberFromString } from 'io-ts-types'
import { rest } from 'msw'
import { fakeUsers } from '../fakeData'
import { cast, enumerate, exactOpt } from '../safe'

const Query = exactOpt({
  page: NumberFromString,
  perPage: NumberFromString,
  sortBy: string,
  order: enumerate('asc', 'desc'),
})

type Query = Required<TypeOf<typeof Query>>

export const defaultQuery: Query = {
  page: 1,
  perPage: 10,
  sortBy: 'firstName',
  order: 'asc',
}

export const handlers = [
  rest.get('/users', (req, res, ctx) => {
    const reqParams = {
      page: req.url.searchParams.get('page') ?? undefined,
      perPage: req.url.searchParams.get('perPage') ?? undefined,
      sortBy: req.url.searchParams.get('sortBy') ?? undefined,
      order: req.url.searchParams.get('order') ?? undefined,
    }

    const params: Query = { ...defaultQuery, ...cast(Query, reqParams) }

    const users =
      params.page < 500
        ? fakeUsers(params.perPage)
        : fakeUsers(Math.floor(params.perPage / 2))

    console.log({ usersLength: users.length })
    return res(ctx.status(200), ctx.json(users))
  }),
]
