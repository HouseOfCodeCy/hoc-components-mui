import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import HButton from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'MUI Components/Button',
	component: HButton,
	decorators: [withDesign],
} as ComponentMeta<typeof HButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HButton> = (args) => (
	<HButton {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
	color: 'warning',
	label: 'Warning Button',
	variant: 'contained',
};
