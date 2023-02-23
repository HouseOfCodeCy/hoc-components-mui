import { IReview } from '@houseofcodecy/hoc-utils';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	IconButton,
	Typography,
} from '@mui/material';
import { orange, red } from '@mui/material/colors';
import React from 'react';

interface CustomProps {
	review: IReview;
	nextRouter?: any;
}

const ReviewsItem = (props: CustomProps) => {
	const { review, nextRouter } = props;
	return (
		<Card
			sx={{
				w: 1,
				display: 'flex',
				justifyContent: 'flex-start',
				maxWidth: 345,
			}}>
			{review?.attributes.product?.mediaUrls && (
				<CardMedia
					component='img'
					sx={{
						objectFit: 'contain',
						minHeight: 160,
						maxHeight: 160,
						maxWidth: 140,
						minWidth: 140,
					}}
					image={review?.attributes.product?.mediaUrls[0]}
					title={review?.attributes.product?.name}
					onClick={() =>
						nextRouter.push(`/product/${review?.attributes.product?.id}`)
					}
				/>
			)}
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Typography
						component='div'
						sx={{ fontSize: '16px', fontWeight: 'bold' }}>
						{review?.attributes.title}
					</Typography>
					<Typography component='div' sx={{ fontSize: '14px' }}>
						{review?.attributes.reviewDescription}
					</Typography>
					<Typography
						variant='subtitle1'
						color='text.secondary'
						component='div'>
						Rating: {review?.attributes.rating}/5
					</Typography>
				</CardContent>
				<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
					<IconButton aria-label='EditReview' size='large'>
						<EditIcon sx={{ color: orange[900] }} />
					</IconButton>
					<IconButton aria-label='deleteReview' size='large'>
						<HighlightOffIcon sx={{ color: red[900] }} />
					</IconButton>
				</Box>
			</Box>
		</Card>
	);
};

export default ReviewsItem;
