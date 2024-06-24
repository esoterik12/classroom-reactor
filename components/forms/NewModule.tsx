// May require suppressHydrationWarning in html of layout.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from './InputField'
import { usePathname } from 'next/navigation'

// Zod validation imports:
import { zodResolver } from '@hookform/resolvers/zod'
import { newModuleSchema } from '@/lib/zod/newModule.schema'
import { INewModule } from '@/lib/types'
import SelectIcon from '../icons/SelectIcon'
import Loading from '../shared/Loading'
import BackButton from '../ui/BackButton'
import { addNewModule, updateModule } from '@/lib/actions/module.actions'
import RichTextEdiotor from '../rte/RichTextEditor'

export default function NewModuleForm({
  userId,
  courseId,
  editModuleTitle,
  editModuleContent,
  setIsEdit,
  moduleId
}: {
  userId: string
  courseId: string
  editModuleTitle?: string
  editModuleContent?: any
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>
  moduleId?: string
}) {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (editModuleContent) {
      const content = JSON.stringify(editModuleContent)
      localStorage.setItem('content', content)
    }
    console.log('editModuleContent', editModuleContent)
  }, [editModuleContent])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted }
  } = useForm<INewModule>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(newModuleSchema),
    defaultValues: {
      moduleTitle: editModuleTitle ? editModuleTitle : '',
      unit: 1,
      lesson: 1,
      createdBy: userId ? userId : ''
    }
  })

  async function onSubmit(data: INewModule) {
    const editorContent = localStorage.getItem('content')

    setLoading(true)
    if (!userId) {
      return
    }
    try {
      if (setIsEdit && moduleId) {
        console.log('running updateModule')
        await updateModule({
          moduleId: moduleId,
          moduleTitle: data.moduleTitle,
          content: editorContent,
          unit: data.unit,
          lesson: data.lesson,
          pathname
        })
      } else {
        console.log('running addNewModule')
        await addNewModule({
          courseId: courseId,
          moduleTitle: data.moduleTitle,
          content: editorContent,
          unit: data.unit,
          lesson: data.lesson,
          createdBy: userId.toString(),
          pathname
        })
      }
      console.log('Add module success!')
    } catch (error) {
      console.log('server action error: ', error)
    } finally {
      setLoading(false)
      if (setIsEdit) {
        setIsEdit(false)
      }
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
        <div className='w-full p-2'>
          <div className='flex flex-row gap-2'>
            <BackButton classes=''>
              <SelectIcon iconClasses='h-6 w-6' iconSelection='back' />
            </BackButton>
            <h1 className='text-xl font-semibold'>
              {editModuleContent ? 'Edit' : 'Add'} Module
            </h1>
          </div>
          <form className='m-2 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
                <InputField
                  type='number'
                  id='unit'
                  label='Unit:'
                  placeholder='Enter a unit number'
                  inputClasses='w-full max-w-[70px]'
                  labelClasses=''
                  {...register('unit')}
                  error={errors.unit}
                />
                <InputField
                  type='number'
                  id='lesson'
                  label='Lesson:'
                  placeholder='Enter a lesson number'
                  inputClasses='w-full max-w-[70px]'
                  labelClasses=''
                  {...register('lesson')}
                  error={errors.lesson}
                />
              <div className='md:w-1/2'>
                <InputField
                  type='text'
                  id='moduleTitle'
                  label='Title:'
                  placeholder='Enter a title'
                  inputClasses='w-full'
                  {...register('moduleTitle')}
                  error={errors.moduleTitle}
                />
              </div>
            {/* Content Section */}
            <div>
              <label className='block p-1 font-medium'>Content:</label>
              <RichTextEdiotor startingValue={editModuleContent} />
            </div>
            <div>
              <button
                type='submit'
                className='transition-300 text-jet ml-1 mt-8 rounded-md bg-secondary-500 p-2 px-4 transition-colors hover:bg-secondaryLight disabled:cursor-not-allowed'
                disabled={loading}
              >
                {editModuleContent ? 'Edit' : 'Add'} Module
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
