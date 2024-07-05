import { formatTimeSince } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import TextLink from '../ui/TextLink'

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
            <div className='flex flex-row'>
              <TextLink
                href={`/reactor/profile/${authorClerkId}`}
                className='w-fit'
              >
                <p className='cursor-pointer text-xs '>{authorUsername}&nbsp;</p>
              </TextLink>
              <p className='text-xs text-gray-500'>
                {formatTimeSince(createdAt)}
              </p>
            </div>

            <p className='text-small-regular text-light-2 mt-2'>{text}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CommentCard
