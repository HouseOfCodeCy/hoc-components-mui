import { IProduct, IUserFlat, ProductUtils } from '@houseofcodecy/hoc-utils'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import { grey, orange, red } from '@mui/material/colors'

import React from 'react'

interface CustomProps {
  product: IProduct
  user: IUserFlat | undefined | null
  addUser: (user: IUserFlat) => void
}

const ProductItem = ({ product, user, addUser }: CustomProps) => {
  const updateUserFavorites = async () => {
    if (user) {
      const userResponse: any = await ProductUtils.addProductToFavorites(product, user, addUser)
    }
  }

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
          <IconButton aria-label='favorite' size='large' onClick={() => updateUserFavorites()}>
            {user && user.favorite_products && ProductUtils.isProductFavorite(user.favorite_products, product) ? (
              <FavoriteIcon sx={{ color: red[600] }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: grey[700] }} />
            )}
          </IconButton>
        </Box>
      </Box>
    </Card>
  )
}

export default ProductItem
