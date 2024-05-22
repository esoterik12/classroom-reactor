// May require suppressHydrationWarning in html of layout.tsx
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from './InputField'
import { usePathname } from 'next/navigation'

// Zod validation imports:
import { zodResolver } from '@hookform/resolvers/zod'
import { newModuleSchema } from '@/lib/zod/newModule.schema'
import { INewModule, IUserProfile } from '@/lib/types'
import { TextareaInput } from './TextareaInput'
import SelectIcon from '../icons/SelectIcon'
import Loading from '../shared/Loading'
import BackButton from '../ui/BackButton'
import { addNewModule } from '@/lib/actions/module.actions'

export default function NewModuleForm({ user, courseId }: { user: IUserProfile, courseId: string }) {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted }
  } = useForm<INewModule>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(newModuleSchema),
    defaultValues: {
      moduleTitle: '',
      content: '',
      unit: 1,
      createdBy: user?.objectId ? user.objectId : ''
    }
  })

  async function onSubmit(data: INewModule) {
    setLoading(true)
    if (!user.objectId) {
      return
    }
    try {
      await addNewModule({
        courseId: courseId,
        moduleTitle: data.moduleTitle,
        content: data.content,
        unit: data.unit,
        createdBy: user.objectId.toString(),
        pathname,
      })
      console.log('Add module success!')
    } catch (error) {
      console.log('server action error: ', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || isSubmitted) {
    return (
      <div>
        <Loading text='Updating...' />
      </div>
    )
  }

  return (
    <>
      {!isSubmitted && (
        <div className='container py-4 rounded-md custom-shadow '>
          <div className='flex flex-row gap-2'>
            <BackButton classes=''>
              <SelectIcon iconClasses='h-6 w-6' iconSelection='back' />
            </BackButton>
            <h1 className='text-xl font-semibold'>Add Module</h1>
          </div>
          <form className='m-2 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div>
              <InputField
                type='text'
                id='moduleTitle'
                label='Module Title'
                placeholder='Enter a title'
                inputClasses='w-full max-w-[450px]'
                {...register('moduleTitle')}
                error={errors.moduleTitle}
              />
            </div>
            <div>
              <InputField
                type='number'
                id='unit'
                label='Module Unit'
                placeholder='Enter a unit number'
                inputClasses='w-full max-w-[450px]'
                {...register('unit')}
                error={errors.unit}
              />
            </div>

            {/* Content Section */}
            {/* This will be replaced with the text editor */}
            <div>
              <TextareaInput
                id='content'
                label='Module Content'
                placeholder='Enter module content'
                inputClasses='w-full'
                {...register('content')}
                error={errors.content}
              />
            </div>
            <div>
              <button
                type='submit'
                className='transition-300 text-jet ml-1 mt-4 rounded-md bg-secondary-500 p-2 px-4 transition-colors hover:bg-secondaryLight disabled:cursor-not-allowed'
                disabled={false}
              >
                Add Module
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
