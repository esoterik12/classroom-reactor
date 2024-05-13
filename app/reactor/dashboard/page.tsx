import DUMMY_USER from '@/components/DUMMY_USER'
import Image from 'next/image'

export default function Page() {
  return (
    <main className='flex flex-col items-center justify-between p-6'>
      <p>Dashboard Page</p>
      <DUMMY_USER />
    </main>
  )
}
