'use client'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { IAddMembers } from '@/lib/types'
import { addMembersSchema } from '@/lib/zod/addMembers.schema'
import { useParams, usePathname } from 'next/navigation'
import { addCourseMembers } from '@/lib/actions/course.actions'
import SelectIcon from '../icons/SelectIcon'
import { courseUserRoles } from '@/lib/constants/courseUserRoles'

const AddMembers = () => {
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const pathname = usePathname()

  console.log('params', params.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted }
  } = useForm<IAddMembers>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(addMembersSchema),
    defaultValues: {
      addMembersUsernames: '',
      membersRole: 'student'
    }
  })

  async function onSubmit(data: IAddMembers) {
    console.log('form submitted')
    setLoading(true)
    try {
      const usernameArray = data.addMembersUsernames
        .split(',')
        .map(item => item.trim())

      const addMembersResult = await addCourseMembers({
        courseId: params.id.toString(),
        memberUsernames: usernameArray,
        membersRole: data.membersRole,
        pathname: pathname
      })

      
      reset()
      console.log('Add users success!: ', addMembersResult)
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
        <div className='flex flex-wrap gap-3'>
          {courseUserRoles.map(item => (
            <label className='cursor-pointer'>
              <input
                className='peer sr-only'
                type='radio'
                value={item.role}
                {...register('membersRole')}
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

        <div>
          <button
            type='submit'
            className={`transition-300 text-jet ml-1 rounded-md p-2 px-4 transition-colors  disabled:cursor-not-allowed ${loading ? 'bg-gray-300' : 'bg-secondary-500 hover:bg-secondaryLight'}`}
            disabled={loading}
          >
            <p className='text-jet-800'>Add Users</p>
          </button>
          <p className='m-2 text-sm text-gray-500'>
            bbooth78, Jimmy,Sally, TechGuru
          </p>
        </div>
      </form>
    </div>
  )
}

export default AddMembers
