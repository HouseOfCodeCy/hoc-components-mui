import { Grid } from '@mui/material';
import React from 'react';

const FooterComponent = () => {
	return (
		<footer>
			<Grid
				container
				display={'flex'}
				flex={1}
				alignItems={'center'}
				justifyContent={'center'}
				sx={{
					padding: '2rem 0',
					backgroundColor: '#3f3f3f',
					color: 'white',
					borderTop: '1px solid #eaeaea',
				}}>
				<Grid item>
					<a
						href='https://hoc-portfolio.vercel.app/'
						target='_blank'
						rel='noopener noreferrer'>
						Powered by{' '}
						<span>
							<img
								src={'/logos/hoc/logo_hoc.svg'}
								alt='HouseOfCodeCy'
								color='blue'
								width={'92'}
								height={'92'}
							/>
						</span>
					</a>
				</Grid>
			</Grid>
		</footer>
	);
};

export default FooterComponent;
