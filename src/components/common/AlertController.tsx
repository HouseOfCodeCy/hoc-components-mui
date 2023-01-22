import { Snackbar } from '@mui/material';
import Alert, { AlertColor } from '@mui/material/Alert';
import React from 'react';

interface AlertProps {
	openAlert: boolean;
	handleClose: () => void;
	severity: AlertColor | undefined;
	message: string;
	autoHideDuration?: number;
	vertical?: 'bottom' | 'top';
	horizontal?: 'center' | 'left' | 'right';
}

const AlertController = ({
	openAlert,
	handleClose,
	severity,
	message,
	autoHideDuration = 3000,
	vertical = 'bottom',
	horizontal = 'center',
}: AlertProps) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
			open={openAlert}
			autoHideDuration={autoHideDuration}
			onClose={handleClose}>
			<Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default AlertController;
