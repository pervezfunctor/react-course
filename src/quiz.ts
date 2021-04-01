import { readonlyArray, string, tuple, TypeOf } from 'io-ts'
import { cast, enums, req } from './safe'

const Choices = tuple([string, string, string, string])

export const Question = req({
  question: string,
  choices: Choices,
  answer: enums('Answer', '0', '1', '2', '3'),
})

export type Question = TypeOf<typeof Question>

export const Quiz = req({
  title: string,
  questions: readonlyArray(Question),
})

export const PreInterviewQuiz = req({
  topic: string,
  questions: tuple([Question, Question, Question, Question, Question]),
})

export const q = {
  question: 'What is 2*3',
  choices: ['6', '7', '8', '9'],
  answer: '0',
}

export const validatedQuiz = cast(Question, q)
console.log({ validatedQuiz })
