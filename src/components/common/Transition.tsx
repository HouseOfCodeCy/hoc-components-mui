import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import React from 'react';

interface Props {
	mediaQuery?: 'desktop' | 'mobile' | null;
}

const TransitionTest = ({ mediaQuery = 'mobile' }: Props) =>
	React.forwardRef(function Transition(
		props: TransitionProps & {
			children: React.ReactElement;
		},
		ref: React.Ref<unknown>
	) {
		return (
			<Slide
				direction={mediaQuery === 'mobile' ? 'up' : 'left'}
				ref={ref}
				in={true}
				{...props}
			/>
		);
	});

export default TransitionTest;
