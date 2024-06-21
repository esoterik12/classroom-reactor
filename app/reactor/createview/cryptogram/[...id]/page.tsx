import React from 'react'
import AddComment from '@/components/forms/AddComment'
import { currentUser } from '@clerk/nextjs'
import { fetchSingleCreate } from '@/lib/actions/create.actions'
import CommentCard from '@/components/cards/CommentCard'
import BackButton from '@/components/ui/BackButton'
import SelectIcon from '@/components/icons/SelectIcon'
import { formatDateString } from '@/lib/utils'
import Link from 'next/link'
import ShowCryptogram from '@/components/display/ShowCryptogram'

export interface FetchedCommentProps {
  _id: string
  text: string
  authorMongoId: string
  authorClerkId: string
  authorUsername: string
  authorImage: string
  parentId: string
  children: FetchedCommentProps
  createdAt: Date
}

const ViewCryptogramPage = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null

  const user = await currentUser()
  if (!user) return null

  const fetchedCreate = await fetchSingleCreate(params.id)

  return (
    <div className='m-3 flex flex-col rounded-lg  border-gray-100 p-2 shadow-sm'>
      <div className='flex flex-row justify-between'>
        {/* Left Side Header Section */}
        <div>
          <BackButton classes='flex flex-row gap-1 text-gray-500'>
            <SelectIcon iconClasses='h-6 w-6' iconSelection='back' /> Back
          </BackButton>
          <p className='mt-1 text-lg font-semibold'>
            {fetchedCreate.content.title}
          </p>
          <p className='capitalize text-sm text-gray-500'>{fetchedCreate.createType}</p>
        </div>

        {/* Riight Side Header Section */}
        <div className='flex flex-col items-end text-sm text-gray-500'>
          <p className='mt-1 flex flex-row '>
            <span className='mr-1 hidden sm:block'>Created on: </span>
            {formatDateString(fetchedCreate.createdAt)}
          </p>
          <Link href={`/reactor/profile/${fetchedCreate.creatorClerkId}`}>
            <p className='text-sm text-gray-500'>
              by {fetchedCreate.creatorUsername}
            </p>
          </Link>
        </div>
      </div>

      {/* Content Display - Clinet Comp */}
      <div>
        <ShowCryptogram 
          content={fetchedCreate.content}
          title={fetchedCreate.title}
        />
      </div>
      {/* <p>{fetchedCreate.content.text}</p> */}

      <div className='mt-6'>
        <AddComment clerkUserId={user.id} createId={params.id} />
        {fetchedCreate.children.map((item: FetchedCommentProps) => (
          <CommentCard
            key={item._id}
            _id={item._id}
            text={item.text}
            authorUsername={item.authorUsername}
            authorClerkId={item.authorClerkId}
            authorImage={item.authorImage}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </div>
  )
}

export default ViewCryptogramPage
