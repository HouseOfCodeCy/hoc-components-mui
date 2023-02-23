import { IReview } from '@houseofcodecy/hoc-utils';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid,
	Typography,
} from '@mui/material';
import { yellow } from '@mui/material/colors';
import React from 'react';

interface Props {
	reviews?: IReview[] | null;
}

const ReviewsAccordion = ({ reviews }: Props) => {
	return reviews ? (
		// render accordiong
		<Accordion sx={{ marginTop: 2, padding: 1 }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls='panel1a-content'
				id='panel1a-header'>
				<Grid container alignContent={'center'} columnGap={2}>
					<StarIcon sx={{ color: yellow[700] }} />
					<Typography>Reviews</Typography>
				</Grid>
			</AccordionSummary>
			<AccordionDetails>
				{reviews &&
					reviews?.length > 0 &&
					reviews?.map((review: IReview, index) => {
						return (
							<Grid
								container
								key={`review_${index}`}
								sx={{
									padding: '12px',
									boxShadow: '1px 3px 3px grey',
									borderRadius: '10px',
								}}>
								<Grid
									container
									alignItems={'center'}
									justifyContent={'space-between'}>
									<Grid item xs={8}>
										<h4>{review.attributes.title}</h4>
									</Grid>
									<Grid item xs={3} sx={{ textAlign: 'right' }}>
										<small>
											{review.attributes.user?.data.attributes.name}
										</small>
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<Typography>{review.attributes.rating} / 5</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography>{review.attributes.reviewDescription}</Typography>
								</Grid>
							</Grid>
						);
					})}
			</AccordionDetails>
		</Accordion>
	) : null;
};

export default ReviewsAccordion;
