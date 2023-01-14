import { IProductBody } from '@houseofcodecy/hoc-utils'
import { Card, CardContent, CardMedia, CardProps, Typography } from '@mui/material'
import React from 'react'
import { IElementProps } from '../../../interfaces/common'

interface CustomProps {
  product: IProductBody
}

export interface CustomProductFavoriteProps extends IElementProps, CardProps, CustomProps {}

const FavoriteProductComponent = (props: CustomProductFavoriteProps) => {
  const { product } = props
  return (
    <Card sx={{ w: 1, display: 'flex', justifyContent: 'flex-start' }}>
      <CardMedia sx={{ flexBasis: ' 5rem' }} image={product?.mediaUrl} title={product?.name} />
      <CardContent sx={{ w: 1 }}>
        <Typography gutterBottom variant='body2' component='div'>
          {product?.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {product?.product_sub_categories?.data[0].attributes.name}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default FavoriteProductComponent
