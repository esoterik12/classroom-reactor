'use client'
import { useRouter } from 'next/navigation'
import SelectIcon from '../icons/SelectIcon'
import { useState } from 'react'
import { deleteCourse } from '@/lib/actions/course.actions'

function DeleteCourse({
  courseId,
  userMongoId,
  permissionDisabled
}: {
  courseId: string
  userMongoId: string
  permissionDisabled?: boolean
}) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onDelete = async () => {
    setIsLoading(true)
    const result = await deleteCourse({ courseId, userMongoId })
    console.log('Delete course result:', result)
    setIsLoading(false)

    if (result.code === 200) {
      router.push('/router/courses')
    }
  }

  return (
    <button
      onClick={onDelete}
      disabled={isLoading || permissionDisabled}
      className='disabled:text-gray-500'
    >
      <div
        className={`ml-0.5 mt-1 flex flex-row gap-2 transition-colors duration-150 ${!isLoading && !permissionDisabled ? 'hover:text-primary-200' : ''} `}
      >
        <SelectIcon
          iconClasses={`h-6 w-5 ml-0.5 cursor-pointer  ${isLoading ? 'text-gray-500' : ''}`}
          iconSelection='delete'
        />
        <p>Delete Course</p>
      </div>
    </button>
  )
}

export default DeleteCourse
