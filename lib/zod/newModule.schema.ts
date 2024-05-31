import { z } from 'zod'

export const newModuleSchema = z.object({
  moduleTitle: z.string().min(3, { message: 'A module title is required.' }),
  // content: z
  //   .string()
  //   .min(3, { message: 'Module content is required.' }),
  unit: z.coerce.number().min(1, { message: 'Please enter a unit number.' })
})
