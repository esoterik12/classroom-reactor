import NewModuleForm from '@/components/forms/NewModule'
import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'


const EditModulePage = async ({ params }: { params: { id: string, courseId: string } }) => {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  return (
    <div>
      <NewModuleForm 
          userId={userInfo._id.toString()} courseId={params.courseId}
      />
    </div>
  )
}

export default EditModulePage