import { z } from 'zod'

export const commentSchema = z.object({
  commentText: z.string().min(2, 'Comment text required.')
})
