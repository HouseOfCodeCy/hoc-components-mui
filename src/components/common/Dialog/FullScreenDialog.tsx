import { ArrowBackIos, Close } from '@mui/icons-material';
import {
	AppBar,
	Dialog,
	Grid,
	IconButton,
	Slide,
	Toolbar,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

interface Props {
	children: React.ReactNode;
	show: boolean;
	setShowDialog: (show: boolean) => void;
	dialogHeader?: string;
	dialogSubHeader?: string;
	dialogAction?: any;
	direction?: string;
	fullScreen?: boolean;
	mediaQuery?: 'desktop' | 'mobile' | 'bigScreen' | 'tablet' | 'laptop' | null;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction={'up'} ref={ref} in={true} {...props} />;
});

const FullScreenDialog = ({
	children,
	show,
	setShowDialog,
	dialogHeader,
	dialogSubHeader,
	fullScreen = false,
	mediaQuery = 'mobile',
	dialogAction,
}: Props) => {
	return (
		<Dialog
			fullWidth={false}
			fullScreen={
				mediaQuery === 'mobile' || mediaQuery === 'tablet' ? true : false
			}
			PaperProps={{
				sx: {
					position:
						mediaQuery === 'mobile' || mediaQuery === 'tablet'
							? 'fixed'
							: 'inherit',
					width: mediaQuery === 'mobile' || mediaQuery === 'tablet' ? 1 : 700,
					height: '100%',
					bottom:
						mediaQuery === 'mobile' || mediaQuery === 'tablet' ? 0 : '10%',
					left: mediaQuery === 'mobile' || mediaQuery === 'tablet' ? 0 : '40%',
					right:
						mediaQuery === 'mobile' || mediaQuery === 'tablet' ? 0 : undefined,
					m: 0,
				},
			}}
			open={show}
			onClose={() => {
				setShowDialog(false);
			}}
			TransitionComponent={Transition}>
			<AppBar
				sx={{
					position: 'sticky',
					top: 0,
					backgroundColor: grey[900],
					height: '60px',
					display: 'flex',
				}}>
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						color: grey[700],
					}}>
					<IconButton
						edge={
							mediaQuery === 'mobile' || mediaQuery === 'tablet'
								? 'start'
								: 'end'
						}
						color='inherit'
						onClick={() => {
							setShowDialog(false);
						}}
						aria-label='close'>
						{mediaQuery === 'mobile' || mediaQuery === 'tablet' ? (
							<ArrowBackIos />
						) : (
							<Close />
						)}
					</IconButton>
				</Toolbar>
			</AppBar>
			<Grid container sx={{ position: 'relative' }}>
				{dialogHeader && (
					<Grid item xs={12} sx={{ textAlign: 'center' }}>
						<h2>{dialogHeader}</h2>
					</Grid>
				)}
				{dialogSubHeader && (
					<Grid item xs={12} sx={{ textAlign: 'center', fontSize: '14px' }}>
						{dialogSubHeader}
					</Grid>
				)}
				<Grid item xs={12}>
					{children}
				</Grid>
				{dialogAction && (
					<Grid
						item
						xs={12}
						sx={{
							position: 'absolute',
							top: '100%',
							padding: '20px',
							width: 1,
							height: '60px',
							borderRadius: '10px 10px 0 0',
						}}>
						{dialogAction}
					</Grid>
				)}
			</Grid>
		</Dialog>
	);
};

export default FullScreenDialog;
