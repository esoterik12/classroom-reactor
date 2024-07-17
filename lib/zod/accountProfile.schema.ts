import { z } from 'zod'

const MAX_FILE_SIZE = 1024 * 1024 * 5 // 5MB

// Define the MIME types as a tuple with `as const` to ensure type correctness
const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
] as const

// Define the enum using the tuple
const mimeTypeEnum = z.enum([...ACCEPTED_IMAGE_MIME_TYPES])

// Validate the file structure including custom error message using refinement
const fileSchema = z.object({
  size: z.number().max(MAX_FILE_SIZE, { message: 'Max image size is 5MB.' }),
  type: mimeTypeEnum.refine(type => ACCEPTED_IMAGE_MIME_TYPES.includes(type), {
    message: 'Only .jpg, .jpeg, .png, and .webp formats are supported.'
  })
})

// Define the main schema with the union for image to accept string URL or file object
export const accountProfileSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Name is required.' })
    .max(18, { message: 'Max username length: 18' }),
  bio: z.string().min(4, { message: 'Please enter a short bio.' }),
  username: z.string().min(4, { message: 'Username is required.' }),
  image: z.union([z.string(), fileSchema])
})
