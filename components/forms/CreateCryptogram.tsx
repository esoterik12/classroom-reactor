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
import BackButton from '../ui/BackButton'
import SelectIcon from '../icons/SelectIcon'
import { useRouter } from 'next/navigation'
import Loading from '../shared/Loading'

export default function CreateCryptogram({
  userId,
  clerkId,
}: {
  userId: string
  clerkId: string
}) {
  // UNFINISHED: Incorporate error to show server error if necessary
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted }
  } = useForm<ICryptogram>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(cryptogramSchema),
    defaultValues: {
      title: '',
      text: '',
      givenLetters: ''
    }
  })

  async function onSubmit(data: ICryptogram) {
    setLoading(true)

    try {
      const postedCreateId = await postCreate({
        content: {
          text: data.text,
          title: data.title,
          givenLetters: data.givenLetters
        },
        creator: userId,
        creatorClerkId: clerkId.toString(),
        createType: 'cryptogram',
        course: 'CC11',
      })
      console.log('Add create success!')
      router.push(`/reactor/createview/cryptogram/${postedCreateId}`)
    } catch (error) {
      console.log('server action error: ', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || isSubmitted) {
    return (
      <div>
        <Loading text='Creating...' />
      </div>
    )
  }

  return (
    <div className='mx-6 my-2 flex flex-col rounded-md custom-shadow'>
      {/* Main Header Div */}
      <div
        className='flex h-12 w-full flex-row items-center justify-between gap-1 rounded-md'
      >
        {/* Title Div */}
        <div className='ml-3 flex flex-row gap-2'>
          {/* <Image className='ml-3' alt='cryptogram logo' src="/cryptogramLogo.png" height={35} width={35} /> */}
          <BackButton classes=''>
            <SelectIcon
              iconClasses='h-6 w-6 text-gray-500'
              iconSelection='back'
            />
          </BackButton>
          <h1 className='text-md font-semibold md:text-xl'>
            Create a Cryptogram
          </h1>
        </div>
        <div className=''>
          <CreateCardPopover
            buttonText='Learn more'
            title='Cryptogram Details'
            description='Each letter of the alphabet is given a number. Players work to decode the cryptogram.'
            tips={[
              'Use vocabulary words',
              'Give 6-10 letters to make it easier'
            ]}
          />
        </div>
      </div>
      <form
        className='m-2 flex flex-col'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex w-full flex-col gap-4 md:flex-row'>
          {/* Input Left Side */}
          <div className='flex w-full flex-col md:w-1/2'>
            {/* Title Field */}
            <div>
              <InputField
                type='text'
                id='title'
                label='Title'
                placeholder='Enter a title'
                inputClasses='w-full'
                {...register('title')}
                error={errors.title}
              />
            </div>
            {/* Username field */}

            <div className=''>
              <TextareaInput
                id='text'
                label='Sentence'
                placeholder='Enter your sentence'
                inputClasses='w-full'
                {...register('text')}
                error={errors.text}
              />
            </div>

            {/* Given Letters Field */}
            <div>
              <InputField
                type='text'
                id='givenLetters'
                label='Given Letters'
                placeholder='Enter a title'
                inputClasses='w-full'
                {...register('givenLetters')}
                error={errors.givenLetters}
              />
            </div>
          </div>

          {/* Preview Right Side */}
          <div className='m-2 w-1/2'>
            <p className='font-medium text-gray-500'>Cryotpgram Example</p>
          </div>
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
