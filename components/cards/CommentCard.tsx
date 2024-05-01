import { formateTimeSince } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface ICommentCard {
  _id: string
  text: string
  authorUsername: string
  authorClerkId: string
  authorImage: string
  createdAt: Date
  // children: ICommentCard
}

function CommentCard({
  _id,
  text,
  authorUsername,
  authorClerkId,
  authorImage,
  createdAt
}: ICommentCard) {

  return (
    <article className='bg-dark-2 flex w-full flex-col rounded-xl p-2'>
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link
              href={`/profile/${authorClerkId}`}
              className='relative h-11 w-11'
            >
              <Image
                src={authorImage}
                alt='user_community_image'
                fill
                className='cursor-pointer rounded-full'
              />
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <Link href={`/reactor/profile/${authorClerkId}`} className='w-fit'>
              <h4 className='text-xs text-gray-500 cursor-pointer'>
                {authorUsername} - {formateTimeSince(createdAt)}
              </h4>
            </Link>

            <p className='text-small-regular text-light-2 mt-2'>{text}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CommentCard
