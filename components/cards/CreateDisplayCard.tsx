import React from 'react'
import Image from 'next/image'
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

  return (
    <SearchCardContainer
      link={`/reactor/createview/${createType}/${_id}`}
      image={creatorImage}
      underlineColor='bg-secondary-100 dark:bg-secondary-500'
    >
      <div className='ml-3 mt-1 flex flex-1 flex-row justify-between'>
        <div className='flex flex-col'>
          <p className='text-md'>
            <span className='font-bold'>{title}</span> - {createType}
          </p>
          <p className='mt-1 text-sm '>
            {/* Only displays username if in props */}
            {username && (
              <span>
                Created by: <span className='font-bold'>{username}</span> -{' '}
              </span>
            )}
            {formatDateString(createdAt)}
          </p>
        </div>

        <div className='mt-3 flex gap-3'>
          {currentUserId && currentUserId === creatorUserId && (
            <DeleteThread createId={_id.toString()} />
          )}
          <SelectIcon iconClasses='h-6 w-6' iconSelection='heart' />
          <SelectIcon iconClasses='h-6 w-6' iconSelection='reply' />
          <SelectIcon iconClasses='h-6 w-6' iconSelection='share' />
        </div>
      </div>
    </SearchCardContainer>
  )
}

export default CreateDisplayCard
