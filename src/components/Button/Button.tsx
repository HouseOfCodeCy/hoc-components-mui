import { Button, ButtonProps as MUIButtonProps, Grid } from '@mui/material'
import React from 'react'
import { IElementProps } from '../../interfaces/common'

export interface CustomButtonProps extends IElementProps, MUIButtonProps {}

const HButton = (props: CustomButtonProps) => {
  return (
    <Grid container className='ButtonContainer'>
      <Button {...props} />
    </Grid>
  )
}

export default HButton
