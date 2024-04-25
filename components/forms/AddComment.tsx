'use client'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { IComment } from '@/lib/types'
import { commentSchema } from '@/lib/zod/comment.schema'

interface IAddComment {
  userId: string
}

const AddComment = ({ userId }: IAddComment) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted }
  } = useForm<IComment>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(commentSchema),
    defaultValues:{
      commentText: ''
    }
  })

  // TODO: connect to server action, add to frontend, test DB model

  return (
    <div>
      <input
        id='commentText'
        placeholder='Enter a comment'
        type='text'
        className='focus:border-transparent focus:ring-blue-400 ml-1 block rounded-md border border-gray-300 p-1 focus:outline-none focus:ring-2'
        {...register('commentText')}
      />
            <div className='ml-1 mr-1 min-h-8 p-1'>
        {errors.commentText && <p className='text-[12px] text-red-400'>{errors.commentText.message}</p>}
      </div>
    </div>
  )
}

export default AddComment
