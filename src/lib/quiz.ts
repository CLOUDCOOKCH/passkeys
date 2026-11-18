import { questions } from '../content/resourcesQuiz'

export interface QuizProgress {
  page: number
  answers: number[]
}
export const emptyQuiz = (): QuizProgress => ({ page: 0, answers: [] })

export function readQuiz(raw: string | null): QuizProgress {
  if (!raw) return emptyQuiz()
  try {
    const { page, answers } = JSON.parse(raw)
    if (!Number.isInteger(page) || page < 0 || page > questions.length || !Array.isArray(answers))
      return emptyQuiz()
    if (answers.length < page || answers.length > Math.min(page + 1, questions.length))
      return emptyQuiz()
    if (
      !answers.every(
        (answer, i) =>
          Number.isInteger(answer) && answer >= 0 && answer < questions[i].choices.length,
      )
    )
      return emptyQuiz()
    return { page, answers }
  } catch {
    return emptyQuiz()
  }
}

export function quizScore(answers: number[]) {
  return questions.reduce(
    (score, question, index) => score + Number(answers[index] === question.answer),
    0,
  )
}
