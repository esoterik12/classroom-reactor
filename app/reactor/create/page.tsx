import BasicPageContainer from '@/components/containers/BasicPageContainer'
import CreateCard from '@/components/shared/CreateCard'
import { createCardContent } from '@/lib/constants/createCardContent'

export default function Page() {
  return (
    <BasicPageContainer>
      <main className='flex flex-wrap gap-6'>
        {createCardContent.map(item => (
          <CreateCard
            key={item.id}
            title={item.title}
            details={item.details}
            link={item.link}
            icon={item.icon}
            content={item.content}
          />
        ))}
      </main>
    </BasicPageContainer>
  )
}
