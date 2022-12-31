import { Button as PrimeButton, ButtonProps as PrimeButtonProps } from 'primereact/button'
import React from 'react'
import { ButtonProps } from './Button.types'
export interface CustomButtonProps extends PrimeButtonProps, ButtonProps {}

export const Button = (props: PrimeButtonProps) => {
  const CustomButton = () => {
    return <PrimeButton icon='pi pi-check' iconPos='right' {...props} />
  }

  return <CustomButton />
}
