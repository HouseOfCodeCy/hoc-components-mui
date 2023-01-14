import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { withDesign } from 'storybook-addon-designs'
import FavoriteProductComponent from './FavoriteProductComponent'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'MUI Components/FavoriteProduct',
  component: FavoriteProductComponent,
  decorators: [withDesign],
} as ComponentMeta<typeof FavoriteProductComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FavoriteProductComponent> = (args) => <FavoriteProductComponent {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  product: {
    id: '1',
    name: 'Test',
    description: 'AOsdkaoskd',
    price: 29.99,
    mediaUrl:
      'https://res.cloudinary.com/houseofcodecy/image/upload/v1673334268/pet-shop/dog/dry%20food/purina-pro-plan-large-breed-beef-puppy-food_og1hsx.png',
    product_sub_categories: {
      data: [
        {
          id: 1,
          attributes: {
            name: 'Test Category',
            products: { data: [] },
          },
        },
      ],
    },
  },
}
