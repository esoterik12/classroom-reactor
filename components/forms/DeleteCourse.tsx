'use client'
import { useRouter } from 'next/navigation'
import SelectIcon from '../icons/SelectIcon'
import { useState } from 'react'
import { deleteCourse } from '@/lib/actions/course.actions'

function DeleteCourse({ courseId }: { courseId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  return (
    <button
      onClick={async () => {
        setIsLoading(true)
        await deleteCourse(courseId)
        setIsLoading(false)
        router.refresh()
      }}
      disabled={isLoading}
    >
      <div className='ml-0.5 mt-1 flex flex-row gap-2 transition-colors duration-150 hover:text-primary-200'>
        <SelectIcon
          iconClasses={`h-6 w-6 cursor-pointer  ${isLoading ? 'text-gray-500' : ''}`}
          iconSelection='delete'
        />
        <p>Delete Course</p>
      </div>
    </button>
  )
}

export default DeleteCourse
