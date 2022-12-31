import { Card, CardProps } from 'primereact/card'
import React, { FC } from 'react'
import { PRODUCTS } from '../../resources/constants'
import { Button } from '../Button/Button'
import { ShoppingCardType } from './ShoppingCard.types'
import { ShoppingCardProduct } from './ShoppingCardProduct/ShoppingCardProduct'
import { ShoppingCardTotal } from './ShoppingCardTotal/ShoppingCardTotal'

export interface ShoppingCardProps extends CardProps, ShoppingCardType {}

export const ShoppingCard: FC<ShoppingCardProps> = ({ ...props }) => {
  const { title, subTitle, saveButtonLabel = 'Save', cancelButtonLabel = 'Cancel', products = PRODUCTS } = props
  const footer = (
    <div className='shopping-cart-footer row'>
      <Button className={'cart-button xs-6'} label={saveButtonLabel} icon='pi pi-cart-plus' iconPos='left' />
      <Button
        className={'cart-button xs-6 p-button-warning'}
        label={cancelButtonLabel}
        icon='pi pi-times'
        iconPos='left'
      />
    </div>
  )

  const RenderProducts = () => {
    return products.map((product) => {
      return (
        <div key={product.title}>
          <ShoppingCardProduct key={product.title} product={product} />
          <hr />
        </div>
      )
    })
  }

  const CustomShoppingCard = () => {
    return (
      <Card className={'mini-card xs-2'} title={title} subTitle={subTitle} footer={footer} {...props}>
        <div className='row'>{RenderProducts()}</div>
        <div className='row'>
          <ShoppingCardTotal products={products} />
        </div>
      </Card>
    )
  }

  return <CustomShoppingCard />
}
