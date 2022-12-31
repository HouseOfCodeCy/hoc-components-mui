import { Button, ButtonProps as MUIButtonProps } from '@mui/material'
import React from 'react'
import { ButtonProps } from './Button.types'

export interface CustomButtonProps extends ButtonProps, MUIButtonProps {}

const HButton = (props: CustomButtonProps) => {
  return <Button {...props} />
}

export default HButton
