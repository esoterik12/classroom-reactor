// May require suppressHydrationWarning in html of layout.tsx
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from './InputField'
import { redirect, usePathname } from 'next/navigation'

// Zod validation imports:
import { zodResolver } from '@hookform/resolvers/zod'
import { accountProfileSchema } from '@/lib/zod/accountProfile.schema'
import { IAccountProfileForm } from '@/lib/types'
import { UploadButton } from '@/lib/uploadthing'
import { IUserProfile } from '@/lib/types'
import { updateUser } from '@/lib/actions/user.actions'
import { TextareaInput } from './TextareaInput'
import SelectIcon from '../icons/SelectIcon'
import { revalidatePath } from 'next/cache'

export default function AccountProfileForm({ user }: { user: IUserProfile }) {
  const [serverResponse, setServerResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<null | string>(user.image)
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<IAccountProfileForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(accountProfileSchema),
    defaultValues: {
      image: user?.image ? user.image : '',
      name: user?.name ? user.name : '',
      username: user?.username ? user.username : '',
      bio: user?.bio ? user.bio : ''
    }
  })

  async function onSubmit() {
    const values = getValues()
    setLoading(true)

    try {
      await updateUser({
        userId: user.id,
        username: values.username,
        name: values.name,
        bio: values.bio,
        image: imageUrl,
        path: pathname
      })
      console.log('Update user success!')
      revalidatePath(`/reactor/profile/${user.id}`) // Revalidate to refresh profile after edit made
    } catch (error) {
      console.log('server action error: ', error)
    } finally {
      setLoading(false)
      redirect(`/reactor/profile/${user.id}`)
    }
  }

  if (loading) {
    return (
      <div className='container'>
        <p>Loading...</p>
      </div>
    )
  }

  if (serverResponse) {
    return (
      <div className='container'>
        <p>{serverResponse}</p>
      </div>
    )
  }

  return (
    <div className='container py-4 custom-shadow '>
      <h1 className='text-xl font-semibold'>Complete Your Profile</h1>
      <form className='m-2 flex flex-col' noValidate action={onSubmit}>
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
        <div className='mb-4 flex flex-col min-h-20'>
          <p className='ml-1 font-medium text'>Profile Picture</p>

          {!imageUrl ? (
            <div className='flex flex-col'>
              <UploadButton
                className='p-1'
                appearance={{
                  container: 'flex flex-row justify-start gap-4',
                  button:
                    'text-jet bg-secondary hover:bg-secondaryLight transition-colors transition-300'
                }}
                endpoint='imageUploader'
                onClientUploadComplete={res => {
                  // Do something with the response
                  setImageUrl(res[0].url)
                  console.log('Files: ', res[0].url)
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  console.log(`Error uploading image! ${error.message}`)
                }}
              />
            </div>
          ) : (
            <div className='bg-mint flex flex-row gap-2 rounded-l p-2 text-center'>
              <SelectIcon
                iconClasses='h-6 w-6 text-green'
                iconSelection='check'
              />
              <p className=''>Image Uploaded</p>
              <button onClick={() => setImageUrl(null)} className='ml-4'>
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
            className='transition-300 ml-1 mt-4 rounded-md bg-secondary p-2 px-4 text-jet transition-colors hover:bg-secondaryLight disabled:cursor-not-allowed'
            disabled={false}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  )
}
