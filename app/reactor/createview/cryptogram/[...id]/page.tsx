import React from 'react'
import AddComment from '@/components/forms/AddComment'
import { currentUser } from '@clerk/nextjs'
import { fetchSingleCreate } from '@/lib/actions/create.actions'
import CommentCard from '@/components/cards/CommentCard'

interface IFetchedCreateComment {
  _id: string
  text: string
  authorMongoId: string
  authorClerkId: string
  authorUsername: string
  authorImage: string
  parentId: string
  children: IFetchedCreateComment
  createdAt: Date
  __v: number
}

const ViewCryptogramPage = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null

  const user = await currentUser()
  if (!user) return null

  const fetchedCreate = await fetchSingleCreate(params.id)

  // console.log('fetchedCreate', fetchedCreate)

  return (
    <div>
      <h2>Create details</h2>
      <p>{fetchedCreate.content.title}</p>
      <p>{fetchedCreate.content.text}</p>

      <AddComment clerkUserId={user.id} createId={params.id} />
      {fetchedCreate.children.map((item: IFetchedCreateComment) => (
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
  )
}

export default ViewCryptogramPage
