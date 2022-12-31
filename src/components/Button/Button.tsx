import { Button, ButtonProps as MUIButtonProps, Grid } from '@mui/material'
import React from 'react'
import './Button.css'
import { ButtonProps } from './Button.types'

export interface CustomButtonProps extends ButtonProps, MUIButtonProps {}

const HButton = (props: CustomButtonProps) => {
  return (
    <Grid container className='ButtonContainer'>
      <Button {...props} />)
    </Grid>

}

export default HButton
