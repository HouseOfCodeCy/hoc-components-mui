import { IProduct } from '@houseofcodecy/hoc-utils'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'

import React from 'react'

interface CustomProps {
  product: IProduct
}

const ProductItem = ({ product }: CustomProps) => {
  return (
    <Card sx={{ w: 1, display: 'flex', justifyContent: 'flex-start' }}>
      <CardMedia
        component='img'
        sx={{ objectFit: 'contain', minHeight: 160, maxHeight: 160, maxWidth: 140, minWidth: 140 }}
        image={product?.attributes.mediaUrl}
        title={product?.attributes.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component='div' sx={{ fontSize: '16px', fontWeight: 'bold' }}>
            {product?.attributes?.name}
          </Typography>
          <Typography component='div' sx={{ fontSize: '14px' }}>
            €{product?.attributes.price}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label='addToCart' size='large'>
            <AddShoppingCartIcon sx={{ color: orange[900] }} />
          </IconButton>
          <IconButton aria-label='favorite' size='large'>
            <FavoriteIcon sx={{ color: grey[900] }} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  )
}

export default ProductItem
