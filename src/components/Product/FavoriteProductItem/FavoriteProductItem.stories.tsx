import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import FavoriteProductItem from './FavoriteProductItem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'MUI Components/FavoriteProduct',
	component: FavoriteProductItem,
	decorators: [withDesign],
} as ComponentMeta<typeof FavoriteProductItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FavoriteProductItem> = (args) => (
	<FavoriteProductItem {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
