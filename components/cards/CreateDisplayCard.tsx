import React from 'react'
import Link from 'next/link'
import SelectIcon from '../icons/SelectIcon'
import { formatDateString } from '@/lib/utils'
import DeleteThread from '../forms/DeleteThread'
import SearchCardContainer from '../containers/SearchCardContainer'

interface ICreateDisplayCard {
  _id: string
  creatorUserId: string
  currentUserId?: string
  creatorImage: string
  createType: string
  title: string
  createdAt: string
  commentNumber: number
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
  commentNumber,
  username
}: ICreateDisplayCard) => {
  return (
    <SearchCardContainer
      image={creatorImage}
      underlineColor='bg-secondary-100 dark:bg-secondary-500'
    >
      <div className='ml-3 mt-1 flex flex-1 flex-row justify-between'>
        <Link
          href={`/reactor/createview/${createType}/${_id}`}
          className='w-1/2 md:w-3/4'
        >
          <div className='flex flex-col'>
            <p className='text-md'>
              <span className='font-bold'>{title}</span> - {createType}
            </p>
            <p className='mt-1 hidden text-sm md:block'>
              {/* Only displays username if in props */}
              {username && (
                <span>
                  Created by: <span className='font-bold'>{username}</span> -{' '}
                </span>
              )}
              {formatDateString(createdAt)}
            </p>
          </div>
        </Link>

        <div className='mt-3 flex gap-3'>
          {currentUserId && currentUserId === creatorUserId && (
            <DeleteThread createId={_id.toString()} />
          )}
          {/* <SelectIcon iconClasses='h-6 w-6' iconSelection='heart' /> */}
          <div className='relative w-6'>
            <SelectIcon iconClasses='h-7 w-7 absolute' iconSelection='reply' />

            {commentNumber > 9 ? (
              <p className='absolute ml-1.5 mt-1 text-xs font-bold text-secondary-500 dark:text-primary-500'>
                9+
              </p>
            ) : (
              <p className='absolute ml-2.5 mt-1 text-xs font-bold text-secondary-500 dark:text-primary-500'>
                {commentNumber}
              </p>
            )}
          </div>
          {/* <SelectIcon iconClasses='h-6 w-6' iconSelection='share' /> */}
        </div>
      </div>
    </SearchCardContainer>
  )
}

export default CreateDisplayCard
