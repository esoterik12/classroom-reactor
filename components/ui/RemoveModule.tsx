'use client'
import SelectIcon from '../icons/SelectIcon'
import { deleteModule } from '@/lib/actions/module.actions'

interface RemoveModuleProps {
  courseId: string
  moduleId: string
}

const RemoveModule = ({ courseId, moduleId }: RemoveModuleProps) => {

  const handleRemove = async () => {
    await deleteModule(moduleId, courseId)
  }

  return (
    <button onClick={handleRemove}>
      <p className='mt-2 flex flex-row text-jet-900 transition-colors duration-150 hover:text-primary-300'>
        <SelectIcon iconClasses='h-5 w-5 mt-0.5 mr-2 ml-1' iconSelection='x' />
        Remove
      </p>
    </button>
  )
}

export default RemoveModule
