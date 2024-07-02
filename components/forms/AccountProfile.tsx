// May require suppressHydrationWarning in html of layout.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from './InputField'
import { usePathname } from 'next/navigation'

// Zod validation imports:
import { zodResolver } from '@hookform/resolvers/zod'
import { accountProfileSchema } from '@/lib/zod/accountProfile.schema'
import { AccountProfileFormProps } from '@/lib/types'
import { UploadButton } from '@/lib/uploadthing'
import { UserProfileProps } from '@/lib/types'
import { updateUser } from '@/lib/actions/user.actions'
import { TextareaInput } from './TextareaInput'
import SelectIcon from '../icons/SelectIcon'
import Loading from '../shared/Loading'

export default function AccountProfileForm({
  user
}: {
  user: UserProfileProps
}) {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<null | string>(null)
  const [imageError, setImageError] = useState<null | string>(null)
  const pathname = usePathname()

  console.log('user', user)

  useEffect(() => {
    if (user.image) {
      setImageUrl(user.image)
    }
  }, [setImageUrl, user.image])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitSuccessful }
  } = useForm<AccountProfileFormProps>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(accountProfileSchema),
    defaultValues: {
      image: user?.image ? user.image : '',
      name: user?.name ? user.name : '',
      username: user?.username ? user.username : '',
      bio: user?.bio ? user.bio : null
    }
  })

  async function onSubmit(data: AccountProfileFormProps) {
    setLoading(true)
    try {
      await updateUser({
        userId: user.id,
        username: data.username,
        name: data.name,
        bio: data.bio,
        image: imageUrl,
        path: pathname
      })
      console.log('Update user success!')
    } catch (error) {
      console.log('server action error: ', error)
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
        <div className='container py-4 custom-shadow '>
          <h1 className='text-xl font-semibold'>Complete Your Profile</h1>
          <form className='m-2 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div>
              <InputField
                type='text'
                id='name'
                label='Your Name'
                placeholder='Enter your name'
                inputClasses='w-full max-w-[450px]'
                {...register('name')}
                error={errors.name}
              />
            </div>
            {/* Username field */}
            <div>
              <InputField
                type='text'
                id='username'
                label='Your Username'
                placeholder='Enter your username'
                inputClasses='w-full max-w-[450px]'
                {...register('username')}
                error={errors.username}
              />
            </div>
            {/* Image field */}{' '}
            <div className='mb-4 flex min-h-20 flex-col'>
              <p className='text ml-1 font-medium'>Profile Picture</p>

              {!imageUrl ? (
                <div className='flex flex-col'>
                  <UploadButton
                    className='p-1'
                    appearance={{
                      container: 'flex flex-row justify-start gap-4',
                      button:
                        'text-jet bg-secondary-500 hover:bg-secondaryLight transition-colors transition-300'
                    }}
                    endpoint='imageUploader'
                    onClientUploadComplete={res => {
                      setImageUrl(res[0].url)
                    }}
                    onUploadError={(error: Error) => {
                      setImageError(error.message)
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
                id='bio'
                label='Your Bio'
                placeholder='Enter something about yourself!'
                inputClasses='w-full'
                {...register('bio')}
                error={errors.bio}
              />
            </div>
            <div>
              <button
                type='submit'
                className='transition-300 text-jet ml-1 mt-4 rounded-md bg-secondary-500 p-2 px-4 transition-colors hover:bg-secondaryLight disabled:bg-secondary-200'
                disabled={!imageUrl}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
