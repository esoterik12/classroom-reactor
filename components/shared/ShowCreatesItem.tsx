// Single bar/card that shows a summary of a Create item
import Image from 'next/image'
import Link from 'next/link'
import SelectIcon from '../icons/SelectIcon'
import { formatDateString } from '@/lib/utils'

interface ShowCreatesItem {
  createId: string
  userId: string
  username: string
  userImage: string
  title: string
  createdAt: string
  createType: string
}

const ShowCreatesItem = async ({
  createId,
  userId,
  username,
  userImage,
  title,
  createdAt,
  createType
}: ShowCreatesItem) => {
  let isComment = true // Placeholder

  return (
    <article
      className={`mt-2 flex w-full flex-col rounded-xl ${
        isComment ? 'px-4 sm:px-7' : 'bg-gray-200 p-7'
      } mb-4 shadow-md`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex w-full gap-4'>
          {/* DISABLED UNTIL CREATE MODEL UPDATED  */}
          {/* ADD USERNAME AND IMAGE URL */}
          <div className='flex flex-col items-center'>
            <Link
              className='relative h-11 w-11'
              href={`/reactor/profile/${userId}`}
            >
              <Image
                src={userImage}
                alt='user_community_image'
                layout='fill'
                className='cursor-pointer rounded-full'
              />
            </Link>
            <div className='mt-2 h-1 w-full bg-gray-300'></div>
          </div>

          <div className='flex flex-1 flex-row justify-between'>
            <div className='mb-3 flex flex-col'>
              <Link href={`/reactor/createview/cryptogram/${createId}`}>
                <p className='text-md mt-2 text-gray-700'>
                  <span className='font-bold'>{title}</span> - {createType}
                </p>
              </Link>
              <p className='mt-1 text-sm text-gray-500'>
                Created by: <span className='font-bold'>{username}</span> -{' '}
                {formatDateString(createdAt)}
              </p>
            </div>

            <div className='mt-7 flex gap-3'>
              <SelectIcon iconClasses='h-6 w-6' iconSelection='heart' />
              <SelectIcon iconClasses='h-6 w-6' iconSelection='reply' />
              <SelectIcon iconClasses='h-6 w-6' iconSelection='share' />
              <SelectIcon iconClasses='h-6 w-6' iconSelection='delete' />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ShowCreatesItem
