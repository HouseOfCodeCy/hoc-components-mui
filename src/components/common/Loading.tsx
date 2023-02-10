import { Grid } from '@mui/material';
import React from 'react';
import { FidgetSpinner } from 'react-loader-spinner';

const Loading = () => {
	return (
		<Grid
			container
			display={'flex'}
			justifyContent={'center'}
			flexDirection={'column'}
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
			<Grid item sx={{ fontWeight: 'bold' }}>
				Online Shop
			</Grid>
		</Grid>
	);
};

export default Loading;
