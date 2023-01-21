import { Star } from '@mui/icons-material';
import { Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import FullScreenDialog from '../../common/FullScreenDialog';
import ReviewRating from './ReviewRating';

interface Props {
	storeName: string;
}

const ReviewComponent = ({ storeName }: Props) => {
	const [showDialog, setShowDialog] = useState(false);
	return (
		<>
			<Card
				sx={{ w: 1, display: 'flex', justifyContent: 'flex-start' }}
				onClick={() => setShowDialog(true)}>
				<Box
					sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, pr: 1 }}>
					<IconButton aria-label='addToCart' size='large'>
						<Star sx={{ color: yellow[800], fontSize: '42px' }} />
					</IconButton>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<CardContent sx={{ flex: '1 0 auto', cursor: 'pointer' }}>
						<Typography
							component='div'
							sx={{ fontSize: '16px', fontWeight: 'bold' }}>
							Your opinion matters
						</Typography>
						<Typography component='div' sx={{ fontSize: '14px' }}>
							Review our store now
						</Typography>
					</CardContent>
				</Box>
			</Card>
			<FullScreenDialog show={showDialog} setShowDialog={setShowDialog}>
				<Grid container sx={{ p: 2 }}>
					<Grid
						item
						xs={12}
						sx={{
							textTransform: 'capitalize',
							fontWeight: 'medium',
							fontSize: '24px',
						}}>
						Review
					</Grid>
					<Grid
						item
						xs={12}
						sx={{
							fontWeight: 'medium',
							fontSize: '14px',
							pb: 3,
						}}>
						{storeName}
					</Grid>
					<Grid item xs={12}>
						<Grid container rowGap={2}>
							<Grid item xs={12}>
								<Grid container rowGap={1}>
									<Grid item xs={12} sx={{ fontWeight: 'bold' }}>
										Quality
									</Grid>
									<Grid item xs={12}>
										How was the Quality of the products
									</Grid>
									<Grid item xs={12}>
										<ReviewRating />
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={12}>
								<Grid container rowGap={1}>
									<Grid item xs={12} sx={{ fontWeight: 'bold' }}>
										Delivery
									</Grid>
									<Grid item xs={12}>
										How fast do you receive your orders
									</Grid>
									<Grid item xs={12}>
										<ReviewRating />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container rowGap={1}>
									<Grid item xs={12} sx={{ fontWeight: 'bold' }}>
										Customer Service
									</Grid>
									<Grid item xs={12}>
										What do think about our customer service
									</Grid>
									<Grid item xs={12}>
										<ReviewRating />
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</FullScreenDialog>
		</>
	);
};

export default ReviewComponent;
