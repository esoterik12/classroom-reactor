import { z } from 'zod'

export const newModuleSchema = z.object({
  moduleTitle: z
    .string()
    .min(3, { message: 'A module title of 3 or more characters is required.' }),
  unit: z.coerce
    .number()
    .int({ message: 'Enter a whole number.' })
    .positive()
    .min(1, { message: 'Please enter a unit number.' }),
  lesson: z.coerce
    .number()
    .int({ message: 'Enter a whole number.' })
    .positive()
    .min(1, { message: 'Please enter a lesson number.' })
})
