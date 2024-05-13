// Used in Search results and profile page

import Link from 'next/link'
import Image from 'next/image'

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
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-6'>
          <div className='relative object-cover'>
            {imgUrl ? (
              <Image
                src={imgUrl}
                alt='logo'
                height={type ? 48: 96}
                width={type ? 48: 96}
                className='rounded-full object-cover shadow-md'
              />
            ) : (
              <p>No Image</p>
            )}
          </div>

          <div className='flex-1'>
            <h2 className='text-left text-gray-500'>{name}</h2>
            <p className='text-xl font-semibold'>@{username}</p>
            {accountId === authUserId && type !== 'Community' && (
              <Link href='/reactor/profile/edit'>
                <div className='mt-2 cursor-pointer rounded-lg'>
                  <p className='hover:text-secondary text-xs text-primary-500 transition-colors duration-300'>
                    Edit Profile
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
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
