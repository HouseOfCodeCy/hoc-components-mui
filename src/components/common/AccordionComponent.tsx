import { ExpandMore } from '@mui/icons-material';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from '@mui/material';
import React from 'react';

interface Props {
	header: string;
	content: any;
	expanded: boolean;
}

const AccordionComponent = ({ header, content, expanded = false }: Props) => {
	return (
		<Accordion defaultExpanded={expanded}>
			<AccordionSummary
				expandIcon={<ExpandMore />}
				aria-controls={`panel1a-content-${header}`}
				id={`panel1a-header-${header}`}>
				<Typography
					sx={{ fontSize: '16px', fontWeight: 700, color: '#278cc6' }}>
					{header}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>{content}</AccordionDetails>
		</Accordion>
	);
};

export default AccordionComponent;
