// May require suppressHydrationWarning in html of layout.tsx
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '@/components/forms/InputField'
import { usePathname } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { basicCreateSchema } from '@/lib/zod/materials.schema'
import Loading from '../shared/Loading'
import CreateCardPopover from '@/components/shared/CreateCardPopover'
import { TextareaInput } from '@/components/forms/TextareaInput'
import { postCreate } from '@/lib/actions/create.actions'
import BackButton from '../ui/BackButton'
import SelectIcon from '../icons/SelectIcon'
import { useRouter } from 'next/navigation'
import { CreateFormProps } from './CreateWordScramble'

interface SpotItDataProps {
  title: string
  text: string
}

function CreateSpotIt<T extends SpotItDataProps>({
  initialFormValues,
  userId,
}: CreateFormProps<T>) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted }
  } = useForm<SpotItDataProps>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(basicCreateSchema),
    defaultValues: initialFormValues
  })

  async function onSubmit(data: SpotItDataProps) {
    setLoading(true)

    try {
      const postedCreateId = await postCreate({
        content: { text: data.text, title: data.title },
        creator: userId,
        createType: 'spotit',
        creatorClerkId: 'DUMMY',
        course: 'CC11',
      })
      console.log('Add create success!')
      router.push(`/reactor/createview/spotit/${postedCreateId}`)
    } catch (error) {
      console.log('server action error: ', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || isSubmitted) {
    return (
      <div className='flex flex-col items-center justify-center pt-24 align-middle'>
        <Loading text='Loading...' />
      </div>
    )
  }

  return (
    <div className=' flex w-full flex-col'>
      {/* Main Header Div */}
      <div
        className='flex h-16 w-full flex-row items-center justify-between gap-1 rounded-md bg-grayLight-500
       text-jet-500'
      >
        <div className='ml-3 flex flex-row gap-2'>
          {/* <Image className='ml-3' alt='cryptogram logo' src="/cryptogramLogo.png" height={35} width={35} /> */}
          <BackButton classes=''>
            <SelectIcon
              iconClasses='h-6 w-6 text-gray-500'
              iconSelection='back'
            />
          </BackButton>
          <h1 className='text-md font-semibold md:text-xl'>
            Create a SpotIt Game
            queen, well, egg, real, trap, yes, up, in, octopus, punt, awake
          </h1>
        </div>
        <div className=''>
          <CreateCardPopover
            buttonText='Learn more'
            title='SpotIt Details'
            description='Enter a list of words. One letter is randomly chosen to be duplicated. Players race to spot the duplicated word.'
            tips={['Use vocabulary or spelling words', 'Input is case insensitive; all words will be lowercase']}
          />
        </div>
      </div>
      <form
        className='m-2 flex flex-col'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
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

        <div className='min-h-40'>
          <TextareaInput
            id='text'
            label='Words'
            placeholder='Enter your words separated by commas'
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

export default CreateSpotIt
