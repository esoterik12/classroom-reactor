'use client'
import { useRouter } from 'next/navigation'
import SelectIcon from '../icons/SelectIcon'
import { useState } from 'react'
import { deleteCourse } from '@/lib/actions/course.actions'
import Modal from '../ui/Modal'

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
      <div className='flex flex-row gap-2 mt-1 ml-0.5'>
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
