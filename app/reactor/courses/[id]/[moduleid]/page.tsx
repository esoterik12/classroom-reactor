import { fetchModule } from '@/lib/actions/module.actions'
import React from 'react'
import { serialize } from '@/lib/slate/serialize'
import ModuleContainer from '@/components/containers/ModuleContainer'
import { currentUser } from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import BasicPageContainer from '@/components/containers/BasicPageContainer'

const Page = async ({
  params
}: {
  params: { id: string; moduleid: string }
}) => {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  // Fetched module from db in JSON format
  const fetchedModule = await fetchModule(params.moduleid)

  // Convert to slate object
  const parsedModule = await JSON.parse(fetchedModule.htmlContent)

  // Format for serialize function (function from Slate docs - developed)
  const editor = {
    type: 'document',
    children: parsedModule
  }

  const serializedModule = serialize(editor)

  return (
    <BasicPageContainer>
      <ModuleContainer
        userMongoId={userInfo._id.toString()}
        permissions={userInfo.permissions}
        courseId={params.id}
        moduleId={fetchedModule._id.toString()}
        moduleTitle={fetchedModule.moduleTitle}
        unit={fetchedModule.unit}
        createdAt={fetchedModule.createdAt}
        serializedModule={serializedModule}
        parsedModule={parsedModule}
      />
    </BasicPageContainer>
  )
}

export default Page
