'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

interface IBackButton {
  classes: string
  children: React.ReactNode
}

const BackButton = (props: IBackButton) => {
  const router = useRouter()

  return (
    <button className={props.classes} onClick={() => router.back()}>
      {props.children}
    </button>
  )
}

export default BackButton
