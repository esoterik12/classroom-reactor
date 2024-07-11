import { z } from 'zod'

export const editCourseRoleSchema = z.object({
  membersRole: z.enum(['student', 'staff', 'teacher'])
})
