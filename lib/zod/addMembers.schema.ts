// UNFINISHED this should be developed further, if possible
import { z } from 'zod'

export const addMembersSchema = z.object({
  addMembersUsernames: z.string(),
  membersRole: z.string(),
})
