import { courseUserRoles } from '@/lib/constants/courseUserRoles'
import SelectIcon from '../icons/SelectIcon'
import {UseFormRegister } from 'react-hook-form'
import { AddMembersProps } from '@/lib/types'

type CourseRoleRadioGroupProps = {
  registerFunction: UseFormRegister<AddMembersProps>;
}

const CourseRoleRadioGroup = ({ registerFunction }: CourseRoleRadioGroupProps) => {
  return (
    <div className='flex flex-wrap gap-3'>
      {courseUserRoles.map(item => (
        <label key={item.role} className='cursor-pointer'>
          <input
            className='peer sr-only'
            type='radio'
            value={item.role}
            {...registerFunction('membersRole')}
          />
          <div className='ring-transparent mb-7 ml-2 w-32 max-w-xl rounded-md p-1 ring-2 hover:shadow peer-checked:text-primary-500 peer-checked:ring-primary-500 peer-checked:ring-offset-2'>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center justify-between'>
                <p className='ml-1 text-sm font-semibold uppercase text-gray-500'>
                  {item.role}
                </p>
                <div>
                  <SelectIcon iconClasses='w-5 h-5' iconSelection='plus' />
                </div>
              </div>
            </div>
          </div>
        </label>
      ))}
    </div>
  )
}

export default CourseRoleRadioGroup
