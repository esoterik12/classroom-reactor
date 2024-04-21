import BotBarMobileOnly from '@/components/shared/BotBarMobileOnly'
import SideBar from '@/components/shared/SideBar'
import React, { ReactNode } from 'react'

interface IReactorLayout {
  children: ReactNode
}

const ReactorLayout = ({ children }: IReactorLayout) => {
  return (
    <main className='flex flex-row text-jet dark:text-offWhite'>
      <SideBar />
      <section className='w-full'>
        <div className=''>{children}</div>
      </section>
      <BotBarMobileOnly />
    </main>
  )
}

export default ReactorLayout
