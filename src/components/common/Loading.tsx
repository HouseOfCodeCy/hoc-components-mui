import { Grid } from '@mui/material';
import React from 'react';
import { FidgetSpinner } from 'react-loader-spinner';

const Loading = () => {
	return (
		<Grid
			container
			display={'flex'}
			justifyContent={'center'}
			alignItems={'center'}
			sx={{
				height: '100%',
				width: '100%',
				overflow: 'hidden',
				position: 'absolute',
			}}>
			<FidgetSpinner
				visible={true}
				height='200'
				width='200'
				ariaLabel='dna-loading'
				wrapperStyle={{}}
				wrapperClass='dna-wrapper'
				ballColors={['#ff0000', '#00ff00', '#0000ff']}
			/>
		</Grid>
	);
};

export default Loading;
