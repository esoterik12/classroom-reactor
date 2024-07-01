import React from 'react'
import AddComment from '@/components/forms/AddComment'
import { currentUser } from '@clerk/nextjs'
import { fetchSingleCreate } from '@/lib/actions/create.actions'
import CommentCard from '@/components/cards/CommentCard'
import BackButton from '@/components/ui/BackButton'
import SelectIcon from '@/components/icons/SelectIcon'
import { formatDateString } from '@/lib/utils'
import Link from 'next/link'
import { FetchedCommentProps } from '@/lib/types'

const ViewWordScramblePage = async ({ params }: { params: { id: string } }) => {
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
          <p className='text-sm capitalize text-gray-500'>
            {fetchedCreate.createType}
          </p>
        </div>

        {/* Riight Side Header Section */}
        <div className='flex flex-col items-end text-sm text-gray-500'>
          <p className='mt-1 flex flex-row '>
            <span className='mr-1 hidden sm:block'>Created on: </span>
            {formatDateString(fetchedCreate.createdAt)}
          </p>

          <p className='text-sm text-gray-500'>
            by{' '}
            <Link href={`/reactor/profile/${fetchedCreate.creator.id}`}>
              {fetchedCreate.creator.username}
            </Link>
          </p>
        </div>
      </div>

      {/* Content Display - Clinet Comp */}
      <div className='mx-3 mt-4 flex flex-col rounded-lg border text-center align-middle'>
        <div className='flex flex-col items-center text-center'>
          <div className='my-4 grid grid-cols-4 gap-2'>
            {fetchedCreate.content.content.map(
              (word: string, index: number) => (
                <div className='p-4 text-xl' key={index}>
                  <p className='mb-4'>{word}</p>
                  <p>_____________</p>
                </div>
              )
            )}
          </div>
        </div>
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

export default ViewWordScramblePage
