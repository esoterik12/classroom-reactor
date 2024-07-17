import { ReactElement } from 'react'

interface BasicPageContainerProps {
  children: ReactElement
}

const BasicPageContainer = ({ children }: BasicPageContainerProps) => {
  return (
    // Responsive margin bot to account for mobile nav bar
    <main className='mb-20 flex min-h-screen flex-col items-center mx-6 my-2 md:mb-4 rounded-md border border-grayLight-500 shadow-md dark:border-jet-500'>
      {children}
    </main>
  )
}

export default BasicPageContainer
