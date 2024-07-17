'use client'
import SelectIcon from '../icons/SelectIcon'
import { useState } from 'react'
import { deleteModule } from '@/lib/actions/module.actions'

interface RemoveModuleProps {
  userMongoId: string
  courseId: string
  moduleId: string
  permissionDisabled?: boolean
}

const RemoveModule = ({
  userMongoId,
  courseId,
  moduleId,
  permissionDisabled
}: RemoveModuleProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleRemove = async () => {
    setIsLoading(true)
    const result = await deleteModule({ userMongoId, moduleId, courseId })
    console.log('on Delete result: ', result)
    setIsLoading(false)
  }

  return (
    <button
      disabled={isLoading || permissionDisabled}
      onClick={handleRemove}
      className={`${isLoading || permissionDisabled ? 'text-gray-500' : ''} `}
    >
      <div
        className={`ml-0.5 mt-1 flex flex-row transition-colors duration-150 ${!isLoading && !permissionDisabled ? 'hover:text-primary-200' : ''} `}
      >
        <SelectIcon iconClasses='h-5 w-5 mt-0.5 mr-2 ml-0.5' iconSelection='x' />
        <p>Remove</p>
      </div>
    </button>
  )
}

export default RemoveModule
