import BotBarMobileOnly from '@/components/shared/BotBarMobileOnly'
import SideBar from '@/components/shared/SideBar'
import React, { ReactNode } from 'react'

interface IReactorLayout {
  children: ReactNode
}

const ReactorLayout = ({children}: IReactorLayout) => {
  return (
    <main className='flex flex-row'>
      <SideBar />
      <section className='main-container'>
        <div className='w-full max-w-4xl'>{children}</div>
      </section>
      {/* @ts-ignore */}
      <BotBarMobileOnly />
    </main>
  )
}

export default ReactorLayout
