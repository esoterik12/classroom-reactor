// May require suppressHydrationWarning in html of layout.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from './InputField'
import { usePathname } from 'next/navigation'

// Zod validation imports:
import { zodResolver } from '@hookform/resolvers/zod'
import { newCourseSchema } from '@/lib/zod/newCourse.schema'
import { NewCourseProps } from '@/lib/types'
import { UploadButton } from '@/lib/uploadthing'
import { addNewCourse, updateCourse } from '@/lib/actions/course.actions'
import { TextareaInput } from './TextareaInput'
import SelectIcon from '../icons/SelectIcon'
import Loading from '../shared/Loading'
import BackButton from '../ui/BackButton'
import CustomButton from '../ui/CustomButton'

interface NewCourseFormProps {
  id?: string
  user: string
  courseName?: string
  description?: string
  image?: string
}

export default function NewCourseForm({
  id,
  user,
  courseName,
  description,
  image
}: NewCourseFormProps) {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<null | string>('')
  const [imageError, setImageError] = useState<null | string>(null)
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitSuccessful }
  } = useForm<NewCourseProps>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(newCourseSchema),
    defaultValues: {
      image: image ? image : '',
      courseName: courseName ? courseName : '',
      description: description ? description : '',
      createdBy: user ? user : ''
    }
  })

  useEffect(() => {
    if (image) {
      setImageUrl(image)
    }
  }, [])

  async function onSubmit(data: NewCourseProps) {
    setLoading(true)
    try {
      const courseUpdateObject: NewCourseProps = {
        courseName: data.courseName,
        image: imageUrl,
        description: data.description,
        createdBy: user,
        path: pathname
      }

      if (id) {
        console.log('Updating course...')
        courseUpdateObject.id = id
        await updateCourse(courseUpdateObject)
      } else {
        console.log('Adding course...')
        await addNewCourse(courseUpdateObject)
      }
      console.log('Update course success!')
    } catch (error) {
      console.log('Server action error updating or creating course: ', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading && isSubmitted) {
    return (
      <div>
        <Loading text='Updating...' />
      </div>
    )
  }

  return (
    <>
      {!isSubmitSuccessful && (
        <div className='w-full p-2'>
          <div className='flex flex-row gap-2'>
            <BackButton classes=''>
              <SelectIcon iconClasses='h-6 w-6' iconSelection='back' />
            </BackButton>
            <h1 className='text-xl font-semibold'>
              {id ? 'Edit' : 'Create'} a Course
            </h1>
          </div>
          <form className='m-2 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div>
              <InputField
                type='text'
                id='courseName'
                label='Course Name'
                placeholder='Enter a name for your course'
                inputClasses='w-full max-w-[450px]'
                {...register('courseName')}
                error={errors.courseName}
              />
            </div>
            {/* Image field */}{' '}
            <div className='mb-4 flex min-h-20 flex-col'>
              <p className='text ml-1 font-medium text-gray-700'>
                Course Display Picture
              </p>

              {!imageUrl ? (
                <div className='flex flex-col'>
                  <UploadButton
                    className='p-1'
                    appearance={{
                      container: 'flex flex-row justify-start gap-4',
                      button:
                        'transition-300 text-jet rounded-md bg-secondary-500 p-2 px-4 transition-colors hover:bg-secondaryLight disabled:cursor-not-allowed dark:text-jet-500'
                    }}
                    endpoint='imageUploader'
                    onClientUploadComplete={res => {
                      setImageUrl(res[0].url)
                    }}
                    onUploadError={(error: Error) => {
                      console.log(`Error uploading image! ${error.message}`)
                    }}
                  />
                  {imageError && (
                    <p className='text-primary-500'>{imageError}</p>
                  )}
                </div>
              ) : (
                <div className='bg-mint flex flex-row gap-2 rounded-l p-2 text-center'>
                  <SelectIcon
                    iconClasses='h-6 w-6 text-green-500'
                    iconSelection='check'
                  />
                  <p className=''>Image Uploaded</p>
                  <button
                    onClick={() => setImageUrl(null)}
                    className='ml-4 transition-colors duration-300 hover:text-jet-100'
                  >
                    Reset Image
                  </button>
                </div>
              )}
            </div>
            {/* Bio Section */}
            <div>
              <TextareaInput
                id='description'
                label='Course Description'
                placeholder='Enter a basic description of the course.'
                inputClasses='w-full'
                {...register('description')}
                error={errors.description}
              />
            </div>
            <div className='ml-1'>
              <CustomButton btnType='submit' isDisabled={!imageUrl}>
                <p>{courseName ? 'Edit Course' : 'Create Course'}</p>
              </CustomButton>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
