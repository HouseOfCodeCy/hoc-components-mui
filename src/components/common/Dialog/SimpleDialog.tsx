import { Dialog, DialogTitle } from '@mui/material';
import React from 'react';

export interface SimpleDialogProps {
	children: React.ReactNode;
	open: boolean;
	selectedValue: any;
	onClose: (value: string) => void;
	title: string;
}

const SimpleDialog = (props: SimpleDialogProps) => {
	const { onClose, selectedValue, open, children, title } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>{title}</DialogTitle>
			{children}
		</Dialog>
	);
};

export default SimpleDialog;
