import { fetchModule } from '@/lib/actions/module.actions'
import React from 'react'
import { serialize } from '@/lib/slate/serialize'
import BasicPageContainer from '@/components/containers/BasicPageContainer'

const Page = async ({ params }: { params: { moduleid: string } }) => {
  // Fetch module from db (in JSON format)
  const module = await fetchModule(params.moduleid)
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
    <BasicPageContainer>
      <div className='w-full' dangerouslySetInnerHTML={{ __html: serializedModule }}></div>
    </BasicPageContainer>
  )
}

export default Page
