'use client'
import { usePathname, useRouter } from 'next/navigation'
import { deleteCreate } from '@/lib/actions/create.actions'
import SelectIcon from '../icons/SelectIcon'

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
  const pathname = usePathname()
  const router = useRouter()
  // if (currentUserId !== authorId || pathname === '/') return null

  return (
    <button
      onClick={async () => {
        await deleteCreate(createId, pathname)
        router.refresh()
      }}
    >
      <SelectIcon
        iconClasses='h-6 w-6 mb-4 cursor-pointer object-contain'
        iconSelection='delete'
      />
    </button>
  )
}

export default DeleteThread
