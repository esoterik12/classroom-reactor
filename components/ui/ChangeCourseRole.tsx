'use client'
import { usePathname } from 'next/navigation'
import SelectIcon from '../icons/SelectIcon'
import { useState } from 'react'
import Modal from './Modal'
import { EditCourseUserProps } from '@/lib/types'
import CourseRoleRadioGroup from '../forms/CourseRoleRadioGroup'
import { useForm } from 'react-hook-form'
import { editCourseRoleSchema } from '@/lib/zod/editCourseRole.schema'
import { AddMembersProps } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { changeCourseRole } from '@/lib/actions/course.actions'

interface EditRoleProps {}

const ChangeCourseRole = ({ courseId, userId }: EditCourseUserProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted }
  } = useForm<AddMembersProps>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(editCourseRoleSchema),
    defaultValues: {
      membersRole: 'student'
    }
  })

  async function onSubmit(data: AddMembersProps) {
    try {
      setLoading(true)

      await changeCourseRole({
        courseId,
        memberId: userId,
        membersRole: data.membersRole,
        pathname
      })
    } catch (error) {
      console.log('Server action error; edit user role failed: ', error)
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <p className='mt-2 flex flex-row text-jet-900'>
          <SelectIcon iconClasses='h-5 w-5 mt-0.5 mr-2' iconSelection='edit' />
          Change Role
        </p>
      </button>
      <Modal title='Change user role' isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <form
          className='m-2 flex flex-col'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <CourseRoleRadioGroup registerFunction={register} />
          <button
            type='submit'
            className={`transition-300 text-jet ml-1 w-[140px] rounded-md p-2 px-4 transition-colors  disabled:cursor-not-allowed ${loading ? 'bg-gray-300' : 'bg-secondary-500 hover:bg-secondaryLight'}`}
            disabled={loading}
          >
            <p className='text-jet-800'>Submit</p>
          </button>
        </form>
      </Modal>
    </>
  )
}

export default ChangeCourseRole
