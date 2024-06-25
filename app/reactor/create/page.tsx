import CreateCard from '@/components/shared/CreateCard'
import { createCardContent } from '@/lib/constants/createCardContent'

export default function Page() {
  return (
    <main className='flex flex-wrap gap-6 px-6 py-2'>
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
  )
}
