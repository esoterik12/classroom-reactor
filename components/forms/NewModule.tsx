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
import SelectIcon from '../icons/SelectIcon'
import Loading from '../shared/Loading'
import BackButton from '../ui/BackButton'
import { addNewModule } from '@/lib/actions/module.actions'
import RichTextEdiotor from '../rte/RichTextEditor'

export default function NewModuleForm({
  user,
  courseId
}: {
  user: IUserProfile
  courseId: string
}) {
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
      unit: 1,
      createdBy: user?.objectId ? user.objectId : ''
    }
  })

  async function onSubmit(data: INewModule) {
    const editorContent = localStorage.getItem('content')
    console.log('New Module - content in storage', editorContent)

    setLoading(true)
    if (!user.objectId) {
      return
    }
    try {
      await addNewModule({
        courseId: courseId,
        moduleTitle: data.moduleTitle,
        content: editorContent,
        unit: data.unit,
        createdBy: user.objectId.toString(),
        pathname
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
        <div className='container rounded-md py-4 custom-shadow '>
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
                inputClasses='w-full'
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
                inputClasses='w-full max-w-[70px]'
                labelClasses=''
                {...register('unit')}
                error={errors.unit}
              />
            </div>

            {/* Content Section */}
            <div>

              <label className='block p-1 font-medium'>
                Module Content
              </label>
              <RichTextEdiotor />
            </div>
            <div>
              <button
                type='submit'
                className='transition-300 text-jet ml-1 mt-8 rounded-md bg-secondary-500 p-2 px-4 transition-colors hover:bg-secondaryLight disabled:cursor-not-allowed'
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
