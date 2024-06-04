import { ReactElement } from 'react'

interface BasicPageContainerProps {
  children: ReactElement
}

const BasicPageContainer = ({ children }: BasicPageContainerProps) => {
  return (
    <main className='flex min-h-screen w-full flex-col items-center p-6'>
      {children}
    </main>
  )
}

export default BasicPageContainer
