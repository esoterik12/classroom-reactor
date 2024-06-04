import { fetchModule } from '@/lib/actions/module.actions'
import React from 'react'
import { serialize } from '@/lib/slate/serialize'
import ModuleContainer from '@/components/containers/ModuleContainer'

const Page = async ({ params }: { params: { moduleid: string } }) => {
  // Fetched module from db in JSON format
  const module = await fetchModule(params.moduleid)
  console.log('module', module)
  // Convert to slate object
  const parsedModule = await JSON.parse(module.htmlContent)
  // console.log('parsedModule', parsedModule)

  // format for serialize function (function from Slate docs - developed)
  const editor = {
    type: 'document',
    children: parsedModule
  }

  const serializedModule = serialize(editor)

  return (
    <ModuleContainer
      moduleTitle={module.moduleTitle}
      unit={module.unit}
      createdAt={module.createdAt}
      serializedModule={serializedModule}
    />
  )
}

export default Page
