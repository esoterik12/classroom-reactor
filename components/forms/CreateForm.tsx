// May require suppressHydrationWarning in html of layout.tsx
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '@/components/forms/InputField'
import { usePathname } from 'next/navigation'
// Zod validation imports:
import { zodResolver } from '@hookform/resolvers/zod'
import { cryptogramSchema } from '@/lib/zod/materials.schema'
import { ICryptogram } from '@/lib/types'
import Loading from '../shared/Loading'
import CreateCardPopover from '@/components/shared/CreateCardPopover'
import { TextareaInput } from '@/components/forms/TextareaInput'
import { postCreate } from '@/lib/actions/create.actions'
import { ZodSchema } from 'zod'

// Posisbly not fully updated since changes to CreateCryptogram.tsx

interface ICreateForm<T> {
  initialFormValues: T
  userId: string,
  username: string
  userImage: string
}

interface FormData {
  title: string
  text: string
}

function CreateForm<T extends FormData>({
  initialFormValues,
  userId,
  username,
  userImage
}: ICreateForm<T>) {
  const [serverResponse, setServerResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(cryptogramSchema),
    defaultValues: initialFormValues
  })

  async function onSubmit(data: FormData) {
    setLoading(true)

    try {
      await postCreate({
        content: { text: data.text, title: data.title },
        creator: userId,
        createType: 'cryptogram',
        course: 'CC11',
        creatorUsername: username,
        creatorImage: userImage
      })
      console.log('Add create success!')
    } catch (error) {
      console.log('server action error: ', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center pt-24 align-middle'>
        <p className='m-6'>Loading...</p>
        <Loading />
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
    <div className='m-6 flex flex-col rounded-md custom-shadow'>
      {/* Main Header Div */}
      <div
        className='flex h-16 w-full flex-row items-center justify-between gap-1 rounded-md bg-grayLight-500
       text-jet-500'
      >
        <div className='flex flex-row'>
          {/* <Image className='ml-3' alt='cryptogram logo' src="/cryptogramLogo.png" height={35} width={35} /> */}
          <h1 className='text-md ml-3 mt-1 font-semibold md:text-xl'>
            Create a Cryptogram
          </h1>
        </div>
        <div className=''>
          <CreateCardPopover />
        </div>
      </div>
      <form
        className='m-2 flex flex-col'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title Field */}
        <div>
          <InputField
            type='text'
            id='title'
            label='Title'
            placeholder='Enter a title'
            inputClasses='w-full max-w-[450px]'
            {...register('title')}
            error={errors.title}
          />
        </div>
        {/* Username field */}

        <div className='min-h-40'>
          <TextareaInput
            id='text'
            label='Sentence'
            placeholder='Enter your sentence'
            inputClasses='w-full max-w-[450px]'
            {...register('text')}
            error={errors.text}
          />
        </div>

        <div>
          <button
            type='submit'
            className='transition-300 text-jet ml-1 mt-4 rounded-md bg-secondary-500 p-2 px-4 transition-colors hover:bg-secondaryLight disabled:cursor-not-allowed'
            disabled={false}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateForm
