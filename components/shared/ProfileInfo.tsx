// Used in profile page
// Can be used to display user for search or other reasons

import Link from 'next/link'
import Image from 'next/image'
import TextLink from '../ui/TextLink'

interface Props {
  accountId: string
  authUserId: string
  name: string
  username: string
  imgUrl: string
  bio?: string
  type?: string
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type
}: Props) {
  return (
    <div className='flex w-full flex-col justify-start'>
      {/* Header Div - conditional styling depending on profile page or search results */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-6'>
          <div className='hidden md:block relative object-cover'>
            {imgUrl ? (
              <Image
                src={imgUrl}
                alt='logo'
                height={type ? 48 : 96}
                width={type ? 48 : 96}
                className='rounded-full object-cover shadow-md'
              />
            ) : (
              <p>No Image</p>
            )}
          </div>

          <div className='p-1'>
            <p className='text-sm md:text-lg text-left text-gray-500'>{name}</p>
            <p className='text-sm md:text-xl font-semibold'>@{username}</p>
            {accountId === authUserId && type !== 'search' && (
              <TextLink href='/reactor/profile/edit'>
                <div className='mt-2 cursor-pointer rounded-lg'>
                  <p className='text-xs'>Edit Profile</p>
                </div>
              </TextLink>
            )}
          </div>
        </div>
      </div>

      {/* Conditional bio div not used in search results */}
      {bio && (
        <>
          <p className='text-base-regular text-light-2 mt-6 max-w-lg text-sm text-gray-500'>
            User Bio:
          </p>
          <p className='text-base-regular text-light-2 max-w-lg'>{bio}</p>
          <div className='bg-dark-3 mt-12 h-0.5 w-full' />
        </>
      )}
    </div>
  )
}

export default ProfileHeader
