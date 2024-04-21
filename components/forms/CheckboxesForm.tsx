'use client'
import { useForm, Controller } from 'react-hook-form'
import React from 'react'

interface IFormInput {
  selectedServices: string[]
}

export default function CheckboxesForm() {
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      selectedServices: []
    }
  })

  // Placeholder function for test
  const onSubmit = (data: any) => console.log('data', data)

  const options = ['Photographer', 'DJs', 'Live show']

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4>Services</h4>
      {options.map((service, index) => (
        <Controller
          key={service}
          name='selectedServices'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <label>
              <input
                type='checkbox'
                value={service}
                checked={field.value.includes(service)}
                onChange={() => {
                  const newValue = field.value.includes(service)
                    ? field.value.filter(c => c !== service) // Remove color from array
                    : [...field.value, service] // Add color to array
                  field.onChange(newValue) // Update the form value
                }}
              />
              {service}
            </label>
          )}
        />
      ))}

      <button type='submit'>Submit</button>
    </form>
  )
}
