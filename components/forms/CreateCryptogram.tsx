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
import CreateCardPopover from '@/components/shared/CreateCardPopover'
import { TextareaInput } from '@/components/forms/TextareaInput'
import { postCreate } from '@/lib/actions/create.actions'

export default function CreateCryptogram({ userId }: { userId: string }) {
  const [serverResponse, setServerResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICryptogram>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(cryptogramSchema),
    defaultValues: {
      title: '',
      text: ''
    }
  })

  async function onSubmit(data: ICryptogram) {
    setLoading(true)

    try {
      await postCreate({
        text: data.text,
        title: data.title,
        creator: userId,
        path: pathname,
        createType: 'cryptogram',
        course: 'CC11'
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
    <div className='m-6 flex flex-col rounded-md custom-shadow'>
      {/* Main Header Div */}
      <div
        className='flex h-16 w-full flex-row items-center justify-between gap-1 rounded-md bg-grayLight-500
       text-jet-500'
      >
        <div>
          <h1 className='text-md ml-4 font-semibold md:text-xl'>
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
