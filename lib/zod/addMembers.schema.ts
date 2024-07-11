// UNFINISHED this should be developed further, if possible
import { z } from 'zod'
import { editCourseRoleSchema } from './editCourseRole.schema'


export const addMembersSchema = z.object({
  addMembersUsernames: z.string(),
  membersRole: z.enum(['student', 'staff', 'teacher'])
})
