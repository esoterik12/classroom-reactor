'use client'
import { removeCourseMember } from '@/lib/actions/course.actions'
import { usePathname } from 'next/navigation'
import SelectIcon from '../icons/SelectIcon'
import { EditCourseUserProps } from '@/lib/types'

const RemoveCourseUser = ({ courseId, userId }: EditCourseUserProps) => {
  const pathname = usePathname()

  const handleRemove = async () => {
    await removeCourseMember(courseId, userId, pathname)
  }

  return (
    <button onClick={handleRemove}>
      <p className='mt-2 flex flex-row text-jet-900'>
        <SelectIcon iconClasses='h-5 w-5 mt-0.5 mr-2' iconSelection='x' />
        Remove
      </p>
    </button>
  )
}

export default RemoveCourseUser
