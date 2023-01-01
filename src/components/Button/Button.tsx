import { Button, ButtonProps as MUIButtonProps, Grid } from '@mui/material'
import React from 'react'
import { IElementProps } from '../../interfaces/common'

export interface CustomButtonProps extends IElementProps, MUIButtonProps {}

const HButton = (props: CustomButtonProps) => {
  const { label } = props
  return (
    <Grid container className='ButtonContainer'>
      <Button {...props}>{label}</Button>
    </Grid>
  )
}

export default HButton
