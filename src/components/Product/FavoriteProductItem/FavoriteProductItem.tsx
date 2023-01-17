import { IProductFlat } from '@houseofcodecy/hoc-utils'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Box, Card, CardContent, CardMedia, CardProps, IconButton, Typography } from '@mui/material'
import { orange, red } from '@mui/material/colors'
import React from 'react'
import { IElementProps } from '../../../interfaces/common'

interface CustomProps {
  product: IProductFlat
}

export interface CustomProductFavoriteProps extends IElementProps, CardProps, CustomProps {}

const FavoriteProductItem = (props: CustomProductFavoriteProps) => {
  const { product } = props
  return (
    <Card sx={{ w: 1, display: 'flex', justifyContent: 'flex-start', maxWidth: 345 }}>
      <CardMedia
        component='img'
        sx={{ objectFit: 'contain', minHeight: 160, maxHeight: 160, maxWidth: 140, minWidth: 140 }}
        image={product?.mediaUrl}
        title={product?.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component='div' sx={{ fontSize: '16px', fontWeight: 'bold' }}>
            {product?.name}
          </Typography>
          <Typography variant='subtitle1' color='text.secondary' component='div'>
            €{product?.price}
          </Typography>
          <Typography variant='subtitle2' color='text.secondary'>
            Availability: {product?.stock}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label='addToCart' size='large'>
            <AddShoppingCartIcon sx={{ color: orange[900] }} />
          </IconButton>
          <IconButton aria-label='favorite' size='large'>
            <FavoriteIcon sx={{ color: red[900] }} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  )
}

export default FavoriteProductItem
