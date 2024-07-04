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
    <button
      className={`${props.classes} transition-colors duration-150 hover:text-gray-300 `}
      onClick={() => router.back()}
    >
      {props.children}
    </button>
  )
}

export default BackButton
