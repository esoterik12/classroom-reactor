import { ReactElement } from 'react'
import BackButton from '../ui/BackButton'
import SelectIcon from '../icons/SelectIcon'

interface BasicPageContainerProps {
  children: ReactElement
}

const BasicPageContainer = ({ children }: BasicPageContainerProps) => {
  return (
    <main className='flex min-h-screen w-full flex-col items-center p-6'>
      <BackButton classes=''>
        <SelectIcon iconClasses='h-6 w-6 text-gray-500' iconSelection='back' />
      </BackButton>
      {children}
    </main>
  )
}

export default BasicPageContainer
