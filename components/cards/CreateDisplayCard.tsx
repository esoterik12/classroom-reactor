import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SelectIcon from '../icons/SelectIcon'
import { formatDateString } from '@/lib/utils'
import DeleteThread from '../forms/DeleteThread'

interface ICreateDisplayCard {
  _id: string
  creatorUserId: string
  currentUserId: string
  creatorImage: string
  createType: string
  title: string
  createdAt: string
  username?: string
}

const CreateDisplayCard = ({
  _id,
  creatorUserId,
  currentUserId,
  creatorImage,
  createType,
  createdAt,
  title,
  username
}: ICreateDisplayCard) => {
  // console.log('userId', userId)

  return (
    <article className='mb-4 mt-2 flex w-full flex-col rounded-xl px-4 shadow-md sm:px-7'>
      <div className='flex items-start justify-between'>
        <div className='flex w-full gap-4'>
          <div className='flex flex-col items-center'>
            <Link
              className='relative h-11 w-11'
              href={`/reactor/profile/${creatorUserId}`}
            >
              <Image
                src={creatorImage}
                alt='user_community_image'
                layout='fill'
                className='cursor-pointer rounded-full'
              />
            </Link>
            <div className='mt-2 h-1 w-full bg-gray-300'></div>
          </div>

          <div className='flex flex-1 flex-row justify-between'>
            <div className='mb-3 flex flex-col'>
              <Link href={`/reactor/createview/${createType}/${_id}`}>
                <p className='text-md mt-2 text-gray-500'>
                  <span className='font-bold'>{title}</span> - {createType}
                </p>
              </Link>
              <p className='mt-1 text-sm text-gray-500'>
                {/* Only displays username if in props */}
                {username && (
                  <span>
                    Created by: <span className='font-bold'>{username}</span> -{' '}
                  </span>
                )}
                {formatDateString(createdAt)}
              </p>
            </div>

            <div className='mt-7 flex gap-3'>
              {currentUserId === creatorUserId && (
                <DeleteThread createId={_id.toString()} />
              )}
              <SelectIcon iconClasses='h-6 w-6' iconSelection='heart' />
              <SelectIcon iconClasses='h-6 w-6' iconSelection='reply' />
              <SelectIcon iconClasses='h-6 w-6' iconSelection='share' />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CreateDisplayCard
