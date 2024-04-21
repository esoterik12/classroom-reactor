// May require suppressHydrationWarning in html of layout.tsx
// Input Component designed for text/email to be used in conjunction with ReactHookForm
// Has its own default styles as well as optional props for more Tailwind styling

import React from 'react'
import { FieldError } from 'react-hook-form'

interface ITextareaInputProps {
  id: string
  label: string
  placeholder: string
  containerClasses?: string
  labelClasses?: string
  inputClasses?: string
  error: FieldError | undefined
  maxLength?: number
}

const TextareaInput: React.ForwardRefExoticComponent<
  ITextareaInputProps & React.RefAttributes<HTMLTextAreaElement>
> = React.forwardRef<HTMLTextAreaElement, ITextareaInputProps>(
  (
    {
      id,
      label,
      placeholder,
      containerClasses,
      labelClasses,
      inputClasses,
      error,
      ...rest
    },
    ref
  ) => (
    <div className={`${containerClasses}`}>
      {label && (
        <label
          htmlFor={id}
          className={`${labelClasses} block p-1 font-medium text-gray-500`}
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        placeholder={placeholder}
        className={`${inputClasses} ml-1 block rounded-md border border-gray-300 p-1 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400`}
        {...rest}
      />
      <div className='min-h-8 ml-1.5 mr-1 p-1'>
        <p className='text-[12px] text-red-400'>
          {error ? error.message : '\u00A0'}
        </p>{' '}
      </div>
    </div>
  )
)

TextareaInput.displayName = 'Textarea'

export { TextareaInput }
