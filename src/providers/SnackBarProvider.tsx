import { Alert, AlertColor, AlertTitle, Snackbar } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';

export type SnackBarContextType = {
	showSnackBar: (
		message: string,
		typeColor: AlertColor,
		title?: string
	) => void;
};

export const SnackBarContext = createContext<SnackBarContextType | null>(null);

interface Props {
	children: React.ReactNode;
}

const SnackBarProvider: React.FC<Props> = ({ children }) => {
	const [open, setOpen] = useState<boolean>(false);
	const [title, setTitle] = useState<string | undefined>(undefined);
	const [message, setMessage] = useState<string>('');
	const [typeColor, setTypeColor] = useState<AlertColor>('info');

	const showSnackBar = (text: string, color: AlertColor, title?: string) => {
		setTitle(title);
		setMessage(text);
		setTypeColor(color);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setTypeColor('info');
	};

	return (
		<SnackBarContext.Provider value={{ showSnackBar }}>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity={typeColor}
					variant='filled'
					elevation={5}
					sx={{ width: '100%' }}>
					{title && <AlertTitle>{title}</AlertTitle>}
					{message}
				</Alert>
			</Snackbar>
			{children}
		</SnackBarContext.Provider>
	);
};

const useSnackBar = (): SnackBarContextType => {
	const context = useContext(SnackBarContext);

	if (!context) {
		throw new Error('useSnackBar must be used within an SnackBarProvider');
	}

	return context;
};

export { SnackBarProvider, useSnackBar };
