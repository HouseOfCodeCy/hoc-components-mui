import { Carousel } from 'primereact/carousel'
import React, { FC } from 'react'
import { ProductImage } from '../../../interfaces/types'

export interface ProductImagesProps {
  productImages: ProductImage[]
  numVisible: number
  numScroll: number
}

export const ProductImages: FC<ProductImagesProps> = ({ ...props }) => {
  const { numScroll = 1, numVisible = 1 } = props

  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ]

  return (
    <div className='product-images container'>
      <Carousel numVisible={numVisible} numScroll={numScroll} responsiveOptions={responsiveOptions}></Carousel>
    </div>
  )
}
