import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';

interface Props {
	heading: string;
	content: string;
	Icon: React.ElementType;
}

const CardRow = ({ heading, content, Icon }: Props) => {
	return (
		<Card sx={{ w: '1', display: 'flex', justifyContent: 'flex-start' }}>
			<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
				<IconButton aria-label='addToCart' size='large'>
					<Icon sx={{ color: grey[800], fontSize: '42px' }} />
				</IconButton>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent sx={{ flex: '1 0 auto', cursor: 'pointer' }}>
					<Typography
						component='div'
						sx={{ fontSize: '16px', fontWeight: 'bold' }}>
						{heading}
					</Typography>
					<Typography component='div' sx={{ fontSize: '14px' }}>
						{content}
					</Typography>
				</CardContent>
			</Box>
		</Card>
	);
};

export default CardRow;
