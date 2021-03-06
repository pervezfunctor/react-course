import {
  AnyArrayType,
  ArrayC,
  ArrayType,
  BooleanType,
  ExactType,
  InterfaceType,
  IntersectionType,
  KeyofType,
  LiteralType,
  Mixed,
  NullType,
  NumberType,
  PartialType,
  ReadonlyArrayC,
  ReadonlyArrayType,
  ReadonlyType,
  RefinementType,
  StringType,
  TupleType,
  Type,
  TypeOf,
  UndefinedType,
  UnionType,
  unknown,
  VoidType,
} from 'io-ts'
import { mapValues, range } from 'lodash-es'
// import uid from 'uid'

import Chance from 'chance'
import { ObjType } from '../safe'

const chance = new Chance.Chance()

export const defaultOptions = {
  integer: { min: 100, max: 1000 },
  floating: { min: 0, max: 100, fixed: 2 },
  sentence: { words: 4 },
  array: { minLength: 0, maxLength: 6 },
}

export type FakeOptions = typeof defaultOptions

/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

const repeatedly = <T>(n: number, f: (index: number) => T): readonly T[] =>
  range(n).map(i => f(i))

function fakeArrayFromType<T extends Mixed>(
  spec: T,
  options: FakeOptions,
): ReadonlyArray<TypeOf<typeof spec>> {
  const n = chance.integer({
    min: options.array.minLength,
    max: options.array.maxLength,
  })

  return repeatedly(n, () => fake(spec, options))
}

function fakeArray<T extends Mixed>(
  spec: ArrayC<T> | ReadonlyArrayC<T>,
  options: FakeOptions,
): TypeOf<typeof spec> {
  return fakeArrayFromType(spec.type, options)
}

export function fake<T extends Mixed>(
  spec: T,
  options: FakeOptions = defaultOptions,
): TypeOf<typeof spec> {
  if (spec.name === 'Int' || spec.name === 'NumID') {
    return chance.integer(options.integer)
  }

  // if (spec.name === 'StrID') {
  //   return uid()
  // }

  // if (spec instanceof OptionType) {
  //   return fake(spec.spec)
  // }

  if (spec instanceof NumberType) {
    return chance.floating(options.floating)
  }

  if (spec instanceof StringType) {
    return chance.sentence(options.sentence)
  }

  if (spec instanceof BooleanType) {
    return chance.bool()
  }

  if (spec.name === 'Date') {
    return chance.date()
  }

  if (spec.name === 'DateFromISOString') {
    return chance.date()
  }

  if (spec instanceof KeyofType) {
    return chance.pickone(Object.keys(spec.keys))
  }

  // if (spec instanceof EnumType) {
  //   return chance.pickone(spec.keys)
  // }

  if (spec instanceof LiteralType) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return spec.value
  }

  if (spec instanceof NullType) {
    return null
  }

  if (spec instanceof UndefinedType || spec instanceof VoidType) {
    return undefined
  }

  if (
    spec instanceof ReadonlyType ||
    spec instanceof ExactType ||
    spec instanceof RefinementType // No easy way to do this correctly?
  ) {
    return fake(spec.type, options)
  }

  if (spec instanceof ReadonlyArrayType) {
    return fakeArrayFromType(spec.type, options)
  }

  if (spec instanceof AnyArrayType) {
    return fakeArrayFromType(unknown, options)
  }

  if (spec instanceof ArrayType) {
    return fakeArray(spec, options)
  }

  if (
    spec instanceof InterfaceType ||
    spec instanceof PartialType ||
    spec instanceof ObjType
  ) {
    return mapValues(spec.props, v => fake(v, options))
  }

  if (spec instanceof IntersectionType) {
    return spec.types
      .map((t: Type<any>) => fake(t, options))
      .reduce((acc: any, x: any) => ({ ...acc, ...x }))
  }

  if (spec instanceof UnionType) {
    const one = chance.integer({ min: 0, max: spec.types.length - 1 })

    return fake(spec.types[one], options)
  }

  if (spec instanceof TupleType) {
    return spec.types.map((p: Type<any>) => fake(p, options))
  }

  throw new Error(`Unsupported type: ${spec.name}`)
}
