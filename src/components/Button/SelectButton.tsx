import { Grid, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

interface Props {
	value?: string;
	description?: string;
	icon?: JSX.Element;
	iconDescription?: JSX.Element;
	mediaQuery?: 'desktop' | 'mobile' | 'bigScreen' | 'tablet' | 'laptop' | null;
}

const SelectButton = ({
	value,
	description,
	icon,
	iconDescription,
	mediaQuery = 'mobile',
}: Props) => {
	return (
		<>
			<IconButton sx={{ color: grey[900] }}>
				<Grid container rowGap={1}>
					<Grid item xs={12}>
						<Grid container columnGap={2}>
							<Grid item>{icon}</Grid>
							<Grid item>{value}</Grid>
						</Grid>
					</Grid>
					{description && (
						<Grid item xs={12}>
							<Grid
								container
								sx={{ fontSize: '11px' }}
								display='flex'
								columnGap={1}
								justifyContent={'flex-start'}
								alignItems={'center'}>
								<Grid item xs={1}>
									{iconDescription}
								</Grid>
								<Grid
									item
									xs={10}
									sx={{
										textAlign: 'left',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										fontSize:
											mediaQuery === 'desktop' || mediaQuery === 'bigScreen'
												? '18px'
												: '14px',
									}}>
									{description}
								</Grid>
							</Grid>
						</Grid>
					)}
				</Grid>
			</IconButton>
		</>
	);
};

export default SelectButton;
