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
	direction?: string;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} in={true} {...props} />;
});

const FullScreenDialog = ({ children, show, setShowDialog }: Props) => {
	return (
		<Dialog
			fullWidth
			PaperProps={{
				sx: {
					position: 'fixed',
					width: '100%',
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
			<Grid container>{children}</Grid>
		</Dialog>
	);
};

export default FullScreenDialog;
