import { fetchUserCreates } from '@/lib/actions/user.actions'
import Image from 'next/image'
import Link from 'next/link'
import SelectIcon from '../icons/SelectIcon'
import { formatDateString } from '@/lib/utils'
import DeleteThread from '../forms/DeleteThread'

interface IShowCreates {
  userId: string
  username: string
  userImage: string
}

const ShowCreates = async ({ userId, username, userImage }: IShowCreates) => {
  const result = await fetchUserCreates(userId)
  console.log('result', result)
  let isComment = true // Placeholder

  return (
    <>
      <div className='mb-6 text-lg font-semibold text-gray-900'>
        {username}'s Latest Creates
      </div>
      {result.map(item => (
        <article
          key={item._id}
          className={`flex w-full mt-2 flex-col rounded-xl ${
            isComment ? 'px-4 sm:px-7' : 'bg-gray-200 p-7'
          } mb-4 shadow-md`}
        >
          <div className='flex items-start justify-between'>
            <div className='flex w-full gap-4'>
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
                  <Link href={`/reactor/createview/${item.createType}/${item._id}`}>
                  <p className='text-md mt-2 text-gray-700'>
                    <span className='font-bold'>{item.content.title}</span> - {item.createType}
                  </p>
                  </Link>
                  <p className='mt-1 text-sm text-gray-500'>
                    {formatDateString(item.createdAt)}
                  </p>
                </div>

                <div className='mt-7 flex gap-3'>
                  <SelectIcon iconClasses='h-6 w-6' iconSelection='heart' />
                  <SelectIcon iconClasses='h-6 w-6' iconSelection='reply' />
                  <SelectIcon iconClasses='h-6 w-6' iconSelection='share' />
                  <DeleteThread createId={item._id.toString()}/>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  )
}

export default ShowCreates
