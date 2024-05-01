'use client'
import { usePathname, useRouter } from 'next/navigation'
import { deleteCreate } from '@/lib/actions/create.actions'
import SelectIcon from '../icons/SelectIcon'
import { useState } from 'react'

interface IDeleteThread {
  createId: string
  // currentUserId: string
  // authorId: string
  // parentId: string | null
  // isComment?: boolean
}

function DeleteThread({
  createId
  // currentUserId,
  // authorId,
}: IDeleteThread) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  // if (currentUserId !== authorId || pathname === '/') return null

  return (
    <button
      onClick={async () => {
        setIsLoading(true)
        await deleteCreate(createId)
        setIsLoading(false)
        router.refresh()
      }}
      disabled={isLoading}
    >
      <SelectIcon
        iconClasses={`h-6 w-6 mb-4 cursor-pointer object-contain ${isLoading ? 'text-gray-500' : ''}`}
        iconSelection='delete'
      />
    </button>
  )
}

export default DeleteThread
