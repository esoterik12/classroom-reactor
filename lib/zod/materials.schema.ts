import { z } from 'zod'

export const cryptogramSchema = z.object({
  title: z.string().min(2, 'Title is required.'),
  text: z
    .string()
    .min(20, 'You must enter at least 20 letters.')
    .max(120, 'You cannot enter more than 120 characters.')
    .refine(
      value => {
        const words = value.split(/\s+/)
        return words.every(word => word.length <= 20)
      },
      {
        message: 'All words must be 20 characters or less.'
      }
    ),
  givenLetters: z.string()
})

export const wordScrambleSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  text: z
    .string()
    .min(5, 'You must enter at least 5 letters.')
    .max(200, 'You cannot enter more than 200 characters.')
    .refine(
      value => {
        const words = value.split(/\s+/)
        return words.every(word => word.length <= 20)
      },
      {
        message: 'All words must be 20 characters or less.'
      }
    )
})
