'use client'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CommentFormProps } from '../../lib/types'
import { commentSchema } from '@/lib/zod/comment.schema'
import { usePathname } from 'next/navigation'
import { addCourseComment } from '@/lib/actions/comment.actions'
import CustomButton from '../ui/CustomButton'

export interface AddCommentComponentProps {
  userMongoID: string
  courseId: string
}

// Receiving clerk user id
const AddComment = ({ userMongoID, courseId }: AddCommentComponentProps) => {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted }
  } = useForm<CommentFormProps>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(commentSchema),
    defaultValues: {
      commentText: ''
    }
  })

  async function onSubmit(data: CommentFormProps) {
    setLoading(true)
    try {
      // Passing clerk user id - these functions get database user data for comment save
      if (courseId) {
        await addCourseComment({
          commentText: data.commentText,
          userMongoID,
          pathname,
          courseId
        })
      } else {
        throw new Error('Create or course comment not found.')
      }
      reset()
      console.log('Add comment success!')
    } catch (error) {
      console.log('Server action error; post comment failed: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form
        className='m-2 flex flex-col'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          id='commentText'
          placeholder='Enter a comment'
          type='text'
          className='focus:border-transparent focus:ring-blue-400 ml-1 block w-full rounded-md border border-gray-300 p-1 focus:outline-none focus:ring-2 lg:w-1/2'
          {...register('commentText')}
        />
        <div className='ml-1 mr-1 min-h-8 p-1'>
          {errors.commentText && (
            <p className='text-red-400 text-[12px]'>
              {errors.commentText.message}
            </p>
          )}
        </div>
        <div>
          <CustomButton btnType='submit' isDisabled={loading}>
            <p>Comment</p>
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

export default AddComment
