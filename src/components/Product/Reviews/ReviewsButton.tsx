import { IReview } from '@houseofcodecy/hoc-utils';
import { Add, ArrowForwardIos } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import FullScreenDialog from '../../common/Dialog/FullScreenDialog';
import ReviewsHeader from './ReviewsHeader';
import ReviewsItem from './ReviewsItem';

interface Props {
	reviews: IReview[] | undefined;
}

const ReviewsButton = ({ reviews }: Props) => {
	const [showAddressDialog, setShowAddressDialog] = useState(false);

	return (
		<Grid container sx={{ padding: '5px' }}>
			<Grid item xs={12} sx={{ paddingBottom: '10px' }}>
				<Button
					sx={{
						border: '1px solid #CBBEB5',
						borderRadius: '10px',
						padding: '15px',
						width: '100%',
						textAlign: 'left',
					}}
					endIcon={<ArrowForwardIos />}
					onClick={() => {
						setShowAddressDialog(true);
					}}>
					<Grid container>
						<Grid
							container
							display={'flex'}
							alignItems={'center'}
							columnGap={2}>
							<Grid
								item
								sx={{ fontWeight: 'bold', fontSize: '16px', color: 'black' }}>
								<ReviewsHeader reviews={reviews} />
							</Grid>
						</Grid>
					</Grid>
				</Button>
			</Grid>
			<Grid item xs={12}>
				<FullScreenDialog
					show={showAddressDialog}
					setShowDialog={setShowAddressDialog}
					dialogHeader={`Reviews - Product`}>
					{reviews?.map((review) => {
						return (
							<Grid
								item
								key={review.id}
								xs={12}
								sx={{
									padding: '10px',
									borderTop: '1px solid #beb8b8',
								}}>
								<ReviewsItem review={review} />
							</Grid>
						);
					})}
					<Grid item xs={12}>
						<Button
							variant='contained'
							endIcon={<Add />}
							onClick={() => console.log('')}
							sx={{ width: '100%', padding: '15px' }}>
							Add your review
						</Button>
					</Grid>
				</FullScreenDialog>
			</Grid>
		</Grid>
	);
};

export default ReviewsButton;
