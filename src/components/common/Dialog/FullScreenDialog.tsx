import { ArrowBackIos } from '@mui/icons-material';
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
	direction?: string;
	fullScreen?: boolean;
	mediaQuery?: 'desktop' | 'mobile' | null;
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
}: Props) => {
	return (
		<Dialog
			fullWidth={false}
			fullScreen={fullScreen}
			PaperProps={{
				sx: {
					position: 'fixed',
					width: 1,
					bottom: 0,
					left: 0,
					right: 0,
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
					position: 'relative',
					backgroundColor: grey[900],
					height: '70px',
					display: 'flex',
					justifyContent: 'center',
				}}>
				<Toolbar sx={{ color: grey[700] }}>
					<IconButton
						edge='start'
						color='inherit'
						onClick={() => {
							setShowDialog(false);
						}}
						aria-label='close'>
						<ArrowBackIos />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Grid container>
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
				{children}
			</Grid>
		</Dialog>
	);
};

export default FullScreenDialog;
