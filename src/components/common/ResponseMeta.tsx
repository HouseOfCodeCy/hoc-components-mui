import { IMetaResponse } from '@houseofcodecy/hoc-utils';
import { Grid } from '@mui/material';
import React from 'react';

interface Props {
	meta: IMetaResponse;
}

const ResponseMeta = ({ meta }: Props) => {
	return (
		<Grid container>
			<Grid item xs={12}>
				<Grid container display={'flex'} justifyContent={'space-between'}>
					<Grid item>
						Viewing page {meta.pagination.page} of {meta.pagination.pageCount}
					</Grid>
					<Grid item>Showing: {meta.pagination.pageSize}</Grid>
					<Grid item>Total Records: {meta.pagination.total}</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ResponseMeta;
