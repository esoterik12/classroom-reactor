'use client'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AddMembersProps } from '@/lib/types'
import { addMembersSchema } from '@/lib/zod/addMembers.schema'
import { useParams, usePathname } from 'next/navigation'
import { addCourseMembers } from '@/lib/actions/course.actions'
import { Dispatch, SetStateAction } from 'react'
import CourseRoleRadioGroup from './CourseRoleRadioGroup'

const AddMembers = ({
  setIsOpen
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted }
  } = useForm<AddMembersProps>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(addMembersSchema),
    defaultValues: {
      addMembersUsernames: '',
      membersRole: 'student'
    }
  })

  async function onSubmit(data: AddMembersProps) {
    try {
      setLoading(true)
      if (!data.addMembersUsernames) {
        throw new Error('No username data')
      }
      const usernameArray = data.addMembersUsernames
        .split(',')
        .map(item => item.trim())

      const addMembersResult = await addCourseMembers({
        courseId: params.id.toString(),
        memberUsernames: usernameArray,
        membersRole: data.membersRole,
        pathname: pathname
      })

      if (!addMembersResult.success) {
        setError('Invalid users or users already added.')
        throw new Error(addMembersResult.message)
      }

      reset()
      setIsOpen(false)
    } catch (error) {
      console.log('Server action error; add course users failed: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form
        className='m-2 flex flex-col'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className='mb-4 ml-1'>Add usernames separated by commas.</p>
        <input
          id='addMembersUsernames'
          placeholder='Enter usernames'
          type='text'
          className='focus:border-transparent focus:ring-blue-400 ml-1 block w-full rounded-md border border-gray-300 p-1 focus:outline-none focus:ring-2'
          {...register('addMembersUsernames')}
        />
        <div className='ml-1 mr-1 min-h-8 p-1'>
          {errors.addMembersUsernames && (
            <p className='text-red-400 text-[12px]'>
              {errors.addMembersUsernames.message}
            </p>
          )}
        </div>

        {/* User Role Radio Group */}
        <CourseRoleRadioGroup registerFunction={register} />

        {/* Button and Error Div */}
        <div className='flex flex-row '>
          <button
            type='submit'
            className={`transition-300 text-jet ml-1 rounded-md p-2 px-4 transition-colors  disabled:cursor-not-allowed ${loading ? 'bg-gray-300' : 'bg-secondary-500 hover:bg-secondaryLight'}`}
            disabled={loading}
          >
            <p className='text-jet-800'>Add Users</p>
          </button>
          {error && <p className='ml-4 mt-2 text-primary-500 text-sm'>Error: {error}</p>}
        </div>
      </form>
    </div>
  )
}

export default AddMembers
