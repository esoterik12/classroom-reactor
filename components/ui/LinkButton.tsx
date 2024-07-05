import React from 'react'
import Link from 'next/link'

type LinkButtonProps = {
  href: string
  children: React.ReactElement
  customClasses?: string
}

const LinkButton = ({
  children,
  href = '/',
  customClasses
}: LinkButtonProps) => {
  return (
    <Link href={href}>
      <button
        className={`transition-300 text-jet rounded-md bg-secondary-500 p-2 px-4 transition-colors hover:bg-secondaryLight disabled:cursor-not-allowed dark:text-jet-500 ${customClasses}`}
      >
        {children}
      </button>
    </Link>
  )
}

export default LinkButton
