'use client'
import { MouseEventHandler } from 'react'

export interface CustomButtonProps {
  children: React.ReactElement
  isDisabled?: boolean
  customClasses?: string
  handleClick?: MouseEventHandler<HTMLButtonElement>
  btnType?: 'button' | 'submit'
  textStyles?: string
}

const CustomButton = ({
  children,
  isDisabled,
  customClasses,
  handleClick,
  btnType,
  textStyles
}: CustomButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      type={btnType || 'button'}
      className={`transition-300 text-jet rounded-md bg-secondary-500 p-2 px-4 transition-colors hover:bg-secondaryLight disabled:cursor-not-allowed dark:text-jet-500 ${customClasses}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{children}</span>
    </button>
  )
}

export default CustomButton
